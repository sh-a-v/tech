'use strict';

var
    express = require('express'),

    apiRouter = express.Router();

apiRouter
    .get('*', function (req, res) {
        console.log('API');
    });

module.exports = apiRouter;