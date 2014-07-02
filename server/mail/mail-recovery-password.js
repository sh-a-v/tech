'use strict';
var
    nodemailer = require('nodemailer'),
    smtpTransport = require('./smtp-transport');

module.exports = function (email, password) {
    var
        mailOptions = {
            from: 'Tech',
            to: email,
            subject: 'Восстановление пароля',
            html: 'Ваш новый пароль: ' + password
        };

    smtpTransport
        .sendMail(mailOptions, function (err, res) {
            console.log(err);
            console.log(res);
            return {
                success: !!err,
                res: res,
                err: err
            }
        });
};