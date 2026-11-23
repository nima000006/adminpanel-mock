/**
 * Matomo Tag Manager Service
 *
 * Handles Matomo Tag Manager integration for React SPA
 * Works with self-hosted Matomo instances using Tag Manager
 */

// Extend window interface for Matomo Tag Manager
declare global {
  interface Window {
    _mtm?: any[];
  }
}

export interface MatomoTagManagerConfig {
  url: string;
  containerId: string;
  siteId: string;
  enabled: boolean;
  respectDnt: boolean;
  environment: string;
  trackErrors: boolean;
}

export interface MatomoTagEvent {
  event: string;
  [key: string]: any;
}

class MatomoTagManagerService {
  private config: MatomoTagManagerConfig;
  private isInitialized = false;
  private scriptLoaded = false;

  constructor() {
    this.config = this.getConfigFromEnv();
  }

  /**
   * Get configuration from environment variables
   */
  private getConfigFromEnv(): MatomoTagManagerConfig {
    return {
      url: import.meta.env.VITE_MATOMO_URL?.trim() || "",
      containerId: import.meta.env.VITE_MATOMO_CONTAINER_ID?.trim() || "",
      siteId: import.meta.env.VITE_MATOMO_SITE_ID?.trim() || "",
      enabled: import.meta.env.VITE_MATOMO_ENABLED === "true",
      respectDnt: import.meta.env.VITE_MATOMO_RESPECT_DNT !== "false",
      environment: import.meta.env.VITE_MATOMO_ENVIRONMENT?.trim() || "development",
      trackErrors: import.meta.env.VITE_MATOMO_TRACK_ERRORS === "true",
    };
  }

  /**
   * Check if Do Not Track is enabled
   */
  private isDntEnabled(): boolean {
    if (!this.config.respectDnt) return false;

    try {
      return (
        navigator.doNotTrack === "1" ||
        (window as any).doNotTrack === "1" ||
        (navigator as any).doNotTrack === "yes" ||
        (navigator as any).msDoNotTrack === "1"
      );
    } catch (error) {
      console.warn("[Matomo] Error checking DNT status:", error);
      return false;
    }
  }

  /**
   * Validate configuration
   */
  private validateConfig(): boolean {
    if (!this.config.url) {
      console.warn("[Matomo] Missing URL configuration");
      return false;
    }

    if (!this.config.containerId) {
      console.warn("[Matomo] Missing Container ID configuration");
      return false;
    }

    try {
      new URL(this.config.url);
    } catch {
      console.error("[Matomo] Invalid URL format:", this.config.url);
      return false;
    }

    return true;
  }

  /**
   * Check if tracking should be enabled
   */
  private shouldTrack(): boolean {
    if (!this.config.enabled) {
      console.warn("[Matomo] Tracking disabled in configuration");
      return false;
    }

    if (!this.validateConfig()) {
      return false;
    }

    if (this.isDntEnabled()) {
      console.warn("[Matomo] Do Not Track is enabled, respecting user preference");
      return false;
    }

    return true;
  }

