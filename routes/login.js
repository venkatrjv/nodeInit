var express = require('express');
var router = express.Router();
var login = require('../models/login');
var mail = require('../connection/mailConfig'); //reference of dbconnection.js
var global = require('../node-training/global');
const Joi = require('joi');
const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
});

router.post('/validate', function (req, res, next) {
    try {
        debugger;
        if (global.validationSchema(req.body, schema, next))
            login.validateLogin(req.body, function (err, rows) {
                if (err) {
                    return next(err);
                } else {
                    return global.postOperation(res, rows);
                }
            });
    } catch (error) {
        global.catchOperation(error, next);
    }
});


module.exports = router;