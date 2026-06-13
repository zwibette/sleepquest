self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

// Afficher une notification immédiatement (appelé depuis la page)
self.addEventListener('message', e => {
  if(!e.data || e.data.type !== 'SHOW_NOW') return;
  const { title, body } = e.data;
  self.registration.showNotification(title, {
    body,
    icon: './icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'sq-' + Date.now(),
    renotify: true
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type:'window' }).then(list => {
      if(list.length > 0) return list[0].focus();
      return clients.openWindow('./');
    })
  );
});