  /**
   * Load Matomo Tag Manager script
   */
  private loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.scriptLoaded || document.getElementById("matomo-tag-manager")) {
        resolve();
        return;
      }

      try {
        const script = document.createElement("script");
        script.id = "matomo-tag-manager";
        script.async = true;
        script.src = `${this.config.url}/js/container_${this.config.containerId}.js`;

        script.onload = () => {
          this.scriptLoaded = true;
          resolve();
        };

        script.onerror = (error) => {
          console.error("[Matomo] Failed to load script:", error);
          reject(new Error("Failed to load Matomo script"));
        };

        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode?.insertBefore(script, firstScript);
      } catch (error) {
        console.error("[Matomo] Error creating script element:", error);
        reject(error);
      }
    });
  }

  /**
   * Initialize Matomo Tag Manager
   */
  public async initialize(): Promise<void> {
    if (!this.shouldTrack() || this.isInitialized) {
      return;
    }

    try {
      // Initialize the _mtm array
      window._mtm = window._mtm || [];

      // Push the start event
      window._mtm.push({
        "mtm.startTime": Date.now(),
        event: "mtm.Start",
      });

      // Load the script
      await this.loadScript();

      this.isInitialized = true;
      console.warn("[Matomo] Tag Manager initialized successfully");

      // Track errors if enabled
      if (this.config.trackErrors) {
        this.setupErrorTracking();
      }
    } catch (error) {
      console.error("[Matomo] Failed to initialize:", error);
      this.isInitialized = false;
      throw error;
    }
  }

  /**
   * Setup error tracking
   */
  private setupErrorTracking(): void {
    const originalOnError = window.onerror;
    const originalOnUnhandledRejection = window.onunhandledrejection;

    window.onerror = (message, source, lineno, colno, error) => {
      this.trackEvent("JavaScript Error", "Error", String(message));
      return originalOnError
        ? originalOnError.call(window, message, source, lineno, colno, error)
        : false;
    };

    window.onunhandledrejection = (event) => {
      this.trackEvent("Unhandled Promise Rejection", "Error", String(event.reason));
      return originalOnUnhandledRejection
        ? originalOnUnhandledRejection.call(window, event)
        : false;
    };
  }

  /**
   * Push event to Matomo Tag Manager
   */
  public pushEvent(event: MatomoTagEvent): void {
    if (!this.shouldTrack() || !this.isInitialized) {
      return;
    }

    try {
      if (!window._mtm) {
        console.warn("[Matomo] Tag Manager not available");
        return;
      }

      window._mtm.push(event);

      if (this.config.environment === "development") {
        console.warn("[Matomo] Event pushed:", event);
      }
    } catch (error) {
      console.error("[Matomo] Error pushing event:", error);
    }
  }

  /**
   * Track page view (for SPA navigation)
   */
  public trackPageView(customPath?: string, customTitle?: string): void {
    const path =
      customPath ||
      window.location.pathname + window.location.search + window.location.hash;
    const title = customTitle || document.title;

    this.pushEvent({
      event: "mtm.PageView",
      "mtm.url": window.location.origin + path,
      "mtm.title": title,
    });
  }

  /**
   * Track custom event
   */
  public trackEvent(
    category: string,
    action: string,
    name?: string,
    value?: number
  ): void {
    if (!category?.trim() || !action?.trim()) {
      console.warn("[Matomo] Event category and action are required");
      return;
    }

    this.pushEvent({
      event: "mtm.Event",
      "mtm.eventCategory": category.trim(),
      "mtm.eventAction": action.trim(),
      ...(name && { "mtm.eventName": name.trim() }),
      ...(typeof value === "number" && !isNaN(value) && { "mtm.eventValue": value }),
    });
  }

  /**
   * Track user interaction
   */
  public trackInteraction(
    element: string,
    action: string,
    additionalData?: Record<string, any>
  ): void {
    if (!element?.trim() || !action?.trim()) {
      console.warn("[Matomo] Interaction element and action are required");
      return;
    }

    this.pushEvent({
      event: "mtm.Interaction",
      "mtm.interactionElement": element.trim(),
      "mtm.interactionAction": action.trim(),
      ...additionalData,
    });
  }

  /**
   * Set user ID
   */
  public setUserId(userId: string): void {
    if (!userId?.trim()) {
      console.warn("[Matomo] User ID cannot be empty");
      return;
    }

    this.pushEvent({
      event: "mtm.SetUserId",
      "mtm.userId": userId.trim(),
    });
  }

  /**
   * Track form submission
   */
  public trackFormSubmission(formName: string, success: boolean): void {
    if (!formName?.trim()) {
      console.warn("[Matomo] Form name is required");
      return;
    }

    this.pushEvent({
      event: "mtm.FormSubmit",
      "mtm.formName": formName.trim(),
      "mtm.formSuccess": Boolean(success),
    });
  }

  /**
   * Track download
   */
  public trackDownload(url: string, filename?: string): void {
    if (!url?.trim()) {
      console.warn("[Matomo] Download URL is required");
      return;
    }

    this.pushEvent({
      event: "mtm.Download",
      "mtm.downloadUrl": url.trim(),
      "mtm.downloadName": filename?.trim() || url.split("/").pop() || url,
    });
  }

  /**
   * Track outbound link
   */
  public trackOutboundLink(url: string, linkText?: string): void {
    if (!url?.trim()) {
      console.warn("[Matomo] Outbound URL is required");
      return;
    }

    this.pushEvent({
      event: "mtm.OutboundLink",
      "mtm.outboundUrl": url.trim(),
      "mtm.outboundText": linkText?.trim() || url,
    });
  }

  /**
   * Get current configuration (readonly copy)
   */
  public getConfig(): Readonly<MatomoTagManagerConfig> {
    return Object.freeze({ ...this.config });
  }

  /**
   * Check if tracking is enabled and initialized
   */
  public isEnabled(): boolean {
    return this.isInitialized && this.shouldTrack();
  }

  /**
   * Get initialization status
   */
  public getStatus() {
    return {
      isInitialized: this.isInitialized,
      scriptLoaded: this.scriptLoaded,
      shouldTrack: this.shouldTrack(),
      isDntEnabled: this.isDntEnabled(),
      config: this.getConfig(),
    };
  }

  /**
   * Manually disable tracking
   */
  public disable(): void {
    this.isInitialized = false;
    console.warn("[Matomo] Tracking disabled");
  }

  /**
   * Reset the service (useful for testing)
   */
  public reset(): void {
    this.isInitialized = false;
    this.scriptLoaded = false;
    console.warn("[Matomo] Service reset");
  }
}

// Create singleton instance
const matomoTagManager = new MatomoTagManagerService();

export default matomoTagManager;

// Export convenience functions with error handling
export const trackPageView = (path?: string, title?: string): void => {
  try {
    matomoTagManager.trackPageView(path, title);
  } catch (error) {
    console.error("[Matomo] Error in trackPageView:", error);
  }
};

export const trackEvent = (
  category: string,
  action: string,
  name?: string,
  value?: number
): void => {
  try {
    matomoTagManager.trackEvent(category, action, name, value);
  } catch (error) {
    console.error("[Matomo] Error in trackEvent:", error);
  }
};

export const trackInteraction = (
  element: string,
  action: string,
  additionalData?: Record<string, any>
): void => {
  try {
    matomoTagManager.trackInteraction(element, action, additionalData);
  } catch (error) {
    console.error("[Matomo] Error in trackInteraction:", error);
  }
};

export const setUserId = (userId: string): void => {
  try {
    matomoTagManager.setUserId(userId);
  } catch (error) {
    console.error("[Matomo] Error in setUserId:", error);
  }
};

export const trackFormSubmission = (formName: string, success: boolean): void => {
  try {
    matomoTagManager.trackFormSubmission(formName, success);
  } catch (error) {
    console.error("[Matomo] Error in trackFormSubmission:", error);
  }
};

export const trackDownload = (url: string, filename?: string): void => {
  try {
    matomoTagManager.trackDownload(url, filename);
  } catch (error) {
    console.error("[Matomo] Error in trackDownload:", error);
  }
};

export const trackOutboundLink = (url: string, linkText?: string): void => {
  try {
    matomoTagManager.trackOutboundLink(url, linkText);
  } catch (error) {
    console.error("[Matomo] Error in trackOutboundLink:", error);
  }
};
