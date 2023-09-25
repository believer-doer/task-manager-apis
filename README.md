[![Actions Status](https://img.shields.io/badge/Documentation-click--here-brightgreen)](https://localhost:4800/api-docs/)

# Task Manager APIs
## Description

The repo contains the following apis:

**POST /tasks** - to add a task <br />
**GET /tasks** - to fetch tasks <br />
**GET /tasks/:id** - to get a task by id <br />
**GET /tasks/metrics** - to get tasks metrics <br />
**PUT /tasks/:id** - to update a task<br />
**DELETE/tasks/:id** - to delete a task <br />


### Installation
`$ npm i`

### Running the app

1. Development mode
`npm start`
2. Watch Mode
`npm run start:dev`
3. Dockerfile
`docker build --tag 'image_name' .`
`docker run --detach 'image_name'`

