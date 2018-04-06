const express = require("express");
const hbs = require('hbs');
var about = express();
hbs.registerPartials(__dirname + '/partials');
var hbsMail = require('nodemailer-express-handlebars');
var mail = require('../connection/mailConfig'); //reference of dbconnection.js
// console.log(__dirname + '\\partials');

about.get("/", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "This is custom page title",
        currentYear: new Date().getFullYear(),
        comments: [{
                firstName: "Yehuda1",
                lastName: "Katz1" 
            },
            {
                firstName: "Yehuda2",
                lastName: "Katz2"
            },
            {
                firstName: "Yehuda3",
                lastName: "Katz3"
            },
            {
                firstName: "Yehuda4",
                lastName: "Katz4"
            }
        ]
    });
})

about.get("/email", (req, res) => {
    try {
        debugger;
        var options = {
            viewEngine: {
                extname: '.hbs',
                layoutsDir: 'views',
                defaultLayout : 'about',
                partialsDir : 'views/partials/'
            },
            viewPath: 'views',
            extName: '.hbs'
        };
        //attach the plugin to the nodemailer transporter
        mail.use('compile', hbsMail(options));
        //send mail with options
        var mailContent = {
            from: 'rajeev.bv@lotuswireless.com',
            to: 'rajeev.bv@lotuswireless.com',
            subject: 'Test',
            template: 'about',
            context: {
                pageTitle: "This is custom page title",
                currentYear: new Date().getFullYear(),
                comments: [{
                        firstName: "Yehuda1",
                        lastName: "Katz1"
                    },
                    {
                        firstName: "Yehuda2",
                        lastName: "Katz2"
                    },
                    {
                        firstName: "Yehuda3",
                        lastName: "Katz3"
                    },
                    {
                        firstName: "Yehuda4",
                        lastName: "Katz4"
                    }
                ]
            }
        }
        mail.sendMail(mailContent, function (err) {
            if (err) {
                res.json({
                    'status': 'error',
                    'erro': err
                });
            } else {
                res.json({
                    'status': 'success'
                });
            }
        });
    } catch (error) {
        res.send(error);
    }
});

module.exports = about;