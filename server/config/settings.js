'use strict';

var
    SETTINGS = {
        port: 1337,
        database: {
            url: 'mongodb://tech:tech_3777489@ds045089.mongolab.com:45089/tech'
        }
    },

    LOCAL_SETTINGS;


try
    { LOCAL_SETTINGS = require('./local-settings'); }
catch (err)
    { LOCAL_SETTINGS = null; }


module.exports = LOCAL_SETTINGS || SETTINGS;
