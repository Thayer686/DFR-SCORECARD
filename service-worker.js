const CACHE_NAME = 'field-report-v1.0.0'; // 🔁 bump this for every update

const urlsToCache = [
  './',
  'index.html',
  'index.css',
  'index.js',
  'manifest.json',
  'service-worker.js',

  // DFR app
  'dfr/dfr.html',
  'dfr/dfr.css',
  'dfr/dfr.js',

  // TM app
  'tm/tm.html',
  'tm/tm.css',
  'tm/tm.js',

  // Shared data
  'data/activityMap.json',
  'data/digNumberMap.json',
  'data/listData.json',
  'data/unitIdMap.json',

  // All assets
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/desktop.ini',
  'assets/icons/desktop.ini',
  'assets/images/OMH Logo.png'
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

// ✅ Fetch event with offline fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return new Response("Offline – resource not cached", { status: 503 });
      });
    })
  );
});


// 🔁 Listen for skipWaiting trigger from client
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log("🧹 Installing SW:", CACHE_NAME);

