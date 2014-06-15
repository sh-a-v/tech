'use strict';

var
    express = require('express'),
    passport = require('../../config/passport'),

    User = require('../../models/user'),

    authRouter = express.Router();

authRouter
    .post('/auth/', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err)
                return next(err);

            res.json({ message: req.flash('authMessage') });

        })(req, res, next);
    })
    .get('/auth/', function (req, res) {
        res.json({ state: req.isAuthenticated() });
    });

module.exports = authRouter;