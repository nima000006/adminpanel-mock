/**
 * Matomo Tag Manager React Hooks
 *
 * React hooks for easy integration with Matomo Tag Manager
 */

import { useCallback, useEffect, useRef } from "react";

import { useLocation } from "react-router";

import matomoTagManager from "./MatomoTagManager";

/**
 * Hook for initializing Matomo Tag Manager (doesn't require Router)
 */
export const useMatomoTagManagerInit = () => {
  const initRef = useRef(false);

  // Initialize Tag Manager on mount
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const initializeMatomo = async () => {
      try {
        await matomoTagManager.initialize();
      } catch (error) {
        console.error("[Matomo Hook] Failed to initialize:", error);
      }
    };

    initializeMatomo();
  }, []);

  return {
    trackEvent: useCallback(
      (category: string, action: string, name?: string, value?: number) => {
        matomoTagManager.trackEvent(category, action, name, value);
      },
      []
    ),

    trackInteraction: useCallback(
      (element: string, action: string, additionalData?: Record<string, any>) => {
        matomoTagManager.trackInteraction(element, action, additionalData);
      },
      []
    ),

    setUserId: useCallback((userId: string) => {
      matomoTagManager.setUserId(userId);
    }, []),

    trackFormSubmission: useCallback((formName: string, success: boolean) => {
      matomoTagManager.trackFormSubmission(formName, success);
    }, []),

    trackDownload: useCallback((url: string, filename?: string) => {
      matomoTagManager.trackDownload(url, filename);
    }, []),

    trackOutboundLink: useCallback((url: string, linkText?: string) => {
      matomoTagManager.trackOutboundLink(url, linkText);
    }, []),

    trackPageView: useCallback((path?: string, title?: string) => {
      matomoTagManager.trackPageView(path, title);
    }, []),

    isEnabled: matomoTagManager.isEnabled(),
    getStatus: useCallback(() => matomoTagManager.getStatus(), []),
    config: matomoTagManager.getConfig(),
  };
};

/**
 * Main Matomo Tag Manager hook (requires Router context)
 */
export const useMatomoTagManager = () => {
  const location = useLocation();
  const initRef = useRef(false);
  const lastLocationRef = useRef<string>("");

  // Initialize Tag Manager on mount
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const initializeMatomo = async () => {
      try {
        await matomoTagManager.initialize();
      } catch (error) {
        console.error("[Matomo Hook] Failed to initialize:", error);
      }
    };

    initializeMatomo();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    const currentLocation = location.pathname + location.search + location.hash;

    // Skip if location hasn't changed (prevents duplicate tracking)
    if (lastLocationRef.current === currentLocation) {
      return;
    }

    if (matomoTagManager.isEnabled()) {
      // Small delay to ensure page title is updated
      const timeoutId = setTimeout(() => {
        matomoTagManager.trackPageView(currentLocation);
      }, 100);

      return () => clearTimeout(timeoutId);
    }

    lastLocationRef.current = currentLocation;
  }, [location]);

  return {
    trackPageView: useCallback((path?: string, title?: string) => {
      matomoTagManager.trackPageView(path, title);
    }, []),

    trackEvent: useCallback(
      (category: string, action: string, name?: string, value?: number) => {
        matomoTagManager.trackEvent(category, action, name, value);
      },
      []
    ),

    trackInteraction: useCallback(
      (element: string, action: string, additionalData?: Record<string, any>) => {
        matomoTagManager.trackInteraction(element, action, additionalData);
      },
      []
    ),

    setUserId: useCallback((userId: string) => {
      matomoTagManager.setUserId(userId);
    }, []),

    trackFormSubmission: useCallback((formName: string, success: boolean) => {
      matomoTagManager.trackFormSubmission(formName, success);
    }, []),

    trackDownload: useCallback((url: string, filename?: string) => {
      matomoTagManager.trackDownload(url, filename);
    }, []),

    trackOutboundLink: useCallback((url: string, linkText?: string) => {
      matomoTagManager.trackOutboundLink(url, linkText);
    }, []),

    isEnabled: matomoTagManager.isEnabled(),
    getStatus: useCallback(() => matomoTagManager.getStatus(), []),
    config: matomoTagManager.getConfig(),
  };
};

