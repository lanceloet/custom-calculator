// Import serviceworker polyfill
importScripts('serviceworker-cache-polyfill.js');

// Cache these files
var cacheFiles = [
  '/',
  '/index.html',
  '/manifest.json',
  '/elements/custom-calculator/custom-calculator.html',
  '/elements/custom-calculator/custom-calculator-display.html',
  '/elements/custom-calculator/custom-calculator-drawer.html',
  '/elements/custom-calculator/custom-calculator-key.html',
  '/elements/custom-calculator/custom-calculator-keygrid.html',
  '/elements/custom-calculator/custom-calculator-keypad.html',
  '/elements/custom-calculator/custom-calculator-tab.html',
  '/elements/material-dropdown/material-dropdown.html',
  '/elements/material-dropdown/material-dropdown-item.html',
  '/elements/material-dropdown/material-dropdown-menu.html',
  '/elements/material-selection/material-selection.html',
  '/elements/mPULSE/mPULSE.html'
];

// Serviceworker install event
self.oninstall = function(event) {
  event.waitUntil(
    caches.open('calculator-cache-v1').then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
};

// Serviceworker activate event
self.onactivate = function(event) {
  // ...
};

// Serviceworker fetch event
self.onfetch = function(event) {
  event.respondWith(
    caches.match(event.request).catch(function() {
      return event.default();
    }).catch(function() {
      return caches.match('/index.html');
    })
  );
};