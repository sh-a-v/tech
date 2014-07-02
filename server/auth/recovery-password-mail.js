'use strict';
var
    nodemailer = require('nodemailer'),
    smtpTransport = require('../mail/smtp-transport');

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
            if (err) {
                return { success: false, err: err };
            } else {
                return { success: true, res: res };
            }
        })
};