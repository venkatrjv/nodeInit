var schedule = require('node-schedule');
var moment = require('moment');

var test1 = schedule.scheduleJob('*/10 * * * * *', function () {
    console.log('The answer to life, the universe, and everything! ' + moment().format("DD/MM/YYYY HH:mm:ss"));
});

module.exports = test1;