var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./routes/index');

var inital = require("./node-training/initial");

var app = express();

// var schedule = require("./node-training/schedule");
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// share the file 
app.use(express.static(path.join(__dirname + '/public')));
//
// ───────────────────────────────────────────────────────────────────── JADE ─────
// app.set('view engine', 'jade');
//
// ────────────────────────────────────────────────────────────────────── HBS ─────
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//
// ───────────────────────────────────────────────────────────── CROSS ORIGIN ─────
app.use(cors());

//
// ──────────────────────────────────────────────────────────────── SCHEDULER ─────
// schedule can't be added to app js, run individually 
// app.use(schedule);

//
// ─────────────────────────────────────────────────── CROSS ORIGIN TO FOLDER ─────
app.use("/files", express.static("files"));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// ! mapping router
var allRoutes = [];

//
// ────────────────────────────────────────────────────────── AUTH VALIDATION ─────
// app.all("*", inital);
Object.keys(routes).forEach(element => {
    app.use("/" + element, routes[element]);
});
// ! end mapping router


//
// ────────────────────────────────────────────────────────────────────── 500 ─────
// no stack traces leaked to user
// app.use(function (err, req, res, next) {
//     if (err.status !== 400) {
//         res.status(err.status || 500);
//         res.status(500).send(err.message);
//     } else {
//         next(err);
//     }
// });

//
// ────────────────────────────────────────────────────────────────────── 404 ─────

// catch 404 and forward to error handler
// app.use(function (err, req, res, next) {
//     if (err.status !== 404) {
//         res.status(err.status).send(err.message || '** no unicorns here **');
//     } else {
//         res.status(404).send("Method not found");
//     }
// });


// error handlers

//
// ──────────────────────────────────────────────── DEVELOPMENT ERROR HANDLER ─────

// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        // res.render('error', {
        //     message: err.message,
        //     error: err
        // });
        res.send(err);
    });
}

// process.on('uncaughtException', function (err, req, res) {
//     // console.error(err.stack);
//     // console.log("Node NOT Exiting...");
//     res.send(err);
// });

module.exports = app;

//
// ───────────────────────────────────────────────────────────────── LISTENER ─────
app.listen("4222", function (err, rows) {
    if (err) {
        res.json(err);
    } else {
        console.log("Server Started..");
    }
});

// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
// // console.log(cluster.isMaster);
// // console.log(numCPUs);
// if (cluster.isMaster) {
//     // Fork workers.
//     for (var i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     // cluster.on('exit', (worker, code, signal) => {
//     //     // I changed this line because it affected 
//     //     // syntax highlighting
//     //     console.log('worker', worker.process.pid, 'died');
//     // });
//     cluster.on('fork', function(worker) {
//         // console.log('worker:' + worker.process.pid + " is forked");
//     });
//     cluster.on('online', function(worker) {
//         console.log('worker:' + worker.process.pid + " is online");
//     });
//     cluster.on('listening', function(worker) {
//         console.log('worker:' + worker.process.pid + " is listening");
//     });
//     cluster.on('disconnect', function(worker) {
//         console.log('worker:' + worker.process.pid + " is disconnected");
//     });
//     cluster.on('exit', function(worker) {
//         console.log('worker:' + worker.process.pid + " is dead");
//     });
// } else {
//     // Workers can share any TCP connection
//     // In this case it is an HTTP server
//     // console.log('I am the thread: ' + process.pid);
//     app.listen("4222", function (err, rows) {
//         if (err) {
//             res.json(err);
//         } else {
//             console.log("Server Started..");
//         }
//     });
// }