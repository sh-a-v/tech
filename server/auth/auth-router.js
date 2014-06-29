'use strict';

var
    express = require('express'),
    passport = require('./passport'),
    User = require('../models/user'),
    recoveryPasswordMail = require('./recovery-password-mail'),
    authRouter = express.Router();

authRouter
    .post('/auth/', function (req, res, next) {
        passport.authenticate('local', function (err, user) {
            if (user)
                req.logIn(user, function (err) {});

            res.json({ success: req.isAuthenticated(), authentication: req.isAuthenticated() });
        })(req, res, next);
    })
    .put('/auth/', function (req, res, next) {
        passport.authenticate('local-recovery', function (err, user, newPassword) {
            recoveryPasswordMail(user.local.email, newPassword);

            res.json({ success: !!user });
        })(req, res, next);
    })
    .get('/auth/', function (req, res) {
        res.json({ success: req.isAuthenticated(), authentication: req.isAuthenticated() });
    });

module.exports = authRouter;