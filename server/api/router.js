'use strict';

var
    express = require('express'),
    authRouter = require('./router-controllers/auth'),
    bookRouter = require('./router-controllers/book'),

    apiRouter = express.Router();

apiRouter.stack =
    apiRouter.stack.concat(
        authRouter.stack,
        bookRouter.stack
    );

module.exports = apiRouter;