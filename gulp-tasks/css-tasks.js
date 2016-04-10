var gulp = require('gulp');

// Concatenate CSS
var concatCss = require('gulp-concat-css');

// Minify CSS
var minifyCSS = require('gulp-minify-css');

// CSS Auto-prefixing
var autoprefixer = require('gulp-autoprefixer');

// CSS Comb
var Comb = require('csscomb');
var comb = new Comb('zen');

// CSS Concatenation
var concatCss = require('gulp-concat-css');

// CSS Linting

// Let's comb our CSS and refactor based on our preferences defined in .csscomb.json
gulp.task('csscomb', function(){
  comb.processPath('www/build/css');
});

// Here we will concatenate any custom stylesheets into one file that will be minimized later
gulp.task('concatcss', function () {
  return gulp.src('www/build/css/custom/*.css')
    .pipe(concatCss("www/build/css/custom.css"))
    .pipe(gulp.dest(''));
});

gulp.task('minifyprefixcss', function () {
  // Minify and Autoprefix our styles
  gulp.src('www/build/css/*.css')
  .pipe(minifyCSS())
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
  .pipe(gulp.dest('www/build/css/'));
});
