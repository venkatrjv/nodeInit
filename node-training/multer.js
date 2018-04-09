var express = require('express');
var multer = require('multer')
var upload = require('../connection/disk-storage')
var global = require("./global")
var file = express.Router();
var fs = require("fs");

var cors = require('cors');

file.post('/', multer().single('file'), function (req, res, next) {
    // req.file is the `avatar` file 
    // req.body will hold the text fields, if there were any 
    debugger;
    try {

        if (req.file) {
            // console.dir(req.file);
            // console.log(req.body);
            var data = global.js_yyyy_mm_dd_hh_mm_ss();
            var path = require('path');
            var appDir = path.dirname(require.main.filename);
            fs.writeFile(appDir + "/files/" + data + req.file.originalname, req.file.buffer, (err) => {
                if (err) {
                    return res.status(500).send({
                        message: "Failed to store file",
                        error: err
                    });
                } else {
                    console.log('The file has been saved!');
                    return res.send(req.file);
                }
            });
            // upload.single("test")
            // (req, res, function (err) {
            //     console.log("File uploaded..");
            //     res.end(req.body)
            // })
            // res.send(req.body)

        }
    } catch (error) {
        var err = {
            "status": 400,
            message: error
        };
        return next(err);
    }
})


module.exports = file;