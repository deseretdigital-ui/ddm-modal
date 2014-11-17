var gulp = require('gulp');
var bower = require('main-bower-files');
var config = require('../config');

gulp.task('example', [
  'exampleStatic',
  'exampleDist',
  'exampleBower'
]);

gulp.task('exampleStatic', function () {
  return gulp.src(config.tasks.exampleStatic.src)
    .pipe(gulp.dest(config.tasks.exampleStatic.dest));
});

gulp.task('exampleDist', ['dist'], function () {
  return gulp.src(config.tasks.exampleDist.src)
    .pipe(gulp.dest(config.tasks.exampleDist.dest));
});

gulp.task('exampleBower', function () {
  return gulp.src(bower(), { base: './bower_components' })
    .pipe(gulp.dest(config.tasks.exampleBower.dest));
});
