import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router";

import { resolveNavigationRoute } from "@infra/helpers/BreadcrumbHelpers/linkBreadcrumbItems";
import { isMockMode } from "@infra/mock/mockMode";

const PLACEHOLDER_LINKS = new Set(["", "#", "-"]);

export const useMockLinkRepair = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMockMode()) return;

    const repairPlaceholderLink = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const rawHref = link.getAttribute("href")?.trim() ?? "";
      const hrefPath = rawHref.split(/[?#]/)[0];
      const isPlaceholder =
        PLACEHOLDER_LINKS.has(rawHref) ||
        (hrefPath === location.pathname && !rawHref.includes("?"));

      if (!isPlaceholder) return;

      const destination = resolveNavigationRoute(link.textContent, location.pathname);
      if (!destination || destination === location.pathname) return;

      event.preventDefault();
      navigate(destination);
    };

    document.addEventListener("click", repairPlaceholderLink);
    return () => document.removeEventListener("click", repairPlaceholderLink);
  }, [location.pathname, navigate]);
};
