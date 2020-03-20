# java-vuejs-template

# Startup Environment

The `docker-compose.yml` will spin up a MariaDB database for api development. 
All other docker-compose files will additionally startup the related services.

`docker-compose -f docker-compose.yml -f docker-compose.yml [-f docker-compose.api.yml] [-f docker-compose.client.yml] up -d`

# API

Endpoint: `localhost:8080`  
Documentation: `localhost:8080/documentation.html`  
Credentials: `root:root`
