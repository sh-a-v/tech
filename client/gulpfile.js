'use strict';

var
  gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  templateCache = require('gulp-angular-templatecache'),
  cssBase64 = require('gulp-css-base64'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync');

var
  reload = browserSync.reload;

var
  paths = {
    stylesheetsFolder: 'stylesheets/',  /* Stylesheets */
    stylusFiles: [
      'stylesheets/stylus/constants/*.styl',

      'stylesheets/stylus/general/*.styl',
      'stylesheets/stylus/general/**/*.styl',

      'stylesheets/stylus/*.styl',
      'stylesheets/stylus/**/*.styl'
    ],

    scriptsFolder: 'scripts/',  /* Scripts */
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

    templatesFolder: 'templates/',  /* Templates */
    templatesFiles: [
      'templates/client-side/*.html',
      'templates/client-side/**/*.html'
    ]
  };


gulp
  .task('stylus', function () {  /* Stylesheets */
    return gulp.src(paths.stylusFiles)
      .pipe(concat('stylus.build.styl'))
      .pipe(stylus({pretty: true}))
      .pipe(cssBase64({maxWeightResource: 1000000}))
      .pipe(gulp.dest(paths.stylesheetsFolder))
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.stylesheetsFolder));
  })

  .task('templates', function () {  /* Templates */
    return gulp.src(paths.templatesFiles)
      .pipe(templateCache({module: 'app', filename: 'client-side.build.js'}))
      .pipe(gulp.dest(paths.templatesFolder));
  })

  .task('js-lib', function () {  /* Scripts lib */
    return gulp.src(paths.scriptsLibFiles)
      .pipe(concat('lib.build.min.js'))
      .pipe(gulp.dest(paths.scriptsFolder));
  })

  .task('js-app', function () {  /* Scripts app */
    return gulp.src(paths.scriptsAppFiles)
      .pipe(concat('app.build.js'))
      .pipe(gulp.dest(paths.scriptsFolder))
      .pipe(uglify({mangle: false}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(paths.scriptsFolder));
  });


gulp
  .task('browser-sync', function() {
    browserSync({
      proxy: '192.168.1.250:1337',
      host: '192.168.1.250',
      port: '3001'
    });
  });


gulp
  .task('build', function () {  /* Build */
    gulp.start('stylus');
    gulp.start('templates');
    gulp.start('js-lib');
    gulp.start('js-app');
  })

  .task('watch', ['browser-sync'], function() {  /* Watch */
    gulp.watch(paths.stylusFiles, ['stylus', browserSync.reload]);
    gulp.watch(paths.templatesFiles, ['templates', browserSync.reload]);
    gulp.watch(paths.scriptsAppFiles, ['js-app', browserSync.reload]);
  })

  .task('default', ['build', 'watch']);  /* Default */
