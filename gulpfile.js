'use strict';
var gulp = require('gulp'),
  connect = require('gulp-connect'),
  bower = require('gulp-bower'),
  del = require('del'),
  gutil = require('gulp-util'),
  sourcemaps = require('gulp-sourcemaps'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  watchify = require('watchify'),
  browserify = require('browserify'),
  to5ify = require('6to5ify'),
  reactify = require('reactify');

var bundler = watchify(browserify('./app.js', watchify.args));
// add any other browserify options or transforms here
bundler.transform(to5ify);
bundler.transform(reactify);
bundler.on('update', bundle); // on any dep update, runs the bundler

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .on('prebundle', function(bund) {
      // Make React available externally for dev tools
      bund.require('react');
    })
    .pipe(source('bundle.js'))
    // optional, remove if you dont want sourcemaps
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      .pipe(sourcemaps.write('')) // writes .map file
    //
    .pipe(gulp.dest('./public/js'));
}

gulp.task('js', ['clean_site'], bundle);

gulp.task('clean_bower', function(cb) {
  del(['bower_components'], cb);
});

gulp.task('clean_site', function(cb) {
  del(['public'], cb);
});

gulp.task('bower', ['clean_bower'], function() {
  return bower()
    .pipe(gulp.dest('bower_components'));
});

gulp.task('materialize', ['bower', 'clean_site'], function() {
  return gulp.src('bower_components/materialize/bin/materialize.css')
    .pipe(gulp.dest('public/css'));
});

gulp.task('fonts', ['bower', 'clean_site'], function() {
  return gulp.src('bower_components/materialize/font/**/*')
    .pipe(gulp.dest('public/font'));
});

gulp.task('build-site', ['materialize', 'js', 'fonts', 'clean_site'], function() {
  return gulp.src('./index.html')
    .pipe(gulp.dest('public'));
});

gulp.task('react-server', function () {
  connect.server({
    root: 'public',
    port: 9000
  });
});

gulp.task('default', ['react-server', 'build-site']);
