var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587, // have tried 465
    secure: false,
    auth: {
        user: 'rajeev.bv@lotuswireless.com',
        pass: 'Santhosh#2'
    },
    tls: {
        rejectUnauthorized: false // don't verify certificates
    },
    ignoreTLS: false // don't turn off STARTTLS support
});
module.exports = transporter;