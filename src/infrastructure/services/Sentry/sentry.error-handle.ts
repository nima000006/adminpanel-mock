import * as Sentry from "@sentry/react";

export const handleAppError = (
  error: Error,
  errorInfo: any,
  trackEvent?: (category: string, action: string, name?: string) => void
) => {
  // Track with Matomo if available
  try {
    trackEvent?.("React Error", "Error Boundary", error.message);
  } catch (matomoError) {
    console.warn("Failed to track error with Matomo:", matomoError);
  }

  // Track with Sentry
  Sentry.captureException(error, {
    extra: {
      componentStack: errorInfo.componentStack,
      errorInfo,
    },
    tags: {
      errorType: "react_error_boundary",
    },
  });
};
