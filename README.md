# Scaffold JS 2.0 (Work in progress)

The web changes a lot in a year!

**Note:** Angular 2 is in Beta right now. Things can and probably will be refactored later.

Scaffold V2 is completely re-written from the ground up to use Angular 2 as well as harnessing Ionic 2.
The project aims to follow best practices in frontend web development with a component based approach, comprehensive testing (Unit and Behavioural) and the optimization of frontend assets through the proven techniques of concatentation. minification and compression.

There will be automated processes to ensure that your project's data is as contextual as possible both in the domain of semantic markup and data as well as platform integration out of the box. The web isn't just in the browser anymore.

Template configurations are also included to allow you to easily set up things like docker container and provision all of your necessary dependencies for build tools and deployments.

This project will be published as an NPM module and Yeoman generator to allow for modularity and reusability. The generator will contain options for customizing the architecture of your application.

# Ionic 2 http://ionicframework.com/docs/v2/

- Hybrid app development
- Updated design changes
- Simplicity using a component model
- Great choice of components
- No router required but still works with the router component from Angular,
- Lots of customizable components developed for cross platform compatibility,
- Completely modular styles.
- Native scrolling for hybrid apps,
- Material design
- Over 900 icons and much more!
- Ionic native plugins for access to the user's device and hardware. GPS, Bluetooth, Camera, NFC etc.
- Gulp, SASS (CSS Preprocessor), CommonJS and a new module loader out of the box. No longer using bower.
- Web animations API! https://w3c.github.io/web-animations/
- Ionic CLI


# Features

- Angular 2 https://angular.io ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- Ionic 2 hybrid app development. Package your web app easily for Android and IOS. ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- Gulp ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- Livereload http://livereload.com ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- Browserify http://browserify.org ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- SASS http://sass-lang.com/ ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- CSS Comb http://csscomb.com ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- CSS and JS Concatenation and Minification ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- Automatic CSS Vendor prefixing to support older browers ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- CSS and JS Lints ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- HTML minification for production builds if required. Squeeze every last Kb out of your app. ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- Docker configurations so you can spin up a container for this project easily (runDocker.sh script to automate the process)
- Karma Test Runner https://karma-runner.github.io/0.13/index.html
- Functional / Behavioural Tests
- Travis configurations to automate and test builds before deployment ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- Editorconfig for code styling http://editorconfig.org/ ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- Auto generated cache manifest file (**Note** This has now been replaced by an offline service worker for providing an offline experience first. This is now better web practice as cache manifest files can be tricky to manage for different sites http://alistapart.com/article/application-cache-is-a-douchebag) ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- Further compression of assets using express in gzip format
- Development and production builds with a watcher to kick off builds when changes are made in development
- Native notification when builds are completed. ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- Builds run against pagespeed for feedback on app performance ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- Favicons, IOS splash / homescreen icons, Android icons and Windows 8 Tile Icons auto-generated.
- Manifest.json generated automatically.
- Protractor for testing ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- Karma and Jasmine ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)
- Build jobs to allow you to test on different devices in the cloud.
- Heroku deployments configuration
- Phonegap build task.
- Gulp task listing (just type 'gulp list') ![](http://www.industrysalestax.com/images/green_checkmark_small.gif)

# What I'm excited about
- Angular 2! Improved and intuitive templating with better code completion in your IDE.
- Ionic 2! Build apps for Android and IOS with web technologies.
- Ionic Native! Only add the components you need.
- Docker! Spin up a container quickly. Use for development or quick deployments.
- Phonegap build! Take the hassle out of packaging your app for the Google Play and/or the IOS app store.
- Builds using Travis! Automate builds and tests for every change ensuring code quality into the future.
- Heroku deployments! Deploy to production easily as part of your pipeline.
- Web Components!
- Shadow DOM!
- HTML Imports!
- ES6!

# Directory structure

    .
    +-- app
    +-- gulp-tasks
    |   +-- css-tasks.js
    |   +-- html-tasks.js
    |   +-- img-tasks.js
    |   +-- js-tasks.js
    |   +-- performance-tasks.js
    +-- hooks
    +-- platforms
    +-- plugins
    +-- resources
    +-- tests
    +-- www
    +-- .csscomb.json
    +-- .csslintrc
    +-- .editorconfig
    +-- .gitattributes
    +-- .gitignore
    +-- .npmignore
    +-- .travis.yml
    +-- config.xml
    +-- gulpfile.js
    +-- index.html
    +-- ionic.config.json
    +-- karma.conf.js
    +-- package.json
    +-- protractor.config.js
    +-- README.md

# Installation

> npm install -g protractor

# Command Line

> coming soon

# Protractor Tests

Install Protractor globally on your system

> npm install -g protractor

The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:

> webdriver-manager update

And start the selenium server with..

> webdriver-manager start

Ensure the Selenium server is running and the below command should execute the protractor specs.

> gulp test:protractor

# Karma Tests

Install Karma globally on your system

> npm install -g karma

You can then run your tests with

> gulp test:karma



# License

This source code has a MIT License.

# Further potential and reading Material
https://developer.lge.com/webOSTV/develop/web-app/getting-started/building-your-first-web-app-webos-tv/
https://developer.mozilla.org/en-US/Marketplace/Options/Packaged_apps
https://developer.chrome.com/apps/about_apps
http://yeoman.io/authoring/
http://code.tutsplus.com/tutorials/build-your-own-yeoman-generator--cms-20040
http://lab.ionic.io/
http://www.gajotres.net/ionic-2-tutorial-lets-create-our-first-application/
http://ionic.io/products/creator
https://angular.github.io/protractor/#/


![](https://8604d17a51d354cba084d27f632b78fe46e70205.googledrive.com/host/0Bws_6WaNR1DWelh6X1hLcTlBR1E/ANGULAR%202.png)
![](http://ionicframework.com/img/ionic-logo-blue.svg)
![](https://raw.githubusercontent.com/micromata/generator-bootstrap-kickstart/master/yeoman.png)
![](https://www.npmjs.com/static/images/npm-logo.svg)
