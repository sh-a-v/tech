'use strict';

var
    CLIENT_SETTINGS = require('./client-settings'),
    SETTINGS = require('./settings'),

    express = require('express'),
    router = require('./router'),
    apiRouter = require('./api/router'),

    app = express();

app
    /* Static */
    .use(express.static(CLIENT_SETTINGS.STATIC_FILES_PATH))

    /* API */
    .use('/api', apiRouter)

    /* Router */
    .use('*', router)

    /* Server */
    .listen(SETTINGS.port, function () {
        console.log('Express server listening on port ' + SETTINGS.port);
    });