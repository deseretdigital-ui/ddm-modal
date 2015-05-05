var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var config = require('../config');

gulp.task('dist', [
  'distJs',
  'distScss'
]);

gulp.task('distJs', function () {
  return gulp.src(config.tasks.distJs.src)
    .pipe(gulp.dest(config.tasks.distJs.dest));
});

gulp.task('distScss', function () {
  return gulp.src(config.tasks.distScss.src)
    .pipe(sass())
    .pipe(prefix('last 2 versions', '> 1%', 'ie 8'))
    .pipe(gulp.dest(config.tasks.distScss.dest));
});
