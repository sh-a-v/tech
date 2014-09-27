'use strict';

var
  gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  templateCache = require('gulp-angular-templatecache'),
  cssBase64 = require('gulp-css-base64'),
  rename = require('gulp-rename');

var
  paths = {
    /* Stylesheets */
    stylesheetsFolder: 'stylesheets/',
    stylusFiles: [
      'stylesheets/stylus/constants/*.styl',

      'stylesheets/stylus/general/*.styl',
      'stylesheets/stylus/general/**/*.styl',

      'stylesheets/stylus/*.styl',
      'stylesheets/stylus/**/*.styl'
    ],

    /* Scripts */
    scriptsFolder: 'scripts/',
    scriptsLibFiles: [
      'scripts/lib/angular/angular.min.js',
      'scripts/lib/angular/*.js',

      'scripts/lib/*.js',
      'scripts/lib/**/*.js'
    ],
    scriptsAppFolder: 'scripts/app/',
    scriptsAppFiles: [
      'scripts/app/init.js',

      'scripts/app/general/*.js',
      'scripts/app/general/**/*.js',

      'scripts/app/module.js',
      'scripts/app/**/module.js',
      'scripts/app/*.js',
      'scripts/app/**/*.js',

      '!scripts/lib/*'
    ],

    /* Templates */
    templatesFolder: 'templates/',
    templatesFiles: [
      'templates/client-side/*.html',
      'templates/client-side/**/*.html'
    ]
  };


gulp
  /* Stylesheets */
  .task('stylus', function () {
    gulp.src(paths.stylusFiles)
      .pipe(concat('stylus.build.styl'))
      .pipe(stylus({pretty: true}))
      .pipe(cssBase64())
      .pipe(gulp.dest(paths.stylesheetsFolder))
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.stylesheetsFolder));
  })

  /* Templates */
  .task('templates', function () {
    gulp.src(paths.templatesFiles)
      .pipe(templateCache({module: 'app', filename: 'client-side.build.js'}))
      .pipe(gulp.dest(paths.templatesFolder));
  })

  /* Scripts lib */
  .task('js-lib', function () {
    gulp.src(paths.scriptsLibFiles)
      .pipe(concat('lib.build.min.js'))
      .pipe(gulp.dest(paths.scriptsFolder));
  })

  /* Scripts app */
  .task('js-app', function () {
    gulp.src(paths.scriptsAppFiles)
      .pipe(concat('app.build.js'))
      .pipe(gulp.dest(paths.scriptsFolder))
      .pipe(uglify({mangle: false}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.scriptsFolder));
  });


gulp
  /* Build */
  .task('build', function () {
    gulp.start('stylus');
    gulp.start('templates');
    gulp.start('js-lib');
    gulp.start('js-app');
  })

  /* Watch */
  .task('watch', function() {
    gulp.watch(paths.stylusFiles, ['stylus']);
    gulp.watch(paths.templatesFiles, ['templates']);
    gulp.watch(paths.scriptsAppFiles, ['js-app']);
  })

  /* Default */
  .task('default', ['build', 'watch']);
