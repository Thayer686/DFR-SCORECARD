const CACHE_NAME = 'field-report-v7.3'; // 🔁 bump this for every update

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
  'assets/icons/icon-512.png'
];

// ✅ Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// ✅ Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// ✅ Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// 🔁 Listen for skipWaiting trigger from client
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
