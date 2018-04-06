var express = require('express');
var router = express.Router();
var Task = require('../models/Task');
var mail = require('../connection/mailConfig'); //reference of dbconnection.js


router.get('/:id?', function (req, res, next) {

    debugger;
    if (req.params.id) {

        Task.getTaskById(req.params.id, function (err, rows) {

            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {

        Task.getAllTasks(function (err, rows) {
            if (err) {
                // res.json(err);
                return next(err);
            } else {
                // try {
                    debugger;
                    throw new Error("this is error 404");
                    var mailOptions = {
                        from: 'rajeev.bv@lotuswireless.com',
                        to: 'rajeev.bv@lotuswireless.com',
                        subject: 'Sending Email using Node.js',
                        // html: '<h1>That was easy!</h1>',
                        text: '<h1>That was easy!</h1>'
                    };
                    mail.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.json(rows);
                // } catch (error) {
                //     var err = {
                //         "status": 400,
                //         message: error
                //     };
                //     return next(err);
                // }

            }
        });
    }
});
router.post('/', function (req, res, next) {
    // console.log(res);
    Task.addTask(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 &amp;amp;amp; 0
        }
    });
});

router.delete('/:id', function (req, res, next) {

    Task.deleteTask(req.params.id, function (err, count) {

        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }

    });
});
router.put('/:id', function (req, res, next) {

    Task.updateTask(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;