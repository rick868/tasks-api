# Tasks API

A RESTful API for managing tasks built with Express.js and Prisma.

## Features

- Create, read, update, and delete tasks

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma generate
```

### Get all tasks
```
GET /tasks
```

### Get a specific task
```
GET /tasks/:id
```

### Create a new task
```
POST /tasks
Content-Type: application/json

{
  "title": "Task title",
  "description": "Task description (optional)",
  "completed": false
}
```

### Update a task
```
PUT /tasks/:id
Content-Type: application/json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

### Delete a task
```
DELETE /tasks/:id
```
