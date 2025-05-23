const CACHE_NAME = 'field-report-v1'; // 🔁 bump this for every update

const urlsToCache = [

  'index.html',
  'index.css',
  'index.js',
  'manifest.json',
  'dfr/dfr.js',
  'dfr/dfr.css',
  'dfr/dfr.html',
  'dfr/dfr.js.map',
  'tm/tm.js',
  'tm/tm.css',
  'tm/tm.html',
  'tm/tm.js.map',
  'tm/tm.html.map',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  // add other assets
];

// Install event – Cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // ⏩ activates this version immediately
});

// Activate event – Clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
  self.clients.claim(); // 📢 claim control of all clients immediately
});

// Fetch event – Respond from cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
