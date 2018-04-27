var express = require('express');
var router = express.Router();
var Task = require('../models/Task');
var mail = require('../connection/mailConfig'); //reference of dbconnection.js
const Joi = require('joi');
const schema = Joi.object().keys({
    actionMode: Joi.string().required(),
    parameter1: [Joi.string(), Joi.number(), Joi.empty()],
    parameter2: [Joi.string(), Joi.number(), Joi.empty()],
    parameter3: [Joi.string(), Joi.number(), Joi.empty()],
    parameter4: [Joi.string(), Joi.number(), Joi.empty()],
    parameter5: [Joi.string(), Joi.number(), Joi.empty()]
});
const taskSchema = Joi.object().keys({
    Id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    Title: Joi.string().required(),
    Status: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
});

router.get('/hr_user', function (req, res, next) {
    debugger;
    try {
        // if (validationSchema(req.body, schema, next))
        Task.getAllHRTasks(function (err, rows) {
            if (err) {
                return next(err);
            } else {
                return getOperationSingle(res, rows);
            }
        });
    } catch (error) {
        catchOperation(error, next);
    }
});


router.get('/:id?', function (req, res, next) {
    debugger;
    console.info('Process id : ' + process.pid);
    if (req.params.id) {

        Task.getTaskById(req.params.id, function (err, rows) {

            if (err) {
                // res.status(500).json(err)
                return next(err);
            } else {
                res.json(rows);
            }
        });
    } else {

        Task.getAllTasks(function (err, rows) {
            if (err) {
                // res.status(500).json(err)
                return next(err);
            } else {
                // try {
                debugger;
                // throw new Error("this is error 404");
                //# mail testing
                // var mailOptions = {
                //     from: 'rajeev.bv@lotuswireless.com',
                //     to: 'rajeev.bv@lotuswireless.com',
                //     subject: 'Sending Email using Node.js',
                //     // html: '<h1>That was easy!</h1>',
                //     text: '<h1>That was easy!</h1>'
                // };
                // mail.sendMail(mailOptions, function (error, info) {
                //     if (error) {
                //         console.log(error);
                //     } else {
                //         console.log('Email sent: ' + info.response);
                //     }
                // });
                //# mail testing end
                // console.log("Set TimerOut");

                setTimeout(() => {
                    return res.json(rows)
                }, 20000)
                // res.json(rows)
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


router.post('/sp', function (req, res, next) {
    try {
        if (validationSchema(req.body, schema, next))
            Task.getAllTasksSP(req.body, function (err, rows) {
                if (err) {
                    return next(err);
                } else {
                    return getOperation(res, rows);
                }
            });
    } catch (error) {
        catchOperation(error, next);
    }
});

router.post('/', function (req, res, next) {
    var taskSch = taskSchema.keys({
        Id: Joi.alternatives().try(Joi.string(), Joi.number(), Joi.empty())
    })
    if (validationSchema(req.body, taskSch, next)) {
        Task.addTask(req.body, function (err, count) {
            if (err) {
                // res.status(500).json(err)
                return next(err);
            } else {
                res.json(req.body); //or return count for 1 &amp;amp;amp; 0
            }
        });
    }
});

router.delete('/:id', function (req, res, next) {
    Task.deleteTask(req.params.id, function (err, count) {
        if (err) {
            // res.status(500).json(err)
            return next(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/update', function (req, res, next) {
    var taskSch = taskSchema.keys({
        Id: Joi.alternatives().try(Joi.string(), Joi.number()).required()
    });
    if (validationSchema(req.body, taskSch, next)) {
        Task.updateTask(req.params.id, req.body, function (err, rows) {

            if (err) {
                // res.status(500).json(err)
                return next(err);
            } else {
                res.json(rows);
            }
        });
    }
});

router.put('/:id', function (req, res, next) {

    Task.updateTask(req.params.id, req.body, function (err, rows) {

        if (err) {
            // res.status(500).json(err)
            return next(err);
        } else {
            res.json(rows);
        }
    });
});

//
// ──────────────────────────────────────────────────────────────────── CATCH ─────
catchOperation = (error, next) => {
    var err = {
        "status": 400,
        message: error
    };
    return next(err);
}

//
// ─────────────────────────────────────────────────────────────── VALIDATION ─────
validationSchema = (body, schema, next) => {
    const result = Joi.validate(body, schema);
    if (result.error) {
        result.error["status"] = 400;
        return next(result.error);
    }
    return true;
}

//
// ────────────────────────────────────────────────────────────────────── GET ─────
getOperation = (res, rows) => {
    if (rows.length === undefined) {
        return res.status(400).json({
            "status": 400,
            "message": "Requested parameter mismatch"
        });
    } else {
        return res.json(rows[0]);
    }
}

//
// ────────────────────────────────────────────────────────────────────── GET ─────
getOperationSingle = (res, rows) => {
    if (rows.length === undefined) {
        return res.status(400).json({
            "status": 400,
            "message": "Requested parameter mismatch"
        });
    } else {
        return res.json(rows);
    }
}

module.exports = router;