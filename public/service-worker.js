import { clientsClaim } from "workbox-core";
import { setCacheNameDetails } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";

clientsClaim();
self.skipWaiting();

setCacheNameDetails({
  prefix: "movies-pwa-cache",
});

precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(({ url }) => url.pathname === "/", new NetworkFirst());
registerRoute(({ url }) => url.pathname === "/favorites", new NetworkFirst());

/* 
self.addEventListener("install", (event) => {
  console.log("[SW] Install event");
  event.waitUntil(
    caches
      .open("movies-pwa-cache")
      .then((cache) =>
        cache.addAll(["/", "/icons/f-192.png", "/manifest.json"])
      )
  );
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activate event");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request);
    })
  );
});
*/
// =================================================================

self.addEventListener("push", (event) => {
  console.log("[SW] Push event");
  const data = event.data?.json() || {};
  const title = data.title || "Nowa informacja!";
  const options = {
    body: data.body || "Otrzymałeś wiadomość.",
    icon: "/icons/f-192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
