// BE-Alert Monitor — Service Worker
// Minimal SW: enables PWA installability ("Add to Home Screen").
// All polling happens in the foreground app tab (more reliable than
// Periodic Background Sync, which is throttled and Chrome-only).

const CACHE = 'bealert-v1';
const ASSETS = ['/', '/index.html', '/manifest.json', '/sw.js'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Cache-first for app shell, network-first for the BE-Alert feed
  if (e.request.url.includes('publicalerts.be') || e.request.url.includes('allorigins.win')) {
    // Always go to network for feed data
    e.respondWith(fetch(e.request).catch(() => new Response('[]', { headers: { 'Content-Type': 'application/json' } })));
  } else {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request))
    );
  }
});
