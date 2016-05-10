var gulp = require('gulp');

// Sitemap generator
var sm = require('sitemap')
    , fs = require('fs');

// Karma Server for our tests
var Server = require('karma').Server;

// Lists tasks set up for Gulp
var taskListing = require('gulp-task-listing');

// Watcher for file changes (development)
var gulpWatch = require('gulp-watch');

var del = require('del');
var runSequence = require('run-sequence');
var argv = process.argv;

// JS Concatenation
var concat = require('gulp-concat');

// Notifier
var notifier = require('node-notifier');
// Path to pull in icon for notifcations
var path = require('path');

// Load our modular gulp tasks from
var requireDir = require('require-dir');
var tasks = requireDir('./gulp-tasks');

// Protractor for gulp
var protractor = require("gulp-protractor").protractor;

// We want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */
var buildBrowserify = require('ionic-gulp-browserify-es2015');
var buildSass = require('ionic-gulp-sass-build');
var copyFonts = require('ionic-gulp-fonts-copy');
var copyScripts = require('ionic-gulp-scripts-copy');

gulp.task('watch', ['clean'], function(done){
  runSequence('sass', 'fonts', 'copyimages', 'scripts', 'jslint',
  'concatcss', 'minifyprefixcss', 'copycomponents', 'minifyhtml', 'service-worker',
    function(){

      gulpWatch('app/**/*.scss', function(){ gulp.start('sass', 'minifyprefixcss'); });
      gulpWatch('app/**/*.html', function(){ gulp.start('html', 'minifyhtml'); });

      buildBrowserify({ watch: true }).on('end', done);
    }
  );
});

gulp.task('build', ['clean'], function(done){
  return runSequence('sass', 'fonts', 'copyimages', 'scripts', 'jslint',
  'concatcss', 'minifyprefixcss', 'copycomponents', 'minifyhtml', 'generate-sitemap',
    function(){

      buildBrowserify().on('end', function(){

        // Notify me!
        notifier.notify({
          title: 'Scaffold',
          message: 'Build complete!',
          icon: path.join(__dirname, 'www/img/favicon.ico'), // Absolute path (doesn't work on balloons)
          sound: true, // Only Notification Center or Windows Toasters
          wait: true // Wait with callback, until user action is taken against notification
        }, function (err, response) {
          // Response is response from notification
        });
      });
    }
  );
});

// Production build
gulp.task('production', ['clean'], function(done){
  return runSequence('sass', 'fonts', 'copyimages', 'scripts', 'jslint',
  'concatcss', 'minifyprefixcss', 'copycomponents', 'minifyhtml', 'generate-sitemap', 'service-worker',
    function(){

      buildBrowserify().on('end', function(){

        // Notify me!
        notifier.notify({
          title: 'Scaffold',
          message: 'Production Build complete!',
          icon: path.join(__dirname, 'www/img/favicon.ico'), // Absolute path (doesn't work on balloons)
          sound: true, // Only Notification Center or Windows Toasters
          wait: true // Wait with callback, until user action is taken against notification
        }, function (err, response) {
          // Response is response from notification
        });
      });
    }
  );
});

gulp.task('sass', buildSass);
gulp.task('fonts', copyFonts);
gulp.task('scripts', copyScripts);
gulp.task('clean', function(){
  return del('www/build');
});

// Add a task to render the output
gulp.task('list', taskListing);

/**
 * Run test once and exit
 */
gulp.task('test:karma', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:protractor', function (done) {
  return gulp.src(["./tests/*.js"])
    .pipe(protractor({
        configFile: "protractor.config.js",
        args: ['--baseUrl', 'http://localhost:8101']
    }))
    .on('error', function(e) { });
});

gulp.task('default', ['build']);
