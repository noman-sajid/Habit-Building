/* eslint-disable no-restricted-globals */



self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install event fired.');
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate event fired.');
});

self.addEventListener('fetch', (event) => {
  // This service worker doesn't handle fetches, just passes them through.
  event.respondWith(fetch(event.request));
});