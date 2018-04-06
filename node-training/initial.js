var express = require('express');
var router = express.Router();
var Task = require('../models/Task');

function myMiddleware(req, res, next) {
    if (req.method === 'GET') {
        // Do some code

        Task.getTaskById(req.headers.auth, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                if (rows.length > 0) {
                    // keep executing the router middleware
                    next()
                } else {
                    res.status(306).end("Invalid Auth token");
                }
            }
        });
    }
}

module.exports = myMiddleware;