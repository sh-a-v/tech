'use strict';

var
    path = require('path'),

    CLIENT_SETTINGS = {
        STATIC_FILES_PATH: path.join(__dirname, '../..', 'client'),
        BASE_TEMPLATE_PATH: path.join(__dirname, '../..', 'client/templates/server.base.html')
    };

module.exports = CLIENT_SETTINGS;