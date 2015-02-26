var jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    gulp = require('gulp');

// Watch SCSS then Compile

gulp.task('watch', function () {
  gulp.watch('js/app.js', ['lint']);
  gulp.watch('scss/*.scss', ['scss']);
});

// Sass Compile
// And Auto Prefixer

gulp.task('scss', function () {
  gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('css'))
});

// JS Lint task

gulp.task('lint', function() {
  return gulp.src('js/app.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});


gulp.task('default', function() {
  gulp.start('scss', 'lint');
});
