'use strict';

var
    express = require('express'),
    passport = require('./passport'),
    User = require('../models/user'),
    authRouter = express.Router();

authRouter
    /*.post('/auth/', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                *//* something *//*
            }

            if (user) {
                req.logIn(user, function (err) {
                    *//* something *//*
                });
            }

            res.json({ state: req.isAuthenticated() });
        })(req, res, next);
    })*/
    .post('/auth/', passport.authenticate('local'), function (req, res) {
        res.json({ authentication: req.isAuthenticated() });
    })
    .get('/auth/', function (req, res) {
        res.json({ authentication: req.isAuthenticated() });
    });

module.exports = authRouter;