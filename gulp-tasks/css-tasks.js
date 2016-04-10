var gulp = require('gulp');

// CSS Comb
var Comb = require('csscomb');
var comb = new Comb('zen');

gulp.task('csscomb', function(){
  comb.processPath('www/build/css');
});
