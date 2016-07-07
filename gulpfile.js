var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    csslint = require('gulp-csslint'),
    sassLint = require('gulp-sass-lint'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    sassdoc = require('sassdoc'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    Server = require('karma').Server,
    jsdoc = require('gulp-jsdoc3'),
    bower = require('gulp-bower'),
    wiredep = require('gulp-wiredep');

var input = 'examples/scss/*.scss';
var output = 'examples/css';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR', 'IE 9', 'IE 10', 'IE 11']
};

/**
 *
 * Optimize Code
 *
 */

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output))
    .pipe(livereload());
});

gulp.task('minify-css', function () {
  return gulp
    .src(['examples/css/*.css', '!examples/css/*.min.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('examples/css'))
    .pipe(livereload());
});

gulp.task('bower-init', function() {
  return bower();
});

gulp.task('bower-wiredep', function() {
  return gulp
    .src('examples/index.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('examples/'))
});

/*gulp.task('csslint', function() {
  return gulp
    .src('src/css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});*/

gulp.task('sassLint', function () {
  return gulp
    .src('examples/scss/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('jshint', function () {
  return gulp
    .src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('minify-js', function (cb) {
  pump([
        gulp.src(['src/*.js']),
        uglify(),
        rename({ suffix: '.min' }),
        gulp.dest('build/')
    ],
    cb
  );
});

/**
 *
 * Watcher and LiveReload
 *
 */

gulp.task('html', function () {
  gulp.src('examples/*.html')
    .pipe(connect.reload())
    .pipe(livereload());
});

gulp.task('js', function () {
  gulp.src('src/*.js')
    .pipe(connect.reload())
    .pipe(livereload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'examples',
    livereload: true
  });
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['src/scss/*.scss'], ['sassLint']);
  gulp.watch(['src/js/*.js', '!src/js/*.min.js'], ['jshint']);
  gulp.watch(['src/*.html'], ['html']);
  gulp.watch(['src/scss/*.scss'], ['sass']);
  gulp.watch(['src/js/*.js'], ['js']);
});

/*
 *
 * Documentation
 *
 */

gulp.task('sassdoc', function () {
  return gulp
    .src(input)
    .pipe(sassdoc())
    .resume();
});

gulp.task('jsdoc', function (cb) {
  return gulp
    .src(['README.md', 'src/*.js'], {read: false})
    .pipe(jsdoc(cb));
});

/**
 *
 * Testing
 *
 */

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('default', ['connect', 'watch']);

gulp.task('bower', ['bower-init', 'bower-wiredep']);

// Test task 
//gulp.task('test', ['test']);

gulp.task('compile', ['sassdoc', 'minify-css', 'jsdoc', 'minify-js']); //bower