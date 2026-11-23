import * as Sentry from "@sentry/react";

export const initializeSentry = () => {
  const environment = import.meta.env.VITE_URL_NAME;
  const dsn = import.meta.env.VITE_URL_SENTRY_DSN;

  // Only enable Sentry in UAT and PRODUCTION environments
  const enabledEnvironments = ["UAT", "PRODUCTION"];
  const isSentryEnabled = enabledEnvironments.includes(environment);

  if (!isSentryEnabled) {
    // Sentry is disabled in LOCAL, DEV, and STAGING environments
    return { reactErrorHandler: () => () => {} };
  }

  if (!dsn) {
    console.warn("Sentry DSN not configured");
    return { reactErrorHandler: () => () => {} };
  }

  Sentry.init({
    dsn,
    environment,
    release: import.meta.env.VITE_SENTRY_RELEASE,
    integrations: [Sentry.replayIntegration()],
    tracePropagationTargets: [
      import.meta.env.VITE_API_BASE_URL,
      import.meta.env.VITE_API_BASE_BPMS_URL,
    ].filter(Boolean),
    // Higher sample rates for UAT to catch more issues before production
    tracesSampleRate: environment === "UAT" ? 0.5 : 0.1,
    replaysSessionSampleRate: environment === "UAT" ? 0.5 : 0.1,
    replaysOnErrorSampleRate: 1.0,
    beforeSend(event) {
      // Filter out non-critical errors in production
      // if (environment === "PRODUCTION" && event.level === "warning") {
      //   return null;
      // }
      return event;
    },
  });

  return { reactErrorHandler: Sentry.reactErrorHandler };
};
