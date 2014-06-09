'use strict';

var
    gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    templateCache = require('gulp-angular-templatecache'),

    paths = {
        /* Stylesheets */
        stylesheetsFolder: 'stylesheets/',
        stylusFiles: [
            'stylesheets/stylus/vars/*.styl',
            'stylesheets/stylus/*.styl'
        ],

        /* Scripts */
        scriptsFolder: 'scripts/',
        scriptsLibFiles: [
            'scripts/lib/angular.min.js',
            'scripts/lib/*.js'
        ],
        scriptsAppFolder: 'scripts/app/',
        scriptsAppFiles: [
            'scripts/app/app.js',
            'templates/client.build.js',
            'scripts/app/*.js',
            'scripts/app/*/module.js',
            'scripts/app/*/*.js',
            '!scripts/lib/*'
        ],

        /* Templates */
        templatesFolder: 'templates/',
        templatesFiles: ['templates/client/*.html']
    };


gulp
    /* Stylesheets */
    .task('stylus', function () {
        gulp.src(paths.stylusFiles)
            .pipe(concat('app.build.styl'))
            .pipe(stylus({pretty: true}))
            .pipe(gulp.dest(paths.stylesheetsFolder));
    })

    /* Templates */
    .task('templates', function () {
        gulp.src(paths.templatesFiles)
            .pipe(templateCache({module: 'app', filename: 'client.build.js'}))
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
            .pipe(gulp.dest(paths.scriptsFolder));
    });


gulp
    /* Build */
    .task('build', function () {
        gulp.start('stylus');
        gulp.start('js-lib');
        gulp.start('js-app');
        gulp.start('templates');
    })

    /* Watch */
    .task('watch', function() {
        gulp.watch(paths.stylusFiles, ['stylus']);
        gulp.watch(paths.templatesFiles, ['templates']);
        gulp.watch(paths.scriptsAppFiles, ['js-app']);
    });