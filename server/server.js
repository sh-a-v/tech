'use strict';

var
    CLIENT_SETTINGS = require('./client-settings'),

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
    .listen(1337, function () {
        console.log('Express server listening on port 1337');
    });