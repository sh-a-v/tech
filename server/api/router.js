'use strict';

var express = require('express'),
  bookRouter = require('./router-controllers/book');

var apiRouter = express.Router();

apiRouter.stack =
  apiRouter.stack.concat(
    bookRouter.stack
  );

module.exports = apiRouter;
