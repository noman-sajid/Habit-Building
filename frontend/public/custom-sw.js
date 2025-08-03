/* eslint-disable no-restricted-globals */

// A minimal service worker to test registration.
console.log('[ServiceWorker] Hello from the minimal service worker!');

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