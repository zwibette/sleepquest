const CACHE_NAME = 'sleepquest-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Réception d'un message depuis la page
self.addEventListener('message', e => {
  if(!e.data || e.data.type !== 'SCHEDULE') return;
  const { delayMs, title, body, tag } = e.data;
  if(delayMs <= 0) return;

  setTimeout(() => {
    self.registration.showNotification(title, {
      body,
      icon: './icon-192.png',
      badge: './icon-192.png',
      vibrate: [200, 100, 200],
      tag: tag || ('sq-' + Date.now()),
      renotify: true,
      requireInteraction: false
    });
  }, delayMs);
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      if(list.length > 0) return list[0].focus();
      return clients.openWindow('./');
    })
  );
});
