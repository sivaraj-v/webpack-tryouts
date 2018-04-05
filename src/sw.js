workbox.skipWaiting();
workbox.clientsClaim();
// workbox.routing.registerRoute(
//   /(.*)articles(.*)\.(?:png|gif|jpg)/, //  /(.*)articles(.*)\.(?:png|gif|jpg)/,
//   workbox.strategies.cacheFirst({
//     cacheName: 'images-cache',
//     cacheExpiration: {
//       maxEntries: 50,
//       maxAgeSeconds: 30 * 24 * 60 * 60,
//     },
//     cacheableResponse: {
//       statuses: [0, 200]
//     }
//   })
// );
// workbox.router.registerRoute('https://fonts.googleapis.com/(.*)',
//   workbox.strategies.cacheFirst({
//     cacheName: 'googleapis',
//     cacheExpiration: {
//       maxEntries: 50,
//       maxAgeSeconds: 30 * 24 * 60 * 60,
//     },
//     cacheableResponse: {
//       statuses: [0, 200]
//     },
//     networkTimeoutSeconds: 4
//   })
// );
self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox';
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
workbox.googleAnalytics.initialize();
workbox.precaching.precacheAndRoute(self.__precacheManifest);