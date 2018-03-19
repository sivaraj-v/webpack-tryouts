importScripts("precache-manifest.baeee9e02974bda7b849911f49baf432.js", "https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();


self.addEventListener('push', (event) => {
    const title = 'Get Started With Workbox';
    const options = {
        body: event.data.text()
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

const title = 'Push Codelab';
const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
};
self.registration.showNotification(title, options);


workbox.precaching.precacheAndRoute(self.__precacheManifest);
