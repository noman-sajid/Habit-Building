/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

// Precache build assets
precacheAndRoute(self.__WB_MANIFEST);

// Offline fallback for navigation requests
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages-cache',
    networkTimeoutSeconds: 3,
    plugins: [
      {
        handlerDidError: async () => {
          return caches.match('/offline.html');
        },
      },
    ],
  })
);

// Cache offline.html on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline-cache').then((cache) => {
      return cache.add('/offline.html');
    })
  );
});
