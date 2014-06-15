'use strict';

var
    CLIENT_SETTINGS = require('./config/client-settings'),
    SETTINGS = require('./config/settings'),

    express = require('express'),
    mongoose = require('mongoose'),

    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('./config/passport'),
    flash = require('connect-flash'),
    //passport = require('passport'),

    router = require('./router'),
    apiRouter = require('./api/router'),

    app = express();

mongoose
    .connect(SETTINGS.database.url);

app
    /* Static */
    .use(express.static(CLIENT_SETTINGS.STATIC_FILES_PATH))

    /* Requests */
    .use(bodyParser())
    .use(cookieParser())
    .use(session({ secret: 'techreuhrgejrvnsjeriuverviebriberijdbc42634' }))
    .use(passport.initialize())
    .use(passport.session())
    .use(flash())

    /* API */
    .use('/api', apiRouter)

    /* Router */
    .use('*', router)

    /* Server */
    .listen(SETTINGS.port, function () {
        console.log('Express server listening on port ' + SETTINGS.port);
    });