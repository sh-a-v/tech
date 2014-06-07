'use strict';

var CLIENT_SETTINGS = require('./client-settings');

var express = require('express'),
    router = require('./router'),
    apiRouter = require('./api/router');

var app = express();

// Static
app.use(express.static(CLIENT_SETTINGS.STATIC_FILES_PATH));
// API
app.use('/api', apiRouter);
// Router
app.use('*', router);
// Server
app.listen(1337, function(){
    console.log('Express server listening on port 1337');
});