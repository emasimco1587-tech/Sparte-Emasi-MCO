// Service worker — cache l'app et les données pour un usage hors-ligne
const CACHE = 'planning-v54';
const ASSETS = [
  '.',
  'index.html',
  'planning-data.json',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'wallpapers/aqua.jpg',
  'wallpapers/sunset.jpg',
  'wallpapers/forest.jpg',
  'wallpapers/lavender.jpg',
  'wallpapers/mono.jpg',
  'wallpapers/aero-dark.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];
// fichiers optionnels : leur absence ne doit jamais empêcher l'installation du service worker
const OPTIONAL_ASSETS = ['firebase-config.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll(ASSETS).then(() =>
        Promise.all(OPTIONAL_ASSETS.map(u => c.add(u).catch(() => {})))
      )
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Les données + la config Firebase : réseau d'abord (pour récupérer une mise à jour), cache en secours.
  if (url.pathname.endsWith('planning-data.json') || url.pathname.endsWith('firebase-config.json')) {
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  // Le reste : cache d'abord, réseau en secours.
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => hit))
  );
});
