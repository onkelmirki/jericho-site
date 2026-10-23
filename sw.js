// PROJECT: jericho
// Web-Version abgeschaltet (2026-10-18, Auftrag Mirko): Dieser Service Worker ersetzt den alten.
// Er löscht alle Zwischenspeicher, meldet sich selbst ab und lädt offene Fenster neu,
// damit die Hinweisseite statt der alten, zwischengespeicherten App erscheint.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil((async function () {
    try {
      var keys = await caches.keys();
      await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    } catch (e) {}
    try { await self.registration.unregister(); } catch (e) {}
    try {
      var list = await self.clients.matchAll({ type: 'window' });
      list.forEach(function (c) { try { c.navigate(c.url); } catch (e) {} });
    } catch (e) {}
  })());
});
