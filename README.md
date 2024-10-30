# Triolla Exam

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Backend Setup (Node.js + Docker + PostgreSQL + pgAdmin)](#backend-setup-nodejs--docker--postgresql--pgadmin)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)

---

## Overview

**Project Name** is a full-stack application with a React-based frontend and a Node.js backend. The backend uses Docker for containerization, along with PostgreSQL as the database and pgAdmin for database management.

## Technologies

- **Backend**: Node.js, Docker
- **Database**: PostgreSQL, pgAdmin
- **ORM**: Prisma
- **External libraries**: Date-fns,morgan,node-cache

## Requirements

- [Node.js](https://nodejs.org/en/) (version 14+ recommended)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Backend Setup (Node.js + Docker)

1. **Clone the repository** and navigate to the frontend directory:
   ```bash
   git clone https://github.com/AvivAvisrur/triolla_exam.git
   cd triolla_exam
   ```
2. **Install Dependencies**

```
npm install
```

3. **Configure env file**

```
SERVER_PORT = 3001
DATABASE_URL=postgresql://root:1234@localhost:5432/postgres?schema=triolla
```

4.**Configure Docker**
go to the project library and run in the terminal:
IMPORTANT NOTE: Docker desktop must be open when you running the application and try to send requests.

```
docker-compose up -d
```

5.**Configure pgAdmin (optional)**

after composing the docker you will get the port 8888
go to http://localhost:8888 and you will see the pgAdmin page.
enter the credentials:

```
Username:triolla@io.com
password:1234
```

after connecting to the UI Of postgres we need to connect the database to the pgAdmin
Click on "Add new Server"
and add the next parameters:

```
Name: what ever name you like
```

go to connection tab:

```
HOST_NAME:host.docker.internal
PORT = 5432
DATA_BASE = postgres
username = root
password = 1234
```

and click save and now you should see your database tables.

4. ** Migrate models **
   run the command :

```
npx prisma migrate dev
```

and then :

```
npx prisma generate
```

4. **Start the backend**
   run the command :

```
npm run dev

```
