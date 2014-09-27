'use strict';

var
  CLIENT_SETTINGS = require('./config/client-settings'),
  SETTINGS = require('./config/settings'),

  express = require('express'),
  mongoose = require('mongoose'),

  bodyParser = require('body-parser'),
  session = require('express-session'),
  flash = require('connect-flash'),
  passport = require('./auth/passport'),
  compression = require('compression'),
  MongoStore = require('connect-mongo')(session),

  router = require('./router'),
  authRouter = require('./auth/auth-router'),
  apiRouter = require('./api/router'),

  app = express();

mongoose
  .connect(SETTINGS.database.url);

app
  .use(express.static(CLIENT_SETTINGS.STATIC_FILES_PATH));

app
  .use(compression())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
  extended: true
  }))
  .use(session({
    secret: SETTINGS.secret,
    cookie: { maxAge: 31536000000 },
    store: new MongoStore({ url: SETTINGS.database.url }),
    resave: true,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(flash());

app
  .use('/', authRouter)
  .use('/api', apiRouter)
  .use('*', router);

app
  .listen(SETTINGS.port, function () {
    console.log('Express server listening on port ' + SETTINGS.port);
  });
