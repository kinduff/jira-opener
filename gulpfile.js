var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglifyjs');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var ghPages = require('gulp-gh-pages');
var plumber = require('gulp-plumber');
var serve = require('gulp-serve');

gulp.task('js', function() {
  return gulp.src([
      './src/js/app.js'
    ])
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('css', function() {
  return gulp.src('./src/style/app.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./dist/style'));
});

gulp.task('clean_images', function() {
  return gulp.src('./dist/images').pipe(clean());
});

gulp.task('images', ['clean_images'], function() {
  return gulp.src(['./src/images/**/*'])
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('jade', function() {
  return gulp.src('./src/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function() {
  gulp.watch('src/style/*.scss', ['css']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/*.jade', ['jade']);
  gulp.watch('src/images/**/*', ['images']);
});

gulp.task('run', serve('dist'));

gulp.task('default', ['build', 'run', 'watch']);

gulp.task('build', ['js', 'css', 'images', 'jade']);

gulp.task('deploy', ['build'], function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
