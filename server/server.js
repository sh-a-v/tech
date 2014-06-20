'use strict';

var
    CLIENT_SETTINGS = require('./config/client-settings'),
    SETTINGS = require('./config/settings'),

    express = require('express'),
    mongoose = require('mongoose'),

    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('./auth/passport'),

    router = require('./router'),
    authRouter = require('./auth/auth-router'),
    apiRouter = require('./api/router'),

    app = express();

mongoose
    .connect(SETTINGS.database.url);

app
    .use(express.static(CLIENT_SETTINGS.STATIC_FILES_PATH));

app
    .use(cookieParser())
    .use(bodyParser())
    .use(session({ secret: 'techreuhrgejrvnsjeriuverviebriberijdbc42634', cookie: {maxAge: 100000000000} }))
    .use(passport.initialize())
    .use(passport.session())
    .use(flash());

app
    .use('/', authRouter)
    .use('/api', apiRouter)
    .use('*', router);

app
    .listen(SETTINGS.port, function () {
        console.log('Express server listening on port ' + SETTINGS.port);
    });