var gulp = require('gulp');
var config = require('../config');

/**
 * Watches files based on configs
 *
 * Will watch `config.tasks.<taskName>.watch`,
 * or `config.tasks.<taskName>.src` if `watch` is not specified,
 * and run `<taskName>` as long as the following criteria are also met:
 *
 * + `config.tasks.<taskName>.watch` is not `false`.
 * + `config.tasks.<taskName>.{watch|src}` is a string or array of strings.
 */
gulp.task('watch', ['build'], function () {
  for (var taskName in config.tasks) {
    var task = config.tasks[taskName];
    if (task.watch === false) { continue; }
    if (!task.src && !task.watch) { continue; }
    var src = task.watch ? task.watch : task.src;
    console.log("watching [" + src + "] to run '" + taskName + "'.");
    gulp.watch(src, [taskName]);
  }
});
