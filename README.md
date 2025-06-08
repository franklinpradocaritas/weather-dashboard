# Weather Dashboard

Full-Stack Application with React, Node.js, Redis and PostgreSQL supported by Docker Compose

## Summary

This application displays the configuration of a weather dashboard that can be managed by the user or anonymously. Features include:

1. A city search that will display suggestions as an autocomplete.
2. Detailed climate information for the selected city.
3. The weather forecast for the next 5 days.
4. Management of the list of favorite cities.
5. History of recent city searches.

These last two options are available to non-anonymous users.

This repository shows how to set up a React JS application, a Node JS server, a PostgreSQL database server, and finally a Redis server, each deployed in a Docker container and all connected.

> To get this project up and running, follow these steps:
>
> 1.  Make sure you have Docker installed on your system. For the installation steps, follow these steps:
>     1.  For **[Mac](https://docs.docker.com/desktop/install/mac-install/)**
>     2.  For **[Ubuntu](https://docs.docker.com/engine/install/ubuntu/)**
>     3.  For **[Windows](https://docs.docker.com/desktop/install/linux-install/)**
> 2.  Clone the repository to your device
> 3.  Open a terminal from the cloned project directory (where the `docker-compose.yml` file is located)
> 4.  Run the `docker-compose up --build` command
>
> Done! The project should be up and running. To see the result, you can access `http://127.0.0.1:3000`/`http://>localhost:3000` from your browser. You will initially be redirected to the login page, where you can log in as an `Anonymous` user with certain limitations, or with a user already pre-loaded in the database, such as `alice`, `bob`, or `carlos`, which should allow you to access the dashboard. The entire system, including the client, server, database, and cache server, runs within a single Docker container. A detailed explanation of what happens below is provided.
>
> **_NOTE_**: For more detail go to the [Execution Section](#4-execution-details)

### **1. Introduction**

---

[Docker](https://docs.docker.com/) at its core is a platform as a service that uses OS-level virtualization to deploy/deliver software in packages called containers. It is done for various advantages, such as cross platform consistency and flexibility and scalability.

[Docker Compose](https://docs.docker.com/compose/) is a tool for defining and running multi-container applications. It is the key to unlocking a streamlined and efficient development and deployment experience.

### **2. Using Docker and Docker Compose**

---

When working with full-stack applications, that is, those that require more than one set of technologies to integrate them into a complete system, configuring Docker from scratch can be quite complicated. Having multiple types of environment dependencies for each particular technology doesn't make the task any easier, only increasing the risk of implementation errors.

**Note:** The `.env` file, adjacent to the `docker-compose.yml` directory, will contain certain variables that will be used in the Docker Compose file. They will be accessed whenever the `${<VARIABLE_NAME>}` notation is used.

This example will run with PostgreSQL as the database, a Node/Express JS server, a Redis cache server, and React JS as the client-side application.

### **3. Individual Containers**

---

The following section goes into a breakdown of how the `docker-compose.yml` file works with the individual `Dockerfile`. Let's take a look at the docker-compose file first. We have a key called `services` at the very top, which defines the different applications/services we want to get running. As this is a `.yml` file, it is important to remember that indentations are crucial. Lets dive into the first service defined in this docker compose file, the database.

#### **3.1. Database**

---

First of all, the database needs to be set up and running in order for the server to be able to connect to it. The database does not need any Dockerfile in this particular instance, however, it can be done with a Dockerfile too. Lets go through the configurations.

_`docker-compose.yml`_

```yml
db:
    image: postgres:13
    restart: always
    volumes:
        - db_data:/var/lib/postgresql/data
        - ./db/01.init.sql:/docker-entrypoint-initdb.d/01.init.sql
        - ./db/02.data_seed.sql:/docker-entrypoint-initdb.d/02.data_seed.sql
    environment:
        POSTGRES_USER: ${POSTGRES_USER}
        POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
        POSTGRES_DB: ${POSTGRES_DB}
    ports:
        - '5432:5432'
```

#### Explanation

-   **_db_**: Used to identify the service to which this section of the compose file belongs. This alias will be used to reference the service from other containers (for example, in `depends_on`).
-   **_image_**: defines the Docker image that will be required to make this container functional and running.
-   **_restart_**: If the container stops or fails, Docker automatically restarts it.
-   **_environment_**: Defines variables for the environment of this particular service. For example, for this PostgreSQL service, we will define `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB`. All are assigned the values ​​from the `.env`.
    -   **_db_data_**: is a named Docker volume; it persists Postgres data.
    -   **_/db/01.init.sql_**: Copy the SQL script _`01.init.sql`_ inside the container, to the folder Postgres runs on startup.
    -   **_/db/02.data_seed.sql_**: Same as above, but with a second script that initializes sample data.
-   **_ports_**: Maps the host port (making it accessible from the outside) to the port used by the application in Docker.

> **_Note_**: SQL scripts mounted in /docker-entrypoint-initdb.d/ are executed only the first time the data volume is initialized, allowing you to automatically create tables and populate data.

#### **3.2. Redis Cache**

---

_`docker-compose.yml`_

```yml
redis:
    image: redis
    container_name: ${REDIS_CONTAINER_NAME}
    expose:
        - ${REDIS_PORT}
    volumes:
        - redis_data:/data
```

**Explanation**

-   **_redis_**: Defines the service name. Other services can reference this as redis in Docker Compose (`depends_on`, network aliases, etc.).
-   **_image_**: Specifies the Docker image to use. Here it pulls the official redis image from Docker Hub.
-   **_container_name_** : Assigns a fixed name to the container instead of a generated one. This makes it easier to identify or inspect the Redis container (e.g., docker logs redis_cache).
-   **_expose_**: Declares that port inside the container is available to linked services on the same Docker network. Note that expose does not publish the port to the host machine.
-   **_volumes_**: Mounts a named volume (redis_data) at /data inside the container. This ensures Redis’s data directory is persisted across container restarts and recreations.

#### **3.3. Backend**

---

_`Dockerfile`_

```Dockerfile
FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

**Explanation**

-   **_FROM_**: Select the base Docker image: the LTS (Long Term Support) version of Node.js. It includes Node and npm out of the box.
-   **_WORKDIR_**: Set /app as the working directory inside the container. All subsequent commands (COPY, RUN, etc.) will be run from that path.
-   **_COPY_**: Copy the package.json and package-lock.json files (if they exist) from your local machine to the container's working directory. This allows you to install only the dependencies before copying the rest of the code.
-   **_RUN_**: Run `npm install` inside the container and install all the dependencies listed in package.json, in the node_modules folder.
-   **_COPY_**: Copy all the project files and folders (except those ignored in `.dockerignore`) to the container's working /app path. This is how you transfer the source code to the container.
-   **_EXPOSE_**: Indicates that the application inside the container will listen on port 5000. It doesn't publish the port on the host, but it documents the intent and allows you to use -P or automatic network bindings.
-   **_CMD_**: Defines the default command to run when the container starts: `npm start` is invoked here, which normally starts the Node.js server.

_`docker-compose.yml`_

```yml
backend:
    build: ./backend
    volumes:
        - ./backend:/app
        - /app/node_modules
    command: ['npm', 'run', 'dev']
    environment:
        - DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:${POSTGRES_PORT}/${POSTGRES_DB}
        - OPENWEATHER_API_KEY=${OPENWEATHER_API_KEY}
        - USER_TOKEN_HEADER=${USER_TOKEN_HEADER}
        - REDIS_HOST=${REDIS_HOST}
        - REDIS_PORT=${REDIS_PORT}
        - REDIS_PASSWORD=${REDIS_PASSWORD}
        - REDIS_URL=redis://${REDIS_CONTAINER_NAME}
        - PORT=${BACKEND_PORT}
    ports:
        - '${BACKEND_PORT}:${BACKEND_PORT}'
    depends_on:
        - db
        - redis
    links:
        - redis
```

**Explanation**

-   **_backend_**: Section that defines the Node.js application service.
-   **_build_**: Indicates that Docker should build the image using the Dockerfile located in the ./backend folder.
-   **_volumes_**: List of volume mounts for hot development and dependency persistence.
    -   **_`./backend`:`/app`_**: Synchronizes local code from ./backend to /app within the container, allowing changes to be seen in real time.
    -   **_`/app/node_modules`_**: Anonymous volume that preserves the container's node_modules folder, preventing it from being overwritten by a previous mount.
-   **_command_**: [`"npm"`, `"run"`, `"dev"`] Overrides the image's default command to run npm run dev, typical for development environments.
-   **_environment_**: Environment variables injected into the container.
-   **_ports_**: Host → container port mapping. Exposes the container's port to the local machine's port.
-   **_depends_on_**: Defines startup dependencies:
    -   **_db_**: Starts the database service first.
    -   **_redis_**: Then starts the cache service.
-   **_links_**: (Legacy) Creates a redis network alias so the backend container can easily resolve the redis host.

#### **3.4. Frontend**

---

_`Dockerfile`_

```Dockerfile
FROM node:lts
WORKDIR /usr/src/app/frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

**Explanation**

-   **_FROM_**: Selects the latest LTS (Long Term Support) version of Node.js as the base image. This ensures stability and security updates without setting a specific version number.
-   **_WORKDIR_**: `/usr/src/app/frontend` Creates (or changes) the working directory within the container to `/usr/src/app/frontend`. From here, all subsequent commands (COPY, RUN, etc.) are executed relative to that folder.
-   **_COPY_**: `package*.json ./` Copy only the `package.json` and `package-lock.json` (or npm-shrinkwrap.json) files from your machine to the container's working directory. This allows Docker to use the caching layer for dependencies if they don't change.
-   **_RUN_**: `npm install` Runs the installation of all dependencies listed in package.json, generating the node_modules folder. By being preceded by copying only the manifest files, this step speeds up future builds if you don't modify those dependencies.
-   **_COPY_**: `. .` Copy the rest of your project's source code into the container's working directory. It includes components, configurations, and assets needed to run the application.
-   **_EXPOSE_**: `3000` Documents that the container listens on port 3000 (the default port for Create React App). It doesn't publish the port on the host, but it makes it easier to map it with -p or use Docker Compose.
-   **_CMD_**: [`"npm"`, `"start"`] Defines the default command when starting the container: run npm start, which normally starts the React development server (react-scripts start) in "watch" mode on port 3000.

---

_`docker-compose.yml`_

```yml
frontend:
    build: ./frontend
    ports:
        - '${FRONTEND_PORT}:${FRONTEND_PORT}'
    stdin_open: true
    depends_on:
        - backend
    environment:
        - PORT=${FRONTEND_PORT}
        - REACT_APP_USER_TOKEN_HEADER=${USER_TOKEN_HEADER}
        - REACT_APP_API_URL=http://localhost:${BACKEND_PORT}/api
    volumes:
        - ./frontend:/usr/src/app/frontend
        - /usr/src/app/frontend/node_modules
```

**Explanation**

-   **_frontend_**: Defines the service named `"frontend"` within Docker Compose.
-   **_build_**: `./frontend` Indicates that an image should be built using the Dockerfile located in the `./frontend` folder.
-   **_ports_**: Maps the port defined in the host's FRONTEND_PORT environment variable to the same port within the container, exposing the React application on that port.
-   **_stdin_open_**: Keeps the container's stdin (standard input) open, useful for sending commands or for interactive debugging if a terminal is connected.
-   **_depends_on_**:
    -   **_backend_**: Ensures that the `backend` container starts before this `frontend` service.
-   **_environment_**: Environment variables injected into the container:
-   **_volumes_**:
    -   `./frontend:/usr/src/app/frontend`: Mounts the local source code (`./frontend`) inside the container to `/usr/src/app/frontend`, allowing hot reloading and viewing changes in real time.
    -   `/usr/src/app/frontend/node_modules`: Creates an anonymous volume for the container's node_modules folder, preventing code mounting from overwriting installed dependencies.

### **4. Execution details**

---

#### **4.1. Prerequisites**

---

-   Docker (v20+) and Docker Compose (v2+) installed on your machine.

-   Clone the repository locally:

```sh
git clone https://github.com/franklinpradocaritas/weather-dashboard.git
cd weather-dashboard
```

-   Defined environment variables (can reside in an .env file at the project root):

```yml
# .env (root path)
FRONTEND_PORT=3000
BACKEND_PORT=5000

POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=weather
POSTGRES_PORT=5432

REDIS_CONTAINER_NAME=redis_cache
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=your_secure_password

OPENWEATHER_API_KEY=api_key_openweather_here
USER_TOKEN_HEADER=x-user-token
```

#### **4.2. Environment Configuration**

---

-   Duplicate the example variables:

```sh
cp .env.example .env
```

-   Edit `.env` with your desired credentials and ports.

-   Verify that the SQL scripts in `init.sql` and the files in `db/` are in the correct path and without syntax errors.

#### **4.3. Launch the Application**

---

From the project root, run:

```sh
docker-compose up --build
```

Backend listening on: `http://localhost:${BACKEND_PORT}`

Frontend accessible on: `http://localhost:${FRONTEND_PORT}`

To run in the background (detached):

```sh
docker-compose up --build -d
```

To stop and delete created containers, networks, and anonymous volumes:

```sh
docker-compose down
```

#### **4.4. Useful Commands**

---

View service logs:

```sh
docker-compose logs -f backend
```

Rebuild a single service:

```sh
docker-compose build frontend
```

Open a shell inside the container:

```sh
docker-compose exec backend sh
```

Run backend unit tests:

```sh
docker-compose exec backend npm test
```

#### **4.5. Possible errors and solutions**

---

| Error                                        | Causa común                                                                            | Solución rápida                                                                                                        |
| -------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Ports are not available:… bind: address…** | The mapped port is already in use on the local machine.                                | 1. Stop the process occupying the port (`lsof -i :5000 … kill`).<br>2. Change the port in `.env` and in `ports:`.      |
| **ECONNREFUSED 127.0.0.1:6379**              | The backend attempts to connect to Redis on `localhost` instead of the Docker service. | 1. Check `REDIS_URL` in `.env`: `redis://default:PASS@redis:6379`.<br>2. Use the `redis` hostname in `docker-compose`. |
| **Error 401 Unauthorized**                   | Missing or expired token in request headers.                                           | 1. Verify that `AuthContext` or Axios interceptor correctly injects `x-user-id` and/or `Authorization`.                |
| **Database initialization errors**           | SQL scripts in `initdb.d/` contain errors or are not mounted.                          | 1. Review `init.sql` syntax.<br>2. Confirm mount on `db` service volumes.                                              |

#### **4.6. Debugging Tips**

---

Inspect container status:

```sh
docker ps -a
```

Delete volumes (for a clean reboot):

```sh
docker-compose down -v
```

Connect to the database:

```sh
psql postgres://user:password@db:5432/weather
```

Test Redis connection:

```sh
docker-compose exec redis redis-cli -a your_secure_password ping
```
