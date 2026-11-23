import * as Sentry from "@sentry/react";

export const measurePageLoad = (pageName: string) => {
  if (window.performance) {
    const navigationEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    const paintEntries = performance.getEntriesByType("paint");

    const metrics = {
      pageLoadTime: navigationEntry.loadEventEnd - navigationEntry.startTime,
      domInteractive: navigationEntry.domInteractive - navigationEntry.startTime,
      firstPaint: paintEntries.find((entry) => entry.name === "first-paint")?.startTime,
      firstContentfulPaint: paintEntries.find(
        (entry) => entry.name === "first-contentful-paint"
      )?.startTime,
    };

    // Report to Sentry
    Sentry.addBreadcrumb({
      category: "performance",
      message: `Page Load Metrics for ${pageName}`,
      data: metrics,
      level: "info",
    });

    // Log in development
    if (import.meta.env.DEV) {
      console.error(`Performance metrics for ${pageName}:`, metrics);
    }

    return metrics;
  }
};

export const measureComponentRender = (componentName: string, startTime: number) => {
  const endTime = performance.now();
  const renderTime = endTime - startTime;

  if (renderTime > 100) {
    // Alert for slow renders
    Sentry.addBreadcrumb({
      category: "performance",
      message: `Slow render detected in ${componentName}`,
      data: { renderTime },
      level: "warning",
    });
  }

  return renderTime;
};

// LCP Observer
export const observeLCP = () => {
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];

    Sentry.addBreadcrumb({
      category: "performance",
      message: "Largest Contentful Paint",
      data: { lcpTime: lastEntry.startTime },
      level: "info",
    });
  }).observe({ entryTypes: ["largest-contentful-paint"] });
};

// CLS Observer
export const observeCLS = () => {
  let clsValue = 0;

  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const layoutShiftEntry = entry as PerformanceEntry & {
        value: number;
        hadRecentInput: boolean;
      };

      if (!layoutShiftEntry.hadRecentInput) {
        clsValue += layoutShiftEntry.value;
      }
    }

    if (clsValue > 0.1) {
      // Alert for poor CLS
      Sentry.addBreadcrumb({
        category: "performance",
        message: "Poor Cumulative Layout Shift detected",
        data: { cls: clsValue },
        level: "warning",
      });
    }
  }).observe({ entryTypes: ["layout-shift"] });
};
