'use strict';

module.exports = function (passport) {
    var
        express = require('express'),

        User = require('../models/user'),

        authRouter = express.Router();

    authRouter
        .post('/auth/', function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                if (err)
                    return next(err);
                console.log(passport._serializers[0]);
                console.log(req.session.passport.user);
                console.log(user);
                //res.json({s: passport._serializers[0]});
                res.redirect('/');
                //res.json({ state: req.isAuthenticated(), message: req.flash('authMessage') });

            })(req, res, next);
        })
        .get('/auth/', function (req, res) {
            console.log(req.session.passport);
            res.json({ state: req.isAuthenticated() });
        });

    return authRouter;
};