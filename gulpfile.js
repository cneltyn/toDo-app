//gulp
const gulp = require('gulp');

//plugins
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const iife = require('gulp-iife');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const clean = require('gulp-clean');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const del = require('del');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// tasks
gulp.task('lint', gulp.series(function(done) {
  gulp.src(['src/app.js', 'src/**/_module.js', 'src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
  return done();
}));

gulp.task('js', gulp.series(function(done) {
  gulp.src(['src/app.js', 'src/**/_module.js', 'src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(iife())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
  return done();
}));

gulp.task('html', gulp.series(function(done) {
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
  return done();
}));

gulp.task('styles', gulp.series(function(done) {
  gulp.src('src/**/*.sass')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
  return done();
}));

// gulp.task('clean', function() {
//   gulp.src('dist', { read: false })
//     .pipe(clean({ force: true}));
// });
gulp.task('clean', gulp.series(function() {
  return del('dist');
}));
// //build once
gulp.task('build', gulp.parallel('js', 'html', 'styles', 'lint'));

//dev server
gulp.task('serve', gulp.series('build', function(done) {
  // browserSync.init({
  //   server: 'dist'
  // });

  gulp.watch('src/**/*.js', gulp.series('js'));
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/**/*.sass', gulp.series('styles'));
  //.on('change', browserSync.reload);

  connect.server({
    root: 'dist/',
    livereload: true,
    port: 8080
  });
  return done();
}));