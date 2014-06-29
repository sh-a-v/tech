'use strict';
var
    nodemailer = require('nodemailer'),
    smtpTransport;

smtpTransport = nodemailer
    .createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "shershnev.tech.server@gmail.com",
            pass: "tech_server"
        }
    });

module.exports = smtpTransport;