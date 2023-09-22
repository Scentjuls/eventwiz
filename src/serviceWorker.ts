/* eslint-disable no-restricted-globals */
const CACHE_NAME = "eventwiz";

//check that the path is right
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/App.tsx",
  "/App.css",
];

self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// self.addEventListener("activate", (event: any) => {
//   var cacheWhitelist = ["eventwiz"];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

export {};
