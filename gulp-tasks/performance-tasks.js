var gulp = require('gulp');

// Pagespeed module
var psi = require('psi');


gulp.task('service-worker', function(){
  // Generate our service worker for the build
  gulp.src(['www/'])
  .pipe(gulpServiceWorker({
    rootDir: 'www/build/js',
  }));
});


gulp.task('pagespeed:mobile', function(){
  psi.output('http://yourwebsite.com', {nokey: 'true', strategy: 'mobile'}).then(function() {
    console.log('Finished mobile pagespeed strategy');
  });
});

gulp.task('pagespeed:desktop', function(){
  psi.output('http://yourwebsite.com', {nokey: 'true', strategy: 'desktop'}).then(function() {
    console.log('Finished desktop pagespeed strategy');
  });
});
