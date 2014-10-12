'use strict';

var
  express = require('express'),
  passport = require('./passport'),
  User = require('../models/user'),
  recoveryPasswordMail = require('../mail/mail-recovery-password'),
  authRouter = express.Router();

authRouter
  .post('/auth/', function (req, res, next) {
    passport.authenticate('local', function (err, user) {
      if (user)
        req.logIn(user, function (err) {});

      var response = {
        success: Boolean(err),
        user: {
          authentication: req.isAuthenticated()
        }
      };

      if (user && user.isAdmin())
        response.user.admin = true;

      if (user && user.isPublisher())
        response.user.publisher = true;

      res.json(response);
    })(req, res, next);
  })

  .put('/auth/', function (req, res, next) {
    passport.authenticate('local-recovery', function (err, user, newPassword) {
      var mail;

      if (!err && user)
        mail = recoveryPasswordMail(user.local.email, newPassword);

      res.json({
        success: !err && !!mail && mail.success,
        userExist: !!user
      });
    })(req, res, next);
  })

  .get('/auth/', function (req, res) {
    var response = {
      success: true,
      user: {
        authentication: req.isAuthenticated()
      }
    };

    if (req.user.isAdmin())
      response.user.admin = true;

    if (req.user.isPublisher())
      response.user.publisher = true;

    res.json(response);
  });

module.exports = authRouter;
