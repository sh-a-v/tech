'use strict';

var
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var
    BookSchema = new Schema({
        title: String
    });

module.exports = mongoose.model('Book', BookSchema);