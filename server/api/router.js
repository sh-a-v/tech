'use strict';

var
    express = require('express'),
    bookRouter = require('./controllers/book'),

    apiRouter = express.Router();

apiRouter.stack =
    apiRouter.stack.concat(
        bookRouter.stack
    );

module.exports = apiRouter;