const CACHE_NAME = "busan2026-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./sw.js",

  // icons
  "./icons/icon-192.png",
  "./icons/icon-512.png",

  // images (照你實際檔名增減)
  "./images/overview.jpg",
  "./images/day01-cover.jpg",
  "./images/day02-cover.jpg",
  "./images/day03-cover.jpg",
  "./images/day04-cover.jpg",
  "./images/day05-cover.jpg",
  "./images/day06-cover.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k))))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
