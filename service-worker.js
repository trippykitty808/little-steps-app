const CACHE_VERSION = 'little-steps-v1';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './js/app.js',
  './js/state.js',
  './js/utils.js',
  './js/firebase-config.js',
  './js/firebase.js',
  './js/data/activities.js',
  './js/data/milestones.js',
  './js/data/guideResources.js',
  './js/screens/welcome.js',
  './js/screens/setupChild.js',
  './js/screens/setupCaregiver.js',
  './js/screens/setupFocus.js',
  './js/screens/home.js',
  './js/screens/activities.js',
  './js/screens/activityDetail.js',
  './js/screens/logActivity.js',
  './js/screens/progress.js',
  './js/screens/milestoneDetail.js',
  './js/screens/guide.js',
  './js/screens/profile.js',
  './js/screens/scrapbookMemories.js',
  './js/screens/scrapbookNotes.js',
  './js/screens/scrapbookMilestones.js',
  './js/screens/memoryNew.js',
  './js/screens/memoryDetail.js',
  './js/screens/printPreview.js',
  './js/tabBar.js',
  './js/childSwitcher.js',
  './js/authScreen.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/favicon-16.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(SHELL_FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only manage our own app-shell files. Everything else (Firebase, Google
  // fonts, Firestore/Storage calls) goes straight to the network untouched.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
