'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  local: {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  },

  publisher: {type: Boolean, default: false},
  admin: {type: Boolean, default: false}
});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

UserSchema.methods.isAdmin = function () {
  return this.admin;
};

UserSchema.methods.isPublisher = function () {
  return this.publisher;
};

module.exports = mongoose.model('User', UserSchema);
