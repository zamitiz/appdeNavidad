
const CACHE_NAME = 'xmas-cache-v7';
const ASSETS_TO_CACHE = [
  './index.html',
  './hat.png',
  './manifest.json',
  './privacy.html',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Intentamos cachear cada recurso individualmente para que uno fallido no rompa todo el proceso
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(asset => cache.add(asset))
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Estrategia: Network first para navegación, Cache first para recursos estáticos
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Si falla la red y no está en caché, no devolvemos nada (o podrías devolver un placeholder)
        return null;
      });
    })
  );
});
