# On-Call Coordinator

## Prerequisites
If you just want to run the application, you will need [Docker](https://www.docker.com/) installed on your system. 

To run (both the Node project and DB):
```
$ docker compose up
```

To stop:
```
$ docker compose down
```

## Development Prerequisites
### React
- [Node.js](https://nodejs.org/en/)

The node project was created with `npx express-generator`.

To run:
```
$ npm install
$ npm run start
```

### MariaDB (Data Store)
Our database uses MariaDB, which is an open-source fork of MySQL, so it should feel familiar to anyone who took INFO1103/CS1103.
You should be able to connect with MySQL Workbench, but [DBeaver](https://dbeaver.io/) is another option that doesn't require an Oracle login to download.

 ## Environment Variables
 All Docker containers take environment variables from the `.env` file. You can get started by copying/renaming the `.env.example` file to `.env`, but you set your own values for secrets.
| Env. Variable | Description
| --- | --- | 
| MARIADB_ROOT_PASSWORD | Root password for MariaDB |
| MARIADB_DATABASE | Name of database created on DB initialization |
| MARIADB_USER | Name of user created on DB initialization |
| MARIADB_PASSWORD | Password of user created on DB initialization |