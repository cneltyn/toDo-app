//gulp
const gulp = require('gulp');

//plugins
const concat = require('gulp-concat');
const iife = require('gulp-iife');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const del = require('del');
const gulpIf = require('gulp-if');
const eslint = require('gulp-eslint');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const paths = {
  angular: [
    './node_modules/angular/angular.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js',
    './node_modules/angular-material/angular-material.js',
    './node_modules/angular-aria/angular-aria.js',
    './node_modules/angular-animate/angular-animate.js'
  ],
  material: './node_modules/angular-material/angular-material.css'
};

// tasks
gulp.task('lint', gulp.series(function() {
  return gulp.src(['src/app.js', 'src/**/_module.js', 'src/**/*.js'])
    .pipe(eslint({ configFile: 'eslintrc' }))
    .pipe(eslint.format());
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

gulp.task('js-angular', gulp.series(function() {
  return gulp.src(paths.angular)
    .pipe(concat('angular.js'))
    .pipe(gulp.dest('dist'));
}));

gulp.task('css-angular', gulp.series(function() {
  return gulp.src(paths.material)
    .pipe(concat('material.css'))
    .pipe(gulp.dest('dist'));
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

gulp.task('clean', gulp.series(function() {
  return del('dist');
}));
// build once
gulp.task('build', gulp.parallel('js', 'html', 'styles', 'lint', 'js-angular', 'css-angular'));

// dev server
gulp.task('serve', gulp.series('build', function(done) {
  gulp.watch('src/**/*.js', gulp.series('js'));
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/**/*.sass', gulp.series('styles'));

  connect.server({
    root: 'dist/',
    livereload: true,
    port: 8080
  });

  return done();
}));
