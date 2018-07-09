const ObjectID = require('mongodb').ObjectID;
const Task = require('../models/task.model');
const database = require('../models/database');

class TasksController {
    getAll(title, status, skip, limit, callback) {
        const find = {};
        if(title) {
            find.title = { $regex: '.*' + title + '.*', $options: 'i' }; //title ? x.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
        }
        if(typeof(status) !== 'undefined') {
            find.status = status.toLowerCase() === 'true';
        }

        const options = {};
        if(skip) {
            options.skip = Number(skip);
        }
        if(limit) {
            options.limit = Number(limit);
        }

        database.get().collection('tasks').find(find, options).toArray(function(err, docs){
            if(err){
                console.log(err);
                callback(null);
            } else {
                callback(docs);
            }
        })
    }

    getById(id, callback) {
        if(!id) {
            return callback(null);
        }
        database.get().collection('tasks').findOne({ _id: ObjectID(id) }, function(err, doc) {
            if(err) {
                console.log(err);
                callback(null);
            } else {
                callback(doc);
            }
        })
    }

    create(data, callback) {
        if(!data || !data.title || !data.description) {
            return callback(null);
        }

        const task = new Task(
            data.title,
            data.description,
            typeof(data.status) === "undefined"
                ? false
                : typeof(data.status) === 'string' 
                    ? data.status.toLowerCase() === 'true' 
                    : data.status
        );

        database.get().collection('tasks').insert(task, function(err, result) {
            if(err) {
                console.log(err);
                callback(null);
                return;
            }
            callback(task);
        });
    }

    update(data, callback) {
        if(!data || !data.id) {
            return callback(null);
        }

        const update = {};
        if(data.title) {
            update.title = data.title;
        }
        if(data.description) {
            update.description = data.description;
        }
        if(typeof(data.status) !== 'undefined') {
            update.status = typeof(data.status) === 'string' ? data.status.toLowerCase() === 'true' : data.status;
        }

        database.get().collection("tasks").updateOne(
            { _id: ObjectID(data.id) },
            { $set: update }, 
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback(null);
                } else {
                    this.getById(data.id, callback);
                }
            }
        );
    }

    delete(id, callback) {
        if(!id) {
            return callback(null);
        }

        database.get().collection("tasks").deleteOne({ _id: ObjectID(id) }, function(err, result) {
            if (err) {
                console.log(err);
                callback(null);
            } else {
                callback({
                    id
                });
            }
        });
    }
}

module.exports = TasksController;