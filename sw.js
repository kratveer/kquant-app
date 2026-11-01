// App shell + chart library are cached so the app opens offline.
// GitHub data is never cached here (the page keeps its own last-known copy).
const CACHE = "kquant-v21";
const SHELL = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];
const LIBS = ["https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js", "https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (LIBS.includes(url.href)) {
    // Pinned library version never changes: cache first.
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
    })));
    return;
  }
  if (url.origin !== location.origin) return;
  // Network first so updates you push show up; cache when offline.
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
