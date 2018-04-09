var express = require('express');
var multer = require('multer')
var upload = require('../connection/disk-storage')
var global = require("./global")
var file = express.Router();
var fs = require("fs");

var cors = require('cors');

file.post('/', multer().single('file'), function (req, res) {
    // req.file is the `avatar` file 
    // req.body will hold the text fields, if there were any 
    debugger;
    if (req.file) {
        // console.dir(req.file);
        // console.log(req.body);
        var data = global.js_yyyy_mm_dd_hh_mm_ss();
        fs.writeFile("./files/" + data + req.file.originalname, req.file.buffer, (err) => {
            if (err) {
                console.log('The file has been saved!');
                return res.sendStatus(500).send({
                    message: "Failed to store file",
                    error: err
                });
            } else {
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
})


module.exports = file;