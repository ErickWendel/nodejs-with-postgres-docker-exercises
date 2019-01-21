## Node.js with Postgres Exercises

# Objectives

1. Criar dockerfile e rodar projeto usando o comando `docker run`
2. Rodar o `postgres` e `linkar` com seu projeto
3. Criar arquivo `docker-compose` e adicionar serviços


<img
    src="https://i.imgur.com/jUeBAiH.png"
    alt="Swagger Page of that application"
    title="Swagger Page of that application" />

### Requirements

* Node.js v8+ or Docker and Docker Compose
* Postgres running on local instance or Docker
* Add postgres URL on `POSTGRES_HOST`env

### Running on localMachine

* Install dependencies - `sudo npm i -g typescript pm2 && npm i`
* Build typescript - `npm run build`
* Run project - `npm start`

### Viewing

* Go to swagger page - `localhost:3000/documentation`

## Postgres 
 
- Postgres Image: **postgres**
- Port: **5432**
- Env:
    - POSTGRES_PASSWORD: mysecretpassword
    - POSTGRES_DB: heroes
