Helper tools for newproj developers
=================================

update-all.sh
-------------
Get a copy of all needed repositories for newproj development. To use it, link `update-all.sh` from the top level directorty, 
i.e:

```
newproj (base dir)
  |-- newproj-devtools (this repo dir)
  |     \-- update-all.sh (regular file)
  \-- update-all.sh (symlink)
```

To get this directory and files structure, execute this commands in a unix shell console:

```bash
mkdir aspb-newproj
cd aspb-newproj
git clone Pendiente de la url del repo del Ayuntamiento de BCN
ln -s newproj-devtools/update-all.sh
```

After that, you can execute:

```bash
./update-all.sh
```

This will create all needed repositories and will link development docker-compose files in the `apsb-newproj` root folder.
You can rename the `newproj-aspb` folder to any other name of your preference.
The script `update-all.sh` ahould be executed any time later to pull latest changes from all the repositories (including
this one).

docker-compose files 
--------------------
There are at least two docker-compose files:

- `docker-compose.yml`: This file is for local development. It runs Django and Angular test servers. Frontend is run  
  on port 4200 and API backend is run on port 8000.
- `docker-compose.production-test.yml`: This file is for testing a production configuration. Frontend is compiled in 
production mode and backend is run with uWSGI. Frontend is run on port 80 and backend in port 8080. 

`docker-compose.yml`
------------------
Use this file to build and launch a fully functional development environment. Use it from the root `newproj` folder 
containing all the repositories. In that directory, `docker-compose.yml` must be a symlink to the actual file in this 
repo. The script `update-all.sh` will create this symlink.  

```bash
# Build development containers
docker-compose build-dev

# Launch all services
docker-compose up
```

After that, point your browser to:
- http://localhost:4200/  --> SPA frontend 
- http://localhost:8000/swagger/  --> API definition and test 

