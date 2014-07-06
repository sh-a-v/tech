'use strict';

var
    SETTINGS = {
        secret: 'your_secret',
        port: 1337,
        database: {
            url: 'your_url'
        }
    },

    LOCAL_SETTINGS;


try
    { LOCAL_SETTINGS = require('./local-settings'); }
catch (err)
    { LOCAL_SETTINGS = null; }
fsbg

module.exports = LOCAL_SETTINGS || SETTINGS;
