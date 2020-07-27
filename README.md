# Tyba Backend Engineer test

## Steps to run this project:

1. Create a Mysql Scheme
2. Get down this repo.
3. Install project
4. Setup database settings inside `ormconfig.json` file
5. Run project and get API into localhost:3000
6. Requests postman documentation

## Guide

### 1. Create a Mysql Scheme
For this case, i used a mysql docker image.
- docker pull mysql
- docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
- Flush privileges for user: 
```
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
```
- Create scheme
```
 CREATE SCHEMA `tyba` ;
```
### 2. Get down repo:
- git clone https://github.com/Mayistikar/Tyba.git

### 3. Install project:
- Run `npm i` command

### 4. Setup database settings inside `ormconfig.json` file
Setting database credentials into ormconfig.json, using this structure:
```Javascript
{
   "type": "mysql",
   "host": "172.17.0.2", // Your database IP
   "port": 3306,
   "username": "root",
   "password": "12345",
   "database": "tyba",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
```
### 5. Run project and get API into localhost:3000
- Run `npm start` command

### 6. For request documentation.
- visit: https://documenter.getpostman.com/view/5831053/T1DqgGa9?version=latest