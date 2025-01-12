self.addEventListener("install", (event) => {
  console.log("[SW] Install event");
  event.waitUntil(
    caches.open("movies-pwa-cache").then((cache) =>
      cache.addAll([
        "/", // Strona główna
        "/f-192.png",
        "/manifest.json",
        // ... możesz dodać tu więcej plików statycznych do cache
      ])
    )
  );
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activate event");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Uproszczona strategia: najpierw cache, potem sieć
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response; // Mamy w cache
      return fetch(event.request); // W innym przypadku – sieć
    })
  );
});

// Obsługa zdarzenia push (Push Notifications)
self.addEventListener("push", (event) => {
  console.log("[SW] Push event");
  const data = event.data?.json() || {};
  const title = data.title || "Nowa informacja!";
  const options = {
    body: data.body || "Otrzymałeś wiadomość.",
    icon: "/f-192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
