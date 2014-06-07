'use strict';

var express = require('express');

var apiRouter = express.Router();

apiRouter
    .get('*', function (req, res) {
        console.log('API');
    });

module.exports = apiRouter;