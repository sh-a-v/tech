'use strict';

var
    express = require('express'),
    passport = require('./passport'),
    User = require('../models/user'),
    authRouter = express.Router();

authRouter
    .post('/auth/', function (req, res, next) {
        passport.authenticate('local', function (err, user) {
            if (user)
                req.logIn(user, function (err) {});

            res.json({ state: req.isAuthenticated() });
        })(req, res, next);
    })
    .put('/auth/', function (req, res) {
        res.json({});
    })
    .get('/auth/', function (req, res) {
        res.json({ authentication: req.isAuthenticated() });
    });

module.exports = authRouter;