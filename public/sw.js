/**
 * Minimal asset cache service worker (no Workbox).
 *
 * Only same origin static assets are cached:
 * - `/assets/**` is content hashed build output, so it is served cache first.
 * - `/images/**`, `/fonts/**`, `/audio/**` and root icons keep stable names, so they are
 *   served stale while revalidate to pick up replacements without a version bump.
 *
 * HTML documents and API responses are never cached: the app shell must stay on the
 * network so deploys and authentication redirects always reflect the current session.
 *
 * Bump CACHE_VERSION when the logic below changes; unknown caches are dropped on activate.
 */

const CACHE_VERSION = "v1";
const IMMUTABLE_CACHE = `immutable-assets-${CACHE_VERSION}`;
const STATIC_CACHE = `static-assets-${CACHE_VERSION}`;
const OWNED_CACHES = [IMMUTABLE_CACHE, STATIC_CACHE];

const MAX_IMMUTABLE_ENTRIES = 300;
const MAX_STATIC_ENTRIES = 150;

const STATIC_DIRECTORIES = ["/images/", "/fonts/", "/audio/"];
const STATIC_EXTENSIONS = [
  ".woff2",
  ".woff",
  ".ttf",
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".gif",
  ".ico",
  ".mp3",
];

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Also removes caches left behind by the previous Workbox setup.
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => !OWNED_CACHES.includes(name))
          .map((name) => caches.delete(name))
      );

      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  // Range requests are answered with 206 responses, which cannot be reused from a cache.
  if (request.headers.has("range")) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === "navigate" || request.destination === "document") return;

  if (url.pathname.startsWith("/assets/")) {
    event.respondWith(cacheFirst(event, IMMUTABLE_CACHE, MAX_IMMUTABLE_ENTRIES));
    return;
  }

  if (isStaticAsset(url.pathname)) {
    event.respondWith(staleWhileRevalidate(event, STATIC_CACHE, MAX_STATIC_ENTRIES));
  }
});

function isStaticAsset(pathname) {
  const lowerCasePath = pathname.toLowerCase();

  return (
    STATIC_DIRECTORIES.some((directory) => lowerCasePath.startsWith(directory)) ||
    STATIC_EXTENSIONS.some((extension) => lowerCasePath.endsWith(extension))
  );
}

async function cacheFirst(event, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(event.request);
  if (cached) return cached;

  const response = await fetch(event.request);
  if (isCacheable(response)) {
    event.waitUntil(put(cache, event.request, response.clone(), maxEntries));
  }

  return response;
}

async function staleWhileRevalidate(event, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(event.request);

  const revalidation = fetch(event.request).then(async (response) => {
    if (isCacheable(response)) {
      await put(cache, event.request, response.clone(), maxEntries);
    }
    return response;
  });

  if (cached) {
    // Offline or failing revalidation must not reject while a cached copy is served.
    event.waitUntil(revalidation.catch(() => undefined));
    return cached;
  }

  return revalidation;
}

function isCacheable(response) {
  if (!response || response.status !== 200 || response.type === "opaque") {
    return false;
  }

  // Nginx serves index.html for unknown paths, so a missing asset resolves to HTML.
  const contentType = response.headers.get("content-type") ?? "";
  return !contentType.includes("text/html");
}

async function put(cache, request, response, maxEntries) {
  await cache.put(request, response);

  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;

  // cache.keys() preserves insertion order, so the oldest entries come first.
  await Promise.all(
    keys.slice(0, keys.length - maxEntries).map((key) => cache.delete(key))
  );
}
