// src/infrastructure/hooks/useMatomo.ts
import { useEffect } from "react";

export const useMatomo = () => {
  useEffect(() => {
    if (import.meta.env.MODE !== "production") return;

    const matomoUrl = import.meta.env.VITE_MATOMO_URL;
    const siteId = import.meta.env.VITE_MATOMO_SITE_ID;

    if (!matomoUrl || !siteId) return;

    // Avoid injecting script multiple times
    if (document.getElementById("matomo-script")) return;

    const script = document.createElement("script");
    script.id = "matomo-script";
    script.src = `${matomoUrl}/matomo.js`;
    script.async = true;
    document.head.appendChild(script);

    // Setup Matomo config
    window._paq = window._paq || [];
    window._paq.push(["trackPageView"]);
    window._paq.push(["enableLinkTracking"]);
    window._paq.push(["setTrackerUrl", `${matomoUrl}/matomo.php`]);
    window._paq.push(["setSiteId", siteId]);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
};
