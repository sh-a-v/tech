'use strict';

var
    CLIENT_SETTINGS = require('./config/client-settings'),

    express = require('express'),

    router = express.Router();

router
    .get('*', function (req, res) {
        res.sendfile(CLIENT_SETTINGS.BASE_TEMPLATE_PATH);
    });

module.exports = router;