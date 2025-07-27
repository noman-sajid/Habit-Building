// offline/workbox-config.js
// Workbox configuration for caching
module.exports = {
  globDirectory: "build/",
  globPatterns: ["**/*.{html,js,css,svg,png}"],
  swDest: "build/service-worker.js",
  runtimeCaching: [
    {
      urlPattern: /\/api\/habits/,
      handler: "NetworkFirst",
      options: {
        cacheName: "habits-cache",
        expiration: { maxEntries: 50, maxAgeSeconds: 86400 }
      }
    }
  ]
};
