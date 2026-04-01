const CACHE_NAME = 'dompetku-cache-v1';

// Install event - langsung aktif
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event - bersihkan cache lama jika ada
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Fetch event - Syarat utama PWA Android
self.addEventListener('fetch', (event) => {
  // Hanya intercept request untuk navigasi/halaman HTML
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Jika offline, tetap kembalikan halaman index
        return caches.match('/');
      })
    );
  }
});
