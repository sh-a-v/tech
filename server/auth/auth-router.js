'use strict';

var
    express = require('express'),
    passport = require('./passport'),
    User = require('../models/user'),
    authRouter = express.Router();

authRouter
    .post('/auth/', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                /* something */
            }

            if (user) {
                req.logIn(user, function (err) {
                    /* something */
                });
            }

            res.json({ state: req.isAuthenticated() });
        })(req, res, next);
    })
    .get('/auth/', function (req, res) {
        res.json({ state: req.isAuthenticated() });
    });

module.exports = authRouter;