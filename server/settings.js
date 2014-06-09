'use strict';

var
    SETTINGS = {
        'port': 1337
    },

    LOCAL_SETTINGS;


try
    { LOCAL_SETTINGS = require('./local-settings'); }
catch (err)
    { LOCAL_SETTINGS = null; }


module.exports = LOCAL_SETTINGS || SETTINGS;
