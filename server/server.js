const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const database = require('./models/database');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const TasksController = require("./controllers/tasks.controller");
const tasksController = new TasksController();

app.get('/api/tasks', function(req, res) {
    const title = req.query.title;
    const status = req.query.status;
    const skip = req.query.skip;
    const limit = req.query.limit;
    tasksController.getAll(title, status, skip, limit, (response) => {
        if(!response) {
            res.sendStatus(404);
        } else {
            res.send(response);
        }
    });
});

app.get('/api/tasks/:id', function (req, res) {
    tasksController.getById(req.params.id, (response) => {
        if(!response) {
            res.status(404).send('Not Found');
        } else {
            res.send(response);
        }
    });
});

app.post('/api/tasks', function (req, res) {
    tasksController.create(req.body, (response) => {
        if(!response) {
            res.status(404).send('Not Found');
        } else {
            res.send(response);
        }
    });
});

app.put('/api/tasks', function (req, res) {
    tasksController.update(req.body, (response) => {
        if(!response) {
            res.status(404).send('Not Found');
        } else {
            res.send(response);
        }
    });
});

app.delete('/api/tasks/:id', function(req, res) {
    tasksController.delete(req.params.id, (response) => {
        if(!response) {
            res.status(404).send('Not Found');
        } else {
            res.send(response);
        }
    });
});

database.connect('mongodb://localhost:27017/', 'nodejstest', function(err) {
    if(err) {
        console.log('Error! ', err);
        return;
    }

    app.listen('3012', function () {
        console.log('API app started');
    });
});