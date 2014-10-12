'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: {type: String, required: true}
});

module.exports = mongoose.model('Book', BookSchema);
