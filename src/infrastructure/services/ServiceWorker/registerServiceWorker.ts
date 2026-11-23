const SERVICE_WORKER_URL = "/sw.js";

/**
 * Registers the asset cache service worker in production, and removes any worker left
 * over from an earlier build or from a local production build in every other mode.
 */
export function registerServiceWorker(): void {
  if (!("serviceWorker" in navigator)) return;

  if (!import.meta.env.PROD) {
    void unregisterServiceWorkers();
    return;
  }

  if (document.readyState === "complete") {
    register();
    return;
  }

  // Registering after load keeps the worker from competing with critical page resources.
  window.addEventListener("load", register, { once: true });
}

function register(): void {
  navigator.serviceWorker
    .register(SERVICE_WORKER_URL, {
      scope: "/",
      // Revalidate sw.js itself so a new worker is picked up on the next visit.
      updateViaCache: "none",
    })
    .catch((error) => {
      console.error("Service worker registration failed:", error);
    });
}

async function unregisterServiceWorkers(): Promise<void> {
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
  } catch (error) {
    console.warn("Failed to unregister service workers:", error);
  }
}
