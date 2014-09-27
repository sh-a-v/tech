'use strict';

var
    express = require('express'),
    passport = require('./passport'),
    User = require('../models/user'),
    recoveryPasswordMail = require('../mail/mail-recovery-password'),
    authRouter = express.Router();

authRouter
    .post('/auth/', function (req, res, next) {
        passport.authenticate('local', function (err, user) {
            if (user)
                req.logIn(user, function (err) {});

            res.json({
                success: !!err,
                authentication: req.isAuthenticated()
            });
        })(req, res, next);
    })

    .put('/auth/', function (req, res, next) {
        passport.authenticate('local-recovery', function (err, user, newPassword) {
            var
                mail;

            if ( !err && user )
                mail = recoveryPasswordMail(user.local.email, newPassword);

            res.json({
                success: !err && !!mail && mail.success,
                userExist: !!user
            });
        })(req, res, next);
    })

    .get('/auth/', function (req, res) {
        res.json({
            success: true,
            authentication: req.isAuthenticated()
        });
    });

module.exports = authRouter;
