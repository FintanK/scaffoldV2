var gulp = require('gulp');
var htmlmin = require('gulp-html-minifier');
var copy = require('copy');


gulp.task('copyhtml', function (cb) {
  return copy.each(['index.html'], 'www', function(err, files) {
    
  });
});

gulp.task('minifyhtml', function() {
  return gulp.src('www/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('www'));
});
