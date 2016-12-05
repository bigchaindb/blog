'use strict';

// load plugins
var $ = require('gulp-load-plugins')();

// manually require modules that won"t get picked up by gulp-load-plugins
var gulp = require('gulp'),
    del = require('del'),
    pkg = require('./package.json'),
    browser = require('browser-sync');

// handle errors
var onError = function(error) {
    $.util.log('');
    $.util.log($.util.colors.red('You fucked up:', error.message, 'on line' , error.lineNumber));
    $.util.log('');
    this.emit('end');
}


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Terminal Banner
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

console.log("");
console.log($.util.colors.gray("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>"));
console.log($.util.colors.cyan("                  __                  __  __    "));
console.log($.util.colors.cyan("                 |__). _  _|_  _ . _ |  \ |__)  "));
console.log($.util.colors.cyan("                 |__)|(_)(_| )(_||| )|__/|__)  "));
console.log($.util.colors.cyan("                      _/                       "));
console.log($.util.colors.gray("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>"));
console.log("");

// code banner
var BANNER = [
    '/**',
    ' ** <%= pkg.name %> v<%= pkg.version %>',
    ' ** <%= pkg.description %>',
    ' ** <%= pkg.homepage %>',
    ' **',
    ' ** <%= pkg.author.name %> <<%= pkg.author.email %>>',
    ' **',
    ' ** ',
    ' ** <%= pkg.repository.url %> ',
    ' **/',
    ''
].join('\n');


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Config
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// paths
var SRC      = 'assets/',
    DIST     = 'assets/';

// Browsers to target when prefixing CSS
var COMPATIBILITY = ['Chrome >= 30', 'Safari >= 6.1', 'Firefox >= 35', 'Opera >= 32', 'iOS >= 8', 'Android >= 4', 'ie >= 10'];


//
// Styles
//
gulp.task('css', function() {
    return gulp.src(SRC + 'scss/bigchaindb-blog.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({ browsers: COMPATIBILITY }))
        .pipe($.if(isProduction, $.cssmin()))
        .pipe($.if(!isProduction, $.sourcemaps.write()))
        .pipe($.if(isProduction, $.header(BANNER, { pkg: pkg })))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(DIST + 'css/'))
});


//
// JavaScript
//
gulp.task('js', function() {
    return gulp.src(SRC + 'js/bigchaindb-blog.js')
    .pipe($.sourcemaps.init())
    .pipe($.include())
    .pipe($.if(isProduction, $.uglify())).on('error', onError)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe($.if(isProduction, $.header(BANNER, { pkg: pkg })))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(DIST + 'js/'));
});


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Task sequences
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//
// Build site, run server, and watch for file changes
//
gulp.task('default', function() {
    gulp.watch([SRC + 'scss/**/*.scss'], ['css']);
    gulp.watch([SRC + 'js/**/*.js'], ['js']);
});
