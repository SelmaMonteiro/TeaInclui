// Bump de versão para invalidar cache antigo e garantir novos assets (app.js/css)
const CACHE_NAME = 'tea-pages-v2';
const PRECACHE = [
  './',
  './index.html',
  './cards.html',
  './recursos.html',
  './feedback.html',
  './assets/css/styles.css',
  './assets/js/app.js',
  './favicon.svg',
  './icons/app-icon.svg',
  './icons/maskable.svg',
  './offline.html',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)).then(self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null))).then(self.clients.claim())
  );
});

// Cache-first para navegação e assets
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Navegação: offline fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('./offline.html'))
    );
    return;
  }

  // Assets: cache first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(req, copy));
        return res;
      });
    })
  );
});