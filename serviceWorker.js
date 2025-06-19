// Nombre del caché
const CACHE_NAME = 'asistencia-cache-v1';

// Archivos a almacenar para que funcionen sin conexión
const urlsToCache = [
  'index.html',
  'style.css',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'maestro/maestro.html',
  'alumno/alumno.html'
];

// Instalación del Service Worker
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache); // Agrega los archivos al caché
      })
  );
});

// Activación del Service Worker (limpiar versiones anteriores)
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Elimina cachés viejos
          }
        })
      );
    })
  );
});

// Interceptar las petici

