import { Children, isValidElement, ReactNode } from "react";

import { Link } from "react-router";

import { MENU_ITEMS_MOCK } from "@components/Layout/SideBar/helper/mock/menuMockData";
import { menuKeyToRouteMap } from "@infra/helpers/routeConvertor";
import type { BreadcrumbItems } from "@infra/models/general.model";

type RouteEntry = {
  label: string;
  route: string;
};

const normalizeLabel = (value: string) =>
  value.replace(/[\s\u200c\u200e\u200f\-_،,:/]+/g, "").toLocaleLowerCase("fa");

const routeEntries: RouteEntry[] = MENU_ITEMS_MOCK.flatMap((section) => {
  const childEntries = section.children.flatMap((item) => {
    const route = menuKeyToRouteMap[item.key as keyof typeof menuKeyToRouteMap];

    return route ? [{ label: item.label, route }] : [];
  });
  const sectionRoute = childEntries[0]?.route;

  return sectionRoute
    ? [{ label: section.label, route: sectionRoute }, ...childEntries]
    : childEntries;
});

const exactRouteByLabel = new Map<string, string>();
routeEntries.forEach(({ label, route }) => {
  const normalizedLabel = normalizeLabel(label);
  if (!exactRouteByLabel.has(normalizedLabel)) {
    exactRouteByLabel.set(normalizedLabel, route);
  }
});

const getNodeText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join(" ");
  if (!isValidElement<{ children?: ReactNode }>(node)) return "";

  return getNodeText(node.props.children);
};

const hasNavigation = (node: ReactNode): boolean => {
  if (!isValidElement<{ children?: ReactNode; href?: unknown; to?: unknown }>(node)) {
    return false;
  }
  if (node.props.href || node.props.to) return true;

  return Children.toArray(node.props.children).some(hasNavigation);
};

const commonPathScore = (left: string, right: string) => {
  const leftParts = left.split(/[-/]/).filter(Boolean);
  const rightParts = new Set(right.split(/[-/]/).filter(Boolean));

  return leftParts.reduce((score, part) => score + (rightParts.has(part) ? 1 : 0), 0);
};

export const resolveNavigationRoute = (title: ReactNode, currentPath: string) => {
  const normalizedTitle = normalizeLabel(getNodeText(title));
  const exactRoute = exactRouteByLabel.get(normalizedTitle);
  if (exactRoute) return exactRoute;

  const fuzzyRoute = routeEntries.find(({ label }) => {
    const candidate = normalizeLabel(label);
    return candidate.includes(normalizedTitle) || normalizedTitle.includes(candidate);
  })?.route;
  if (fuzzyRoute) return fuzzyRoute;

  return routeEntries.reduce<{ route: string; score: number } | undefined>(
    (best, entry) => {
      if (entry.route === currentPath) return best;
      const score = commonPathScore(entry.route, currentPath);
      return !best || score > best.score ? { route: entry.route, score } : best;
    },
    undefined
  )?.route;
};

export const linkBreadcrumbItems = (
  items: BreadcrumbItems,
  currentPath = globalThis.location?.pathname ?? "/"
): BreadcrumbItems => {
  if (!items) return items;

  return items.map((item, index) => {
    if (!("title" in item) || index === items.length - 1 || item.href) return item;
    if (hasNavigation(item.title)) return item;

    const route = resolveNavigationRoute(item.title, currentPath);
    if (!route || route === currentPath) return item;

    return {
      ...item,
      title: <Link to={route}>{item.title}</Link>,
    };
  });
};
