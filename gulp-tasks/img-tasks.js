var gulp = require('gulp');


gulp.task('copyimages', function(){
    return gulp.src(['app/img/**/*']).pipe(gulp.dest('www/build/img'));
});
