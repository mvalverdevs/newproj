.PHONY: help

.DEFAULT_GOAL := help
runner=$(shell whoami)
group := $(shell id -gn)

PV := $(shell command -v pv || command -v pipebench || echo cat)
DBDUMP := postgres-data.tar.bz2
DOCKER_DEV := docker compose -p newproj-dev -f docker-compose.yml
DOCKER_PROD := docker compose -p newproj-prod -f docker-compose.production-test.yml



### COMMON

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: build-dev ## build-etl ## Build all developer containers (dev, coverage)

build-dev: ## Build developer containers for services (backend, frontend, ...)
	$(DOCKER_DEV) pull
	$(DOCKER_DEV) build

up: up-dev ## Run developer containers (all services)

up-dev: ## Run developer containers (all services)
	$(DOCKER_DEV) up

up-postgres-develop: ## Run developer NFGE postgresql service (in detached mode)
	$(DOCKER_DEV) up -d postgres

down: down-dev down-production-test  ## Stop and remove all containers

down-dev: ## Stop and remove all developer service containers
	$(DOCKER_DEV) down --remove-orphans

down-production-test: ## Stop and remove all production-test service containers defined in docker-compose.production-test.yml
	$(DOCKER_PROD) down --remove-orphans



### BACKEND

api-shell: ## Run interactive python/api shell in 'api' developer container
	$(DOCKER_DEV) run --rm api python manage.py shell

api-osshell: ## Run interactive bash shell in 'api' developer container
	$(DOCKER_DEV) run --rm api bash

