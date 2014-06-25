'use strict';

var
    express = require('express'),
    passport = require('./passport'),
    User = require('../models/user'),
    authRouter = express.Router();

authRouter
    .post('/auth/', passport.authenticate('local'), function (req, res) {
        res.json({ authentication: req.isAuthenticated() });
    })
    .put('/auth/', function (req, res) {
        console.log('!!!!!!!!! put');
        res.json({});
    })
    .get('/auth/', function (req, res) {
        res.json({ authentication: req.isAuthenticated() });
    });

module.exports = authRouter;