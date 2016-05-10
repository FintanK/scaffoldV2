var gulp = require('gulp');

var sm = require('sitemap')
    , fs = require('fs');

gulp.task('generate-sitemap', function(){
  var sitemap = sm.createSitemap({
      hostname: 'http://www.mywebsite.com',
      cacheTime: 600000,
      urls: [
          { url: '/' , changefreq: 'weekly', priority: 0.8, lastmodrealtime: true, lastmodfile: 'www/index.html' }
      ]
  });

  fs.writeFileSync("www/build/sitemap.xml", sitemap.toString());
});