api-makemigrations: ## Run makemigrations command in api container.
	$(DOCKER_DEV) run --rm api python manage.py makemigrations
	sudo -S chown -R $(runner):$(group) -Rf backend/*

api-migrate: ## Run 'migrate' command in 'api' container
	$(DOCKER_DEV) run --rm api python manage.py migrate

api-mergemigrations: ## Run make merge migrations command in api container.
	$(DOCKER_DEV) run  --rm api python manage.py makemigrations --merge
	sudo -S chown -R $(runner):$(group) -Rf backend/*

api-emptymigration: ## Create empty migration expecting app_name and migration_name argument
	$(DOCKER_DEV) run --rm api python manage.py makemigrations '$(app_name)' --name '$(migration_name)' --empty
	sudo -S chown -R $(runner):$(group) -Rf backend/*

api-squashmigrations: ## Squash migrations into unique migration expecting app_name and migration_number argument
	$(DOCKER_DEV) run --rm api python manage.py squashmigrations '$(app_name)' '$(migration_number)'

api-example-command: ## Executes example manage command
	$(DOCKER_DEV) run --rm api python manage.py example

api-createsuperuser: ## Create new superadmin user.
	$(DOCKER_DEV) run --rm api python manage.py createsuperuser

api-graph-models: ## Generate PDF file with entire E/R project models.
	$(DOCKER_DEV) run --rm api python manage.py graph_models -a > output.dot
	dot -Tpdf output.dot -o aspb_e-r.pdf
	rm output.dot

api-newapp: ## Create new backend app, expects name argument.
	$(DOCKER_DEV) run --rm api python manage.py startapp '$(name)'
	mkdir ./backend/src/$(name)/tests/
	touch ./backend/src/$(name)/serializers.py
	touch ./backend/src/$(name)/tests/test_$(name).py
	touch ./backend/src/$(name)/factory.py
	rm -r ./backend/src/$(name)/admin.py
	rm -r ./backend/src/$(name)/apps.py
	rm -r ./backend/src/$(name)/tests.py
	sudo chown -R $(runner):$(group) ./backend/src/$(name)

api-coverage: ## Run pytest with coverage report in the api container.
	$(DOCKER_DEV) run --rm api pytest --cov-report term-missing --cov=.

api-test: ## Run pytest in the api container.
	$(DOCKER_DEV) run --rm api pytest

api-populate: ## Run pytest with coverage report in the api container.
	$(DOCKER_DEV) run --rm api python manage.py populate -m $(model)


### FRONTEND

front-osshell: ## Run interactive bash shell in 'frontend' developer container
	$(DOCKER_DEV) run --rm frontend bash

front-swagger: ## Generate OpenAPI definition nfge-spa/swagger.json
	$(DOCKER_DEV) run --rm frontend wget -O ./schema.yaml http://192.168.1.35:8000/api/schema/

front-apigen: front-swagger ## Run NPM APIGEN (ng-openapi-gen)
	$(DOCKER_DEV) run --rm frontend ng-openapi-gen
	sudo chown -R $(runner):$(group) ./frontend/src/api

front-build-prod: ## Compile frontend using gulp build
	$(DOCKER_DEV) run --rm frontend npm run build-prod
	sudo chown -R $(runner):$(group) ./frontend/dist/

front-npm-delete-cache: ## Delete npm package cache
	docker volume rm -p newproj-dev_aspb-newproj_npm_cache

front-newapp: ## Create new frontend app, expects name argument.
	mkdir ./frontend/src/app/main/$(name)/
	mkdir ./frontend/src/app/main/$(name)/$(name)-form/
	mkdir ./frontend/src/app/main/$(name)/$(name)-list/
	mkdir ./frontend/src/app/main/$(name)/$(name)-retrieve/

front-newcomponent: ## Create new frontend component, expects 'name' argument
	$(DOCKER_DEV) run --rm frontend ionic generate page $(name)

translate: ## Run NPM extract (translate)
	$(DOCKER_DEV) run --rm frontend npm run extract

front-compile-ios:
	$(DOCKER_DEV) run --rm frontend ionic build
	$(DOCKER_DEV) run --rm frontend ionic capacitor copy ios --verbose
	pod deintegrate --project-directory=frontend/ios/App/App --verbose
	pod install --project-directory=frontend/ios/App/ --verbose
	ionic capacitor open ios

front-compile-android:
	# sudo ionic capacitor add android
	sudo ionic capacitor copy android
	ionic capacitor run android -l --external

front-configure-android:
	export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
	export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
	export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
	export PATH=$PATH:$ANDROID_SDK_ROOT/emulator

front-devices-android:
	npx native-run android --list --json

node-modules-permissions: ## Change permissions to ./frontend/node_modules/
	sudo chown -R $(runner):$(group) ./frontend/node_modules/


### DATABASE

postgres-dev-volume-backup: ## Backup development postgres volume to .tar.bz2 files
	$(DOCKER_DEV) stop postgres
	docker run -v newproj-dev_local_postgres_data:/volume --rm loomchild/volume-backup backup - | $(PV) > $(DBDUMP)
	$(DOCKER_DEV) up -d postgres
	@echo "Backup saved into '$(DBDUMP)' file"

postgres-dev-volume-restore: $(DBDUMP) ## Restore development postgres volume from .tar.bz2 files
	@echo "Loading backup from '$(DBDUMP)' file"
	$(DOCKER_DEV) stop postgres
	cat $(DBDUMP) | $(PV) | docker run -i -v local_postgres_data:/volume --rm loomchild/volume-backup restore -f -
	$(DOCKER_DEV) up -d postgres

$(DBDUMP): # Show error if the database dump file does not exist in the current directory
	@echo "ERROR: $(DBDUMP) file not found in the current directory"
	@exit 1

wipe-dev-api-database: down ## Wipe local api database volumes (newproj_local_postgres_data, newproj_local_postgres_data_backups)
	docker volume rm newproj-dev_local_postgres_data newproj-dev_local_postgres_data_backups

wipe-production-test-api-database: down ## Wipe local api database volumes (newproj_local_postgres_data, newproj_local_postgres_data_backups)
	docker volume rm newproj-prod_postgres_data newproj-prod_postgres_data_backups



### UTILS

docker_stop_all_containers: ## Stop all docker running containers
	docker container stop $(shell docker container ls -aq)

docker_rm_all_containers: docker_stop_all_containers ## Stop and remove all docker running containers
	docker container rm $(shell docker container ls -aq)
