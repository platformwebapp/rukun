const CACHE_NAME = 'rukun-enterprise-v1';
const ASSETS_TO_CACHE = [
  './',
  './id.html',
  './manifest.json',
  'https://ik.imagekit.io/logojkdiy/RUKUN.png?updatedAt=1782969744181',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap'
];

// Tahap Install: Membuat cache lokal untuk aset utama
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Tahap Aktivasi: Membersihkan cache versi lama jika ada pembaruan
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Tahap Fetch: Memanggil aset pembuka secara instan dari cache
self.addEventListener('fetch', (event) => {
  // Karena konten inti ada di dalam Google Apps Script (Iframe), 
  // kita hanya mengoptimalkan kecepatan loading shell luar/splash screen.
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