/**
 * Hook for tracking events with common patterns
 */
export const useMatomoEvents = () => {
  const trackButtonClick = useCallback((buttonName: string, section?: string) => {
    if (!buttonName?.trim()) {
      console.warn("[Matomo Events] Button name is required");
      return;
    }

    const eventName = section?.trim() ? `${section} - ${buttonName}` : buttonName;
    matomoTagManager.trackEvent("Button", "Click", eventName);
  }, []);

  const trackModalOpen = useCallback((modalName: string) => {
    if (!modalName?.trim()) {
      console.warn("[Matomo Events] Modal name is required");
      return;
    }
    matomoTagManager.trackEvent("Modal", "Open", modalName);
  }, []);

  const trackModalClose = useCallback((modalName: string) => {
    if (!modalName?.trim()) {
      console.warn("[Matomo Events] Modal name is required");
      return;
    }
    matomoTagManager.trackEvent("Modal", "Close", modalName);
  }, []);

  const trackFormStart = useCallback((formName: string) => {
    if (!formName?.trim()) {
      console.warn("[Matomo Events] Form name is required");
      return;
    }
    matomoTagManager.trackEvent("Form", "Start", formName);
  }, []);

  const trackFormComplete = useCallback((formName: string, success: boolean) => {
    if (!formName?.trim()) {
      console.warn("[Matomo Events] Form name is required");
      return;
    }
    matomoTagManager.trackFormSubmission(formName, success);
    matomoTagManager.trackEvent("Form", success ? "Success" : "Error", formName);
  }, []);

  const trackSearch = useCallback((searchTerm: string, resultsCount?: number) => {
    if (!searchTerm?.trim()) {
      console.warn("[Matomo Events] Search term is required");
      return;
    }
    matomoTagManager.trackEvent("Search", "Query", searchTerm, resultsCount);
  }, []);

  const trackFileUpload = useCallback((fileName: string, fileSize?: number) => {
    if (!fileName?.trim()) {
      console.warn("[Matomo Events] File name is required");
      return;
    }
    matomoTagManager.trackEvent("File", "Upload", fileName, fileSize);
  }, []);

  const trackError = useCallback((errorType: string, errorMessage?: string) => {
    if (!errorType?.trim()) {
      console.warn("[Matomo Events] Error type is required");
      return;
    }
    matomoTagManager.trackEvent("Error", errorType, errorMessage);
  }, []);

  return {
    trackButtonClick,
    trackModalOpen,
    trackModalClose,
    trackFormStart,
    trackFormComplete,
    trackSearch,
    trackFileUpload,
    trackError,
  };
};

/**
 * Hook for tracking user actions
 */
export const useMatomoUser = () => {
  const identifyUser = useCallback(
    (userId: string, userProperties?: Record<string, any>) => {
      if (!userId?.trim()) {
        console.warn("[Matomo User] User ID is required");
        return;
      }

      matomoTagManager.setUserId(userId);

      if (userProperties && Object.keys(userProperties).length > 0) {
        // Filter out undefined/null values and validate properties
        const validProperties = Object.entries(userProperties).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null && key?.trim()) {
              acc[`mtm.user.${key.trim()}`] = value;
            }
            return acc;
          },
          {} as Record<string, any>
        );

        if (Object.keys(validProperties).length > 0) {
          matomoTagManager.pushEvent({
            event: "mtm.UserProperties",
            "mtm.userId": userId,
            ...validProperties,
          });
        }
      }
    },
    []
  );

  const trackUserAction = useCallback((action: string, details?: string) => {
    if (!action?.trim()) {
      console.warn("[Matomo User] Action is required");
      return;
    }
    matomoTagManager.trackEvent("User", action, details);
  }, []);

  const clearUser = useCallback(() => {
    matomoTagManager.pushEvent({
      event: "mtm.ClearUserId",
    });
  }, []);

  return {
    identifyUser,
    trackUserAction,
    clearUser,
  };
};

export default useMatomoTagManager;
