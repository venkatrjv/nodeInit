var db = require('../connection/dbconnection'); //reference of dbconnection.js

var Task = {

    getAllTasks: function (callback) {
        return db.query("Select * from task", callback);
    },
    getTaskById: function (id, callback) {

        return db.query("select * from task where Id=?", [id], callback);
    },
    getAllTasksSP: function (task, callback) {
        return db.query("call spGetTestData(?,?,?,?,?,?)", [task.actionMode, task.parameter1, task.parameter2, task.parameter3, task.parameter4, task.parameter5], callback)
    },
    addTask: function (Task, callback) {
        return db.query("Insert into task values(?,?,?)", [0, Task.Title, Task.Status], callback);
    },
    deleteTask: function (id, callback) {
        return db.query("delete from task where Id=?", [id], callback);
    },
    updateTask: function (id, Task, callback) {
        return db.query("update task set Title=?,Status=? where Id=?", [Task.Title, Task.Status, id], callback);
    }
};
module.exports = Task;
