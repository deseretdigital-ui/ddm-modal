var gulp = require('gulp');
var ghpages = require('gulp-gh-pages');
var config = require('../config');

gulp.task('ghpages', ['example'], function () {
  return gulp.src(config.tasks.ghpages.src).pipe(ghpages());
});
