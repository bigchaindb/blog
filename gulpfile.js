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

// 'development' is just default, production overrides are triggered
// by adding the production flag to the gulp command e.g. `gulp build --production`
var isProduction = ($.util.env.production === true ? true : false);


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
var SRC      = 'src/',
    DIST     = 'dist/bigchaindb-blog/';

// Port to use for the development server
var PORT = 1337,
    GHOSTURL = 'localhost:2368';

// Browsers to target when prefixing CSS
var COMPATIBILITY = ['Chrome >= 30', 'Safari >= 6.1', 'Firefox >= 35', 'Opera >= 32', 'iOS >= 8', 'Android >= 4', 'ie >= 10'];


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Tasks
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//
// Delete build artifacts
//
gulp.task('clean', function(done) {
    return del([
        DIST + '**/*',
        DIST + '.*' // delete all hidden files
    ], done)
});


//
// Styles
//
gulp.task('css', ['clean'], function() {
    return gulp.src(SRC + 'assets/scss/bigchaindb-blog.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({ browsers: COMPATIBILITY }))
        .pipe($.if(isProduction, $.cssmin()))
        .pipe($.if(!isProduction, $.sourcemaps.write()))
        .pipe($.if(isProduction, $.header(BANNER, { pkg: pkg })))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(DIST + 'assets/css/'))
        .pipe(browser.stream())
});


//
// JavaScript
//
gulp.task('js', ['clean'], function() {
    return gulp.src(SRC + 'assets/js/bigchaindb-blog.js')
    .pipe($.sourcemaps.init())
    .pipe($.include())
    .pipe($.if(isProduction, $.uglify())).on('error', onError)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe($.if(isProduction, $.header(BANNER, { pkg: pkg })))
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(DIST + 'assets/js/'))
});


//
// Copy Images
//
gulp.task('img', ['clean'], function() {
    return gulp.src(SRC + 'assets/img/**/*')
        .pipe($.if(isProduction, $.imagemin({
            optimizationLevel: 3, // png
            progressive: true, // jpg
            interlaced: true, // gif
            multipass: true, // svg
            svgoPlugins: [{ removeViewBox: false }]
        })))
        .pipe(gulp.dest(DIST + 'assets/img/'))
});


//
// Copy all the rest
//
gulp.task('copy', ['clean'], function() {

    gulp.src([
      SRC + '*.hbs',
      './README.md',
      './package.json'
    ])
    .pipe(gulp.dest(DIST))

    gulp.src(SRC + 'partials/*.hbs')
        .pipe(gulp.dest(DIST + 'partials/'))

    gulp.src(SRC + 'assets/fonts/**/*')
        .pipe(gulp.dest(DIST + 'assets/fonts/'))
});


//
// Create zip package for upload
//
gulp.task('zip', ['clean', 'copy', 'css', 'js', 'img'], function() {
    if (isProduction) {
        return gulp.src(DIST + '/*')
            .pipe($.zip('bigchaindb-blog.zip'))
            .pipe(gulp.dest('dist'))
    }
});



//
// Dev Server
//
gulp.task('server', ['build'], function() {
    browser.init({
        proxy: GHOSTURL,
        port: PORT,
        reloadDebounce: 2000
    });
});


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Task sequences
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//
// Build site, run server, and watch for file changes
//
gulp.task('default', ['build', 'server'], function() {
    gulp.watch([SRC + '**/*'], ['build', browser.reload])
});


//
// Full build
//
// `gulp build` is the development build
// `gulp build --production` is the production build
//
gulp.task('build', ['clean', 'copy', 'css', 'js', 'img', 'zip'])
