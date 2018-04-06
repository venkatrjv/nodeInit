var express = require('express');
var router = express.Router();
var Excel = require('exceljs');
var Task = require('../models/Task');

router.get('/', function (req, res, next) {
    Task.getAllTasks(function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            debugger;
            var workbook = new Excel.Workbook();
            var worksheet = workbook.addWorksheet('Data');
            // Add column headers and define column keys and widths
            // Note: these column structures are a workbook-building convenience only,
            // apart from the column width, they will not be fully persisted.
            worksheet.columns = [{
                    header: 'Id',
                    key: 'Id',
                    width: 10
                },
                {
                    header: 'Title',
                    key: 'Title',
                    width: 32
                },
                {
                    header: 'Status',
                    key: 'Status',
                    width: 10,
                    outlineLevel: 1
                }
            ];
            // var rows = [];
            // Add an array of rows
            // rows.forEach(e => {
            //     rows.push(
            //         e.Id, e.Title, e.Status // row by array
            //     )
            // });

            // res.json(rows);
            worksheet.addRows(rows);
            workbook.xlsx.writeFile("./files/test.xlsx")
                .then(function () {
                    // done
                });
            res.sendStatus(200);
        }

    });

});

module.exports = router;