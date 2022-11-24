# On-Call Coordinator

## Prerequisites
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/)

## Getting Started
### 1. Setup environment variables
During development, you will mostly be using Docker to spin up/down your local database. The database requires some environment variables to be set using the `.env` file before spinning up. **Start by renaming `.env.example` to `.env` and do the same for `server/.env.example`.** Your local `.env` files are explicitly excluded from this repo to prevent exposing things like database root passwords. Please refer to the table below to understand the function of each environment variable and change them if desired.

### 2. Install dependencies
In both the `client` and `server` directories, run the following command:
```
$ npm install
```
This will add all the dependencies for each of the projects (defined in their respective `package.json` file) into their respective `node_modules` folders.

### 3. Setup Database
Now that we've defined initialization info for our database we can start the `db` service as defined in `docker-compose.yaml`:
```
$ docker compose up db
```
If you get an error such as `error during connect: This error may indicate that the docker daemon is not running.:`, then you may need to open or install **Docker Desktop**.

Based on the service definition in `docker-compose.yaml`, this should start a container (which you can think of like a very minimal virual machine) running MariaDB, with port 3306 on the container mapped to port 43332 on your local machine. You can view info about this container either in the command line (through `docker` commands) or in **Docker Desktop**.

Our MariaDB instance has a database name, but it doesn't know our **schema** yet. To add our schema we will have to setup **Prisma**.

In `server/.env`, you should have an environment variable called `DATABASE_URL=...`. Replace the user with `root` and the password with the value you've set for `MARIADB_ROOT_PASSWORD`. You can also use another DB user with permissions to create databases, but that's not set up automatically.

Now, in the `server` directory, run the following command:
```
$ npx prisma migrate dev
```
If `DATABASE_URL` is set correctly, it should apply the schema defined in `server/prisma/schema.prisma`. We will update this schema as we add more features and our data model changes. After each change, running `npx prisma migrate dev` again will put your database in sync with the schema.

### 4. Start the application
For the application to be fully functional, we need to run all components: Front-end (client), back-end (server), and database.

If your database isn't already running, pull it up with `docker compose up db`.

If you check `client/package.json` you will see that the `start` command will start both the client and server projects using a utility called `concurrently`. So, to run both node projects run this command from the `client` directory:
```
$ npm run start
```

### 5. Closing the application
Docker and MariaDB can be a memory-hog if you leave it open, so I recommend spinning down docker as soon as you are done with your work:
```
$ docker compose down
```
Node projects can be stopped with `Ctrl-C` in the terminal.

## Development Prerequisites
### React
- [React Dev Tools (recommended)](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
- [ESLint (recommended)](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

The `server` project was created with `npx express-generator`. The `client` project was created with `npx create-react-app`.

### MariaDB (Data Store)
Our database uses MariaDB, which is an open-source fork of MySQL, so it should feel familiar to anyone who took INFO1103/CS1103.
You should be able to connect with MySQL Workbench, but [DBeaver](https://dbeaver.io/) is another option that doesn't require an Oracle login to download.

### Prisma
[Prisma](https://www.prisma.io/docs/concepts/overview/what-is-prisma) is a object-relational mapper (ORM) that simplifies the process of building SQL tables and queries. Make sure the `DATABASE_URL` environment variable in `server/.env` is set to a valid connection url using a user with permission to create databases. To initialize the database with the latest schema:
```
$ npx prisma migrate dev
```

 ## Environment Variables
 All Docker containers take environment variables from the `.env` file. You can get started by copying/renaming the `.env.example` file to `.env`, but you set your own values for secrets.
 ### `/.env`
| Env. Variable | Description
| --- | --- | 
| MARIADB_ROOT_PASSWORD | Root password for MariaDB |
| MARIADB_DATABASE | Name of database created on DB initialization |
| MARIADB_USER | Name of user created on DB initialization |
| MARIADB_PASSWORD | Password of user created on DB initialization |

### `/server/.env`
| Env. Variable | Description
| --- | --- | 
| DATABASE_URL | DB connection string used by prisma |
| JWT_SECRET_KEY | Used to generate JWT tokens for authorization |
| TOKEN_HEADER_KEY | Used to generate JWT tokens for authorization |