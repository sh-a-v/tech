'use strict';

var express = require('express'),
  bookRouter = express.Router();

bookRouter
  .get('/books/', function (req, res) {
    res.json({message: 'GET API'});

    console.log('GET API');
  })

  .post('/books/', function (req, res) {
    res.json({message: 'POST API'});

    console.log('POST API');
  });

module.exports = bookRouter;