/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */


(function (self) {
  'use strict';

  // On install, cache resources and skip waiting so the worker won't
  // wait for clients to be closed before becoming active.
  self.addEventListener('install', event =>
    event.waitUntil(
      oghliner.cacheResources()
      .then(() => self.skipWaiting())
    )
  );

  // On activation, delete old caches and start controlling the clients
  // without waiting for them to reload.
  self.addEventListener('activate', event =>
    event.waitUntil(
      oghliner.clearOtherCaches()
      .then(() => self.clients.claim())
    )
  );

  // Retrieves the request following oghliner strategy.
  self.addEventListener('fetch', event => {
    if (event.request.method === 'GET') {
      event.respondWith(oghliner.get(event.request));
    } else {
      event.respondWith(self.fetch(event.request));
    }
  });

  var oghliner = self.oghliner = {

    // This is the unique prefix for all the caches controlled by this worker.
    CACHE_PREFIX: 'offline-cache:FintanK/scaffoldV2:' + (self.registration ? self.registration.scope : '') + ':',

    // This is the unique name for the cache controlled by this version of the worker.
    get CACHE_NAME() {
      return this.CACHE_PREFIX + 'cd4f122e75ab6a97478eb364e11094c49c9778c1';
    },

    // This is a list of resources that will be cached.
    RESOURCES: [
      'www/index.html', // d8844c6849234596f3fdd80796b033a92421eca3
      'www/build/app.js', // 2e881f6bff22b0ea0f63c40db89c56f92b302300
      'www/build/css/app.ios.css', // 416142053e0c9d14469870082bdbeafd93a3eefe
      'www/build/css/app.md.css', // cf3a39f195eece3cfd8727ea78989b635b98040f
      'www/build/css/app.wp.css', // ed69a7f8e4e8d84ca8229ecd26a6694b2a82f1ca
      'www/build/fonts/ionicons.ttf', // 0f7956704fe61b49c41ea1a22051240f700a2b44
      'www/build/fonts/ionicons.woff', // d2871a964adb8027f9b765c3a53f95d1392f2b3f
      'www/build/fonts/ionicons.woff2', // 780a4983b914f7df1b27d7a3f150b3dce27addaa
      'www/build/fonts/noto-sans-bold.ttf', // 563bd982ccf5b05c6234c40a5758dda2f19160fb
      'www/build/fonts/noto-sans-regular.ttf', // 830953c678e6a50697108a9c87d229cef130975a
      'www/build/fonts/roboto-bold.ttf', // c93cb6eb6a75a7f4312fd2bafe5bab7fbadf12d9
      'www/build/fonts/roboto-bold.woff', // 622799489e97e418c8967cbf1e011dce834e14fa
      'www/build/fonts/roboto-light.ttf', // f23a0413fdd70117752cf73679d2c5867095eaac
      'www/build/fonts/roboto-light.woff', // 987731626feefc140cf17fff41bd3213312d6f99
      'www/build/fonts/roboto-medium.ttf', // 620481374c705f0e6e387d281e66a2b250611445
      'www/build/fonts/roboto-medium.woff', // 3087b20015925170e65cf2b6c1fdbf0cd4ec3b3b
      'www/build/fonts/roboto-regular.ttf', // 89e7bf27190d62c7b508dc92c7012c1180458f4e
      'www/build/fonts/roboto-regular.woff', // 4932a1b55bd4f3a3dcc95db33ec07ba729e86c61
      'www/build/img/build.png', // fdfa8bb68ad638dc0e4722641b6b877b50cd04aa
      'www/build/img/debut_dark.png', // 1aa9049d8993657c38d32ec5340b71430d98f48e
      'www/build/img/favicon.ico', // e49cfff254d4520be27b47c49c22d410285b4141
      'www/build/img/logo.png', // 5656d1a02220e81761374aca174c6412f865700d
      'www/build/img/ticks.png', // 869838d6e318562e4d2a3356fd5b229e3f2076d9
      './angular2-polyfills.js', // be771bd0a4170c04abff753212def2a2376a408e
      './es6-shim.min.js', // e1af5353a8df0f581629bb10bb32f2c52b366afb
      'www/build/theme/app.core.scss', // 6db00a75e9ffb8546d8cf5747ba78aa20b7d132f
      'www/build/theme/app.ios.scss', // 62398b752f89df7da65524b075e7adcf70c9b908
      'www/build/theme/app.md.scss', // 1624243b9f4e8d5ea9713c04baba5a2e0908ce12
      'www/build/theme/app.variables.scss', // 2778d38aec72ce15c982f4c86fee39673ea5762c
      'www/build/theme/app.wp.scss', // 38e2e965b09bdf474e119a010c68fc1a63c54e2e
      'www/build/pages/docs/docs.html', // da39a3ee5e6b4b0d3255bfef95601890afd80709
      'www/build/pages/docs/docs.js', // 6d99b5e58ccc728b0b9d5057b2dad69b283d2ca6
      'www/build/pages/docs/docs.scss', // da39a3ee5e6b4b0d3255bfef95601890afd80709
      'www/build/pages/home/home.html', // 585b2a363e2e5f94b4c11a6142a44a0c14ff8f43
      'www/build/pages/home/home.js', // 15c0aaa302d757939f35061f689b51beaf410851
      'www/build/pages/home/home.scss', // 57948ea263a46ea392baa584c67bb77372cf20d6
      'www/build/theme/custom/custom.scss', // fc28857652ef5198a80652bda0c8f737547adc41

    ],

    // Adds the resources to the cache controlled by this worker.
    cacheResources: function () {
      var now = Date.now();
      var baseUrl = self.location;
      return this.prepareCache()
      .then(cache => Promise.all(this.RESOURCES.map(resource => {
        // Bust the request to get a fresh response
        var url = new URL(resource, baseUrl);
        var bustParameter = (url.search ? '&' : '') + '__bust=' + now;
        var bustedUrl = new URL(url.toString());
        bustedUrl.search += bustParameter;

        // But cache the response for the original request
        var requestConfig = { credentials: 'same-origin' };
        var originalRequest = new Request(url.toString(), requestConfig);
        var bustedRequest = new Request(bustedUrl.toString(), requestConfig);
        return fetch(bustedRequest)
        .then(response => {
          if (response.ok) {
            return cache.put(originalRequest, response);
          }
          console.error('Error fetching ' + url + ', status was ' + response.status);
        });
      })));
    },

    // Remove the offline caches not controlled by this worker.
    clearOtherCaches: function () {
      var outOfDate = cacheName => cacheName.startsWith(this.CACHE_PREFIX) && cacheName !== this.CACHE_NAME;

      return self.caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames
        .filter(outOfDate)
        .map(cacheName => self.caches.delete(cacheName))
      ));
    },

    // Get a response from the current offline cache or from the network.
    get: function (request) {
      return this.openCache()
      .then(cache => cache.match(() => this.extendToIndex(request)))
      .then(response => {
        if (response) {
          return response;
        }
        return self.fetch(request);
      });
    },

    // Make requests to directories become requests to index.html
    extendToIndex: function (request) {
      var url = new URL(request.url, self.location);
      var path = url.pathname;
      if (path[path.length - 1] !== '/') {
        return request;
      }
      url.pathname += 'index.html';
      return new Request(url.toString(), request);
    },

    // Prepare the cache for installation, deleting it before if it already exists.
    prepareCache: function () {
      return self.caches.delete(this.CACHE_NAME)
      .then(() => this.openCache());
    },

    // Open and cache the offline cache promise to improve the performance when
    // serving from the offline-cache.
    openCache: function () {
      if (!this._cache) {
        this._cache = self.caches.open(this.CACHE_NAME);
      }
      return this._cache;
    }

  };
}(self));
