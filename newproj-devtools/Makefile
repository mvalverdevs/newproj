.PHONY: help

.DEFAULT_GOAL := help
runner=$(shell whoami)

PV := $(shell command -v pv || command -v pipebench || echo cat)
DBDUMP := postgres-data.tar.bz2
DOCKER_DEV := docker compose -p newproj-dev -f docker-compose.yml
DOCKER_PROD := docker compose -p newproj-prod -f docker-compose.production-test.yml

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

update: ## Update project repositories (execute update-all.sh script)
	./update-all.sh

build: build-dev ## build-etl ## Build all developer containers (dev, coverage)

build-dev: ## Build developer containers for services (backend, frontend, ...)
	$(DOCKER_DEV) pull
	$(DOCKER_DEV) build

build-dev-api: ## Build developer containers for 'api' and celeryworker[12] services
	$(DOCKER_DEV) build api celeryworker-concurrent celeryworker-non-concurrent celerybeat

build-dev-frontend: ## Build developer containers for 'frontend' service
	$(DOCKER_DEV) build frontend

build-production-test: symlink-devtools-utils ## Build production test containers for services (backend, frontend, ...)
	$(DOCKER_PROD) build

build-production-test-api: symlink-devtools-utils ## Build production test containers for 'api' service only
	$(DOCKER_PROD) build api celeryworker-concurrent celeryworker-non-concurrent celerybeat

build-production-test-frontend: ## Build developer containers for 'frontend' service
	$(DOCKER_PROD) build frontend

up: up-dev ## Run developer containers (all services)

up-dev: ## Run developer containers (all services)
	$(DOCKER_DEV) up

up-dev-api: ## Run developer newproj-api service
	$(DOCKER_DEV) up api

up-dev-celery: ## Run developer newproj-celerybeat and newproj-celeryworker-{concurrent,non-concurrent} services
	$(DOCKER_DEV) up celeryworker-concurrent celeryworker-non-concurrent celerybeat

up-dev-celeryworkers: ## Run developer newproj-celeryworker-{concurrent,non-concurrent} services
	$(DOCKER_DEV) up celeryworker-concurrent celeryworker-non-concurrent

up-dev-frontend: ## Run developer newproj-frontend service
	$(DOCKER_DEV) up frontend

up-production-test: ## Run production test containers (all services)
	$(DOCKER_PROD) up

up-production-test-api: ## Run production test newproj-api service
	$(DOCKER_PROD) up api

up-production-test-celery: ## Run production test newproj-celerybeat and newproj-celeryworker-{concurrent,non-concurrent} services
	$(DOCKER_PROD) up celeryworker-concurrent celeryworker-non-concurrent celerybeat

up-production-test-frontend: ## Run production test newproj-frontend service
	$(DOCKER_PROD) up frontend

up-postgres-production-test: ## Run production test 'postgres' service (in detached mode)
	$(DOCKER_PROD) up -d postgres

up-postgres-develop: ## Run developer NFGE postgresql service (in detached mode)
	$(DOCKER_DEV) up -d postgres

down: down-dev down-production-test  ## Stop and remove all containers

down-dev: ## Stop and remove all developer service containers
	$(DOCKER_DEV) down --remove-orphans

down-production-test: ## Stop and remove all production-test service containers defined in docker-compose.production-test.yml
	$(DOCKER_PROD) down --remove-orphans

api-shell: ## Run interactive python/api shell in 'api' developer container
	$(DOCKER_DEV) run --rm api python manage.py shell

api-osshell: ## Run interactive bash shell in 'api' developer container
	$(DOCKER_DEV) run --rm api bash

api-makemigrations: ## Run makemigrations command in api container.
	$(DOCKER_DEV) run --rm api python manage.py makemigrations
	sudo -S chown -R $(runner):$(runner) -Rf newproj-api/*

api-migrate: ## Run 'migrate' command in 'api' container
	$(DOCKER_DEV) run --rm api python manage.py migrate

api-mergemigrations: ## Run make merge migrations command in api container.
	$(DOCKER_DEV) run  --rm api python manage.py makemigrations --merge
	sudo -S chown -R $(runner):$(runner) -Rf newproj-api/*

api-emptymigration: ## Create empty migration expecting app_name and migration_name argument
	$(DOCKER_DEV) run --rm api python manage.py makemigrations '$(app_name)' --name '$(migration_name)' --empty
	sudo -S chown -R $(runner):$(runner) -Rf newproj-api/*

api-squashmigrations: ## Squash migrations into unique migration expecting app_name and migration_number argument
	$(DOCKER_DEV) run --rm api python manage.py squashmigrations '$(app_name)' '$(migration_number)'

api-populate-db: ## Executes example manage command
	$(DOCKER_DEV) run --rm api python manage.py example

api-createsuperuser: ## Create new superadmin user.
	$(DOCKER_DEV) run --rm api python manage.py createsuperuser

api-graph-models: ## Generate PDF file with entire E/R project models.
	$(DOCKER_DEV) run --rm api python manage.py graph_models -a > output.dot
	dot -Tpdf output.dot -o aspb_e-r.pdf
	rm output.dot

api-newapp: ## Create new backend app, expects name argument.
	$(DOCKER_DEV) run --rm api python manage.py startapp '$(name)'
	mkdir ./newproj-backend/src/$(name)/tests/
	touch ./newproj-backend/src/$(name)/serializers.py
	touch ./newproj-backend/src/$(name)/tests/test_$(name).py
	touch ./newproj-backend/src/$(name)/factory.py
	rm -r ./newproj-backend/src/$(name)/admin.py
	rm -r ./newproj-backend/src/$(name)/apps.py
	rm -r ./newproj-backend/src/$(name)/tests.py
	sudo chown -R $(runner):$(runner) ./newproj-backend/src/$(name)

api-coverage: ## Run pytest with coverage report in the api container.
	$(DOCKER_DEV) run --rm api pytest --cov-report term-missing --cov=.

api-test: ## Run pytest in the api container.
	$(DOCKER_DEV) run --rm api pytest

frontend-osshell: ## Run interactive bash shell in 'frontend' developer container
	$(DOCKER_DEV) run --rm frontend bash

swagger: ## Generate OpenAPI definition nfge-spa/swagger.json
	./swagger-update.sh sfile=newproj-frontend/swagger.json surl=http://localhost:8000/swagger.json

apigen: swagger ## Run NPM APIGEN (yasag)
	$(DOCKER_DEV) run --rm frontend npm run apigen
	sudo chown -R $(runner):$(runner) ./newproj-spa/src/api

frontend-build-prod: ## Compile frontend using gulp build
	$(DOCKER_DEV) run --rm frontend npm run build-prod
	sudo chown -R $(runner):$(runner) ./newproj-spa/dist/

frontend-npm-delete-cache: ## Delete npm package cache
	docker volume rm -p newproj-dev_aspb-newproj_npm_cache

translate: ## Run NPM extract (translate)
	$(DOCKER_DEV) run --rm frontend npm run extract

node-modules-permissions: ## Change permissions to ./newproj-spa/node_modules/
	sudo chown -R $(runner):$(runner) ./newproj-spa/node_modules/

symlink-devtools-utils: ## Prepare symlinks for devtools helper files
	@ ! [ -L docker-compose.production-test.yml ] && ln -s ./newproj-devtools/docker-compose.production-test.yml || true

docker_stop_all_containers: ## Stop all docker running containers
	docker container stop $(shell docker container ls -aq)

docker_rm_all_containers: docker_stop_all_containers ## Stop and remove all docker running containers
	docker container rm $(shell docker container ls -aq)

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
