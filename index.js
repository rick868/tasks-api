
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

app.use(express.json());

// added the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Tasks API!'
  });
});

// GET all tasks
app.get('/tasks', async (req, res) => {
    const tasks = await prisma.tasks.findMany();
    res.json(tasks);
});

//Getting one task by id
app.get('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const task = await prisma.tasks.findUnique({
    where: { id: id }
  });
    if (task) {
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }

});

// creating a new task
app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    const newTask = await prisma.tasks.create({
        data: {
            title: title,
            description: description,
            isCompleted: false,
        }
    });
    res.status(201).json(newTask);
});

//updating a task
app.put('/tasks/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;

    try {
        const updatedTask = await prisma.tasks.update({
        where: { id: id },
        data: {
            title: title,
            description: description,
            completed: completed
        }
        });
        res.json(updatedTask);

    }
    catch (error) {
        console.error('Error updating task:', error);
        res.status(404).send('Task not found');
    }
});

// deleting a task
app.delete('/tasks/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.task.delete({
            where: { id: id }
        });
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(404).send('Task not found');
    }
});
app.listen(port, () => {
  console.log(`Server is flying and running on port ${port}`);
});
