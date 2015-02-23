var jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    watch = require('gulp-watch'),
    gulp = require('gulp');

// JS Lint task

gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

// Watch JS then Lint

gulp.task('watch', function () {
  gulp.src('js/*.js')
  .pipe(watch('js/*.js'))
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});


gulp.task('default', function() {
  // place code for your default task here
});
