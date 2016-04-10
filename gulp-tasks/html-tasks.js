var gulp = require('gulp');
var htmlmin = require('gulp-html-minifier');
var copy = require('copy');


gulp.task('copyhtml', function (cb) {
  copy.each(['index.html'], 'www', function(err, files) {
    // exposes the vinyl `files` created when the files are copied
  });
});

gulp.task('minifyhtml', function() {
  gulp.src('www/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('www'));
});
