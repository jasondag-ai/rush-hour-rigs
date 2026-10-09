// Unregister this service worker and clear its caches so the old site
// does not keep serving stale content after the rename.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', async () => {
  const names = await caches.keys();
  await Promise.all(names.map((n) => caches.delete(n)));
  const clients = await self.clients.matchAll({ type: 'window' });
  await self.registration.unregister();
  clients.forEach((c) => c.navigate(c.url));
});
