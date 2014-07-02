'use strict';

var
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    generatePassword = require('password-generator'),
    User = require('../models/user');

passport
    .use('local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        function (req, email, password, done) {
            User.findOne({ 'local.email': email }, function (err, user) {
                if ( err )
                    return done(err);

                if ( user ) {
                    if ( !user.validPassword(password) )
                        return done(err);

                    return done(null, user);
                } else {
                    var
                        newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function (err) {
                        if ( err )
                            return done(err);

                        return done(err, newUser);
                    });
                }
            });
        })
    )

    .use('local-recovery', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'recovery',
            passReqToCallback : true
        },
        function (req, email, password, done) {
            User.findOne({ 'local.email': email }, function (err, user) {
                if ( err )
                    return done(err);

                if ( user ) {
                    var
                        newPassword = generatePassword(12, false);

                    user.local.password = user.generateHash(newPassword);

                    user.save(function (err) {
                        if ( err )
                            return done(err);

                        return done(err, user, newPassword);
                    });
                } else {
                    return done(err);
                }
            });
        })
    );

passport
    .serializeUser(function (user, done) {
        done(null, user.id);
    });

passport
    .deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

module.exports = passport;
