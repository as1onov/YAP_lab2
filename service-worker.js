// service-worker.js

const CACHE_NAME = "password-manager-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/password-manager.js"
];

// Install the service worker and cache static files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching files during installation...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Removing old cache: ", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Intercept fetch requests and serve cached responses if available
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
