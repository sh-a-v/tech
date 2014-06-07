'use strict';

var CLIENT_SETTINGS = require('./client-settings');

var express = require('express');

var router = express.Router();

router
    .get('*', function (req, res) {
        res.sendfile(CLIENT_SETTINGS.BASE_TEMPLATE_PATH);
    });

module.exports = router;