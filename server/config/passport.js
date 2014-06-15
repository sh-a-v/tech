'use strict';

var
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user');

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

passport
    .use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        function (req, email, password, done) {
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err)
                    return done(err);

                if (user) {
                    if (!user.validPassword(password))
                        return done(null, false, req.flash('authMessage', 'Вы неверно ввели пароль'));

                    return done(null, user, req.flash('authMessage', 'Вы успешно авторизованы'));
                } else {
                    var
                        newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser
                        .save(function (err) {
                            if (err)
                                return done(err);

                            return done(err, newUser, req.flash('authMessage', 'Вы успешно зарегистрированы'));
                        });
                }
            });
        })
    );

module.exports = passport;