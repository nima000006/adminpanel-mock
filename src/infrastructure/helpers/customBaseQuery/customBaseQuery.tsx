import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

import { SIGN_IN_FIRST_PAGE_ROUTE } from "@infra/router/routes/public";
import { getToken, setToken } from "@infra/services/AuthProvider/helper/authUtil";
import { sessionCleanup } from "@infra/services/AuthProvider/helper/sessionCleanup";
import { trackEvent } from "@infra/services/MatomoService/MatomoTagManager";
import {
  getFromLocalStorage,
  removeFromStorage,
  setLocalStorage,
} from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { WARNING_LOGIN_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";

import { createMockRefreshResponse } from "@infra/mock/mockAuth";
import { isMockMode } from "@infra/mock/mockMode";
import { resolveMockResponse } from "@infra/mock/resolveMockResponse";

import { errorCodes } from "../errorCodes/errorCodes";
import NetworkToastGenerator from "../GeneralHelpers/NetworkToastGenerator/NetworkToastGenerator";

// ==================== TYPES ====================
interface RefreshTokenResponse {
  access_token: string;
  refresh_token?: string;
}

interface CustomBaseQueryOptions {
  baseUrl: string;
  needToken?: boolean;
  extraHeaders?: Record<string, string>;
  maxRefreshAttempts?: number;
  refreshTimeout?: number;
  enableDebugLogging?: boolean;
  retryDelayMs?: number;
}

interface ApiErrorResponse {
  msg?: string;
  message?: string;
  detail?: {
    message?: string;
  };
}

interface QueuedRequest {
  resolve: (token: string | null) => void;
  reject: (error: Error) => void;
  timestamp: number;
  abortSignal?: AbortSignal;
}

// ==================== ERROR MESSAGES (CENTRALIZED) ====================
const ERROR_MESSAGES = {
  NETWORK_ERROR: "لطفا اتصالتان به اینترنت را بررسی نمایید",
  SERVER_ERROR: "خطا در برقراری ارتباط با سرور",
  TIMEOUT_ERROR: "زمان اتصال به پایان رسید، لطفا مجددا تلاش نمایید",
  UNKNOWN_ERROR: "خطای نامشخص رخ داده است.",
};

// ==================== IMPROVED ERROR DETECTION UTILS ====================
const isFormDataRequest = (args: string | FetchArgs): boolean => {
  if (typeof args === "string") return false;
  return args.body instanceof FormData;
};

const shouldSetJsonContentType = (
  args: string | FetchArgs,
  headers: Headers
): boolean => {
  // Don't override if Content-Type is already set (allows per-endpoint customization)
  if (headers.has("Content-Type")) {
    return false;
  }

  // Don't set for FormData requests
  if (isFormDataRequest(args)) {
    return false;
  }

  // Set JSON content type for all other requests
  return true;
};

// Helper function to identify network vs authentication errors
const isNetworkError = (error: any): boolean => {
  if (!error) return false;

  const message = error.message?.toLowerCase() || "";

  // Check for network-related error patterns
  return (
    message.includes("failed to fetch") ||
    message.includes("network error") ||
    message.includes("tunnel") ||
    message.includes("connection") ||
    message.includes("timeout") ||
    message.includes("dns") ||
    message.includes("unreachable") ||
    message.includes("cors") ||
    error.name === "NetworkError" ||
    error.name === "AbortError" ||
    error.name === "TimeoutError" ||
    // Browser-specific network errors
    message.includes("err_") ||
    message.includes("net::") ||
    // Connection specific errors
    message.includes("err_tunnel_connection_failed") ||
    message.includes("err_internet_disconnected") ||
    message.includes("err_network_changed") ||
    message.includes("err_name_not_resolved")
  );
};

// Improved function to identify actual authentication errors
const isAuthError = (error: any): boolean => {
  if (!error || !(error instanceof Error)) {
    return false;
  }

  // First check if it's a network error - if so, it's NOT an auth error
  if (isNetworkError(error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return (
    error.name === "AuthError" ||
    message.includes("no refresh token") ||
    message.includes("missing access_token") ||
    message.includes("invalid refresh response") ||
    message.includes("max refresh attempts") ||
    // Only treat as auth error if we got a proper HTTP response (not network failure)
    (message.includes("refresh failed: 401") && !isNetworkError(error)) ||
    (message.includes("refresh failed: 403") && !isNetworkError(error)) ||
    (message.includes("refresh failed: 422") && !isNetworkError(error))
  );
};

// Helper to create proper abort error
const createAbortError = (): FetchBaseQueryError => ({
  status: "CUSTOM_ERROR",
  error: "Request was aborted",
  data: { message: "Request was cancelled" },
});

// ==================== REFRESH TOKEN MANAGER ====================
class RefreshTokenManager {
  private static instance: RefreshTokenManager;
  private isRefreshing = false;
  private refreshAttempts = 0;
  private lastRefreshAttempt = 0;
  private requestQueue: QueuedRequest[] = [];
  private refreshPromise: Promise<string | null> | null = null;
  private queueMutex = false; // Simple mutex for queue operations

  // Configuration
  private readonly maxAttempts: number;
  private readonly refreshTimeout: number;
  private readonly minTimeBetweenRefresh = 1000; // 1 second
  private readonly maxQueueWaitTime = 30000; // 30 seconds
  private readonly enableLogging: boolean;

  private constructor(
    options: {
      maxAttempts?: number;
      refreshTimeout?: number;
      enableLogging?: boolean;
    } = {}
  ) {
    this.maxAttempts = options.maxAttempts || 3;
    this.refreshTimeout = options.refreshTimeout || 10000;
    this.enableLogging = options.enableLogging || false;
  }

  static getInstance(options?: {
    maxAttempts?: number;
    refreshTimeout?: number;
    enableLogging?: boolean;
  }): RefreshTokenManager {
    if (!RefreshTokenManager.instance) {
      RefreshTokenManager.instance = new RefreshTokenManager(options);
    }
    return RefreshTokenManager.instance;
  }

  async refreshToken(abortSignal?: AbortSignal): Promise<string | null> {
    this.log("RefreshToken requested", {
      isRefreshing: this.isRefreshing,
      attempts: this.refreshAttempts,
      queueSize: this.requestQueue.length,
      signalAborted: abortSignal?.aborted,
    });

    // Check if request is already aborted
    if (abortSignal?.aborted) {
      this.log("Request aborted before refresh");
      throw new Error("Request aborted");
    }

    // If already refreshing, queue this request
    if (this.isRefreshing) {
      return this.queueRequest(abortSignal);
    }

    // Check rate limiting
    const now = Date.now();
    if (now - this.lastRefreshAttempt < this.minTimeBetweenRefresh) {
      this.log("Rate limiting refresh attempts");
      await this.delay(this.minTimeBetweenRefresh - (now - this.lastRefreshAttempt));
    }

    // Check max attempts
    if (this.refreshAttempts >= this.maxAttempts) {
      const error = new Error(`Max refresh attempts (${this.maxAttempts}) exceeded`);
      error.name = "AuthError"; // Mark as auth error
      this.safeTrackEvent("Authentication Error", "Max Refresh Attempts", "Force Logout");
      this.rejectAllQueued(error);
      throw error;
    }

    // Start refresh process
    this.isRefreshing = true;
    this.refreshAttempts++;
    this.lastRefreshAttempt = now;

    try {
      this.refreshPromise = this.performRefresh(abortSignal);
      const result = await this.refreshPromise;

      this.log("Refresh completed successfully");
      this.refreshAttempts = 0; // Reset on success
      this.resolveAllQueued(result);

      return result;
    } catch (error) {
      this.log("Refresh failed", error);
      const errorObj = error instanceof Error ? error : new Error(String(error));
      this.rejectAllQueued(errorObj);
      throw errorObj;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private async queueRequest(abortSignal?: AbortSignal): Promise<string | null> {
    return new Promise((resolve, reject) => {
      // Simple mutex to prevent race conditions
      if (this.queueMutex) {
        setTimeout(() => this.queueRequest(abortSignal).then(resolve).catch(reject), 10);
        return;
      }

      this.queueMutex = true;

      try {
        // Clean expired requests from queue
        this.cleanExpiredFromQueue();

        const queuedRequest: QueuedRequest = {
          resolve,
          reject,
          timestamp: Date.now(),
          abortSignal,
        };

        this.requestQueue.push(queuedRequest);
        this.log(`Request queued, queue size: ${this.requestQueue.length}`);

        // Handle abort signal
        if (abortSignal) {
          const abortHandler = () => {
            const index = this.requestQueue.indexOf(queuedRequest);
            if (index > -1) {
              this.requestQueue.splice(index, 1);
              reject(new Error("Request aborted while queued"));
            }
          };

          abortSignal.addEventListener("abort", abortHandler, { once: true });
        }

        // Set timeout for queued request
        setTimeout(() => {
          const index = this.requestQueue.indexOf(queuedRequest);
          if (index > -1) {
            this.requestQueue.splice(index, 1);
            reject(new Error("Queue timeout exceeded"));
          }
        }, this.maxQueueWaitTime);
      } finally {
        this.queueMutex = false;
      }
    });
  }

  private async performRefresh(abortSignal?: AbortSignal): Promise<string | null> {
    const refreshToken =
      getFromLocalStorage("refresh_token") ?? getFromLocalStorage("mainRefreshToken");

    if (!refreshToken) {
      const error = new Error("No refresh token available");
      error.name = "AuthError"; // This is a real auth error
      this.safeTrackEvent("Authentication Error", "No Refresh Token", "Force Logout");
      throw error;
    }

    this.safeTrackEvent(
      "Authentication",
      "Token Refresh Attempt",
      "API Request",
      this.refreshAttempts
    );

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.refreshTimeout);

    // Combine abort signals
    if (abortSignal) {
      const abortHandler = () => controller.abort();
      abortSignal.addEventListener("abort", abortHandler, { once: true });
    }

    try {
      if (isMockMode()) {
        clearTimeout(timeoutId);
        const mockTokens = createMockRefreshResponse();
        setToken(mockTokens.access_token);
        if (mockTokens.refresh_token) {
          setLocalStorage("refresh_token", mockTokens.refresh_token);
        }
        this.refreshAttempts = 0;
        this.safeTrackEvent("Authentication", "Token Refresh Success", "Mock Mode");
        return mockTokens.access_token;
      }

      const response = await fetch(
        `${import.meta.env.VITE_URL_AUTHENTICATION}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ refreshToken }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = new Error(
          `Refresh failed: ${response.status} ${response.statusText}`
        );

        // IMPORTANT: Only mark as AuthError if we got a proper HTTP response
        // indicating the server rejected our credentials
        if (
          response.status === 400 ||
          response.status === 401 ||
          response.status === 403 ||
          response.status === 422
        ) {
          error.name = "AuthError";
        }

        this.safeTrackEvent(
          response.status >= 400 && response.status < 500
            ? "Authentication Error"
            : "Network Error",
          "Token Refresh Failed",
          `HTTP ${response.status}`,
          response.status
        );
        throw error;
      }

      const data: RefreshTokenResponse = await response.json();

      if (!data.access_token) {
        const error = new Error("Invalid refresh response: missing access_token");
        error.name = "AuthError"; // Mark as auth error
        throw error;
      }

      // Update tokens atomically
      setToken(data.access_token);
      if (data.refresh_token) {
        setLocalStorage("refresh_token", data.refresh_token);
      }

      if (getFromLocalStorage("mainRefreshToken")) {
        removeFromStorage("mainRefreshToken");
      }

      this.safeTrackEvent("Authentication", "Token Refresh Success", "API Request");
      return data.access_token;
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle different error types properly
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          this.safeTrackEvent(
            "Network Error",
            "Token Refresh Timeout",
            "Request Aborted"
          );
          const timeoutError = new Error("Token refresh timeout");
          // Don't mark as AuthError - it's a network/timeout issue
          throw timeoutError;
        }

        // Check if it's a network error (failed to fetch, connection issues, etc.)
        if (isNetworkError(error)) {
          this.safeTrackEvent(
            "Network Error",
            "Token Refresh Failed",
            "Connection Issue"
          );
          // Don't mark as AuthError - preserve as network error
          throw error;
        }
      }

      // For unknown errors, don't assume it's auth-related
      this.safeTrackEvent("Network Error", "Token Refresh Exception", String(error));
      throw error;
    }
  }

  private resolveAllQueued(token: string | null): void {
    const requests = [...this.requestQueue];
    this.requestQueue = [];

    this.log(`Resolving ${requests.length} queued requests`);
    requests.forEach(({ resolve, abortSignal }) => {
      if (!abortSignal?.aborted) {
        resolve(token);
      }
    });
  }

  private rejectAllQueued(error: Error): void {
    const requests = [...this.requestQueue];
    this.requestQueue = [];

    this.log(`Rejecting ${requests.length} queued requests`);
    requests.forEach(({ reject, abortSignal }) => {
      if (!abortSignal?.aborted) {
        reject(error);
      }
    });
  }

  private cleanExpiredFromQueue(): void {
    const now = Date.now();
    const initialSize = this.requestQueue.length;

    this.requestQueue = this.requestQueue.filter((request) => {
      if (
        request.abortSignal?.aborted ||
        now - request.timestamp > this.maxQueueWaitTime
      ) {
        request.reject(new Error("Request expired in queue"));
        return false;
      }
      return true;
    });

    if (this.requestQueue.length !== initialSize) {
      this.log(
        `Cleaned ${initialSize - this.requestQueue.length} expired requests from queue`
      );
    }
  }

  resetAttempts(): void {
    this.log("Resetting refresh attempts");
    this.refreshAttempts = 0;
    this.lastRefreshAttempt = 0;
  }

  getStats() {
    return {
      isRefreshing: this.isRefreshing,
      refreshAttempts: this.refreshAttempts,
      queueSize: this.requestQueue.length,
      lastRefreshAttempt: this.lastRefreshAttempt,
    };
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private log(message: string, data?: any): void {
    if (this.enableLogging) {
      console.warn(`[RefreshTokenManager] ${message}`, data || "");
    }
  }

  private safeTrackEvent(
    category: string,
    action: string,
    label?: string,
    value?: number
  ): void {
    try {
      trackEvent(category, action, label, value);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn("[RefreshTokenManager] Failed to track event:", error);
      }
    }
  }
}

// ==================== CUSTOM BASE QUERY ====================
const customBaseQuery = ({
  baseUrl,
  needToken = true,
  extraHeaders = {},
  maxRefreshAttempts = 3,
  refreshTimeout = 10000,
  enableDebugLogging = import.meta.env.DEV,
  retryDelayMs = 100,
}: CustomBaseQueryOptions) => {
  const refreshManager = RefreshTokenManager.getInstance({
    maxAttempts: maxRefreshAttempts,
    refreshTimeout,
    enableLogging: enableDebugLogging,
  });

  const baseQueryWithDynamicUrl: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const endpoint = getEndpointFromArgs(args);
    const method = getHttpMethodFromArgs(args);
    if (enableDebugLogging) {
      console.warn(
        `[${method} ${endpoint}] Request starting, signal aborted:`,
        api.signal?.aborted
      );
    }

    // Local mock mode: return typed fixtures instead of calling the gateway
    if (isMockMode()) {
      try {
        const data = await resolveMockResponse(args);
        if (enableDebugLogging) {
          console.warn(`[MOCK ${method} ${endpoint}] resolved`);
        }
        return { data };
      } catch (error) {
        return {
          error: {
            status: "CUSTOM_ERROR",
            error: "Mock resolver failed",
            data: { message: error instanceof Error ? error.message : "mock_error" },
          },
        };
      }
    }

    const baseQuery = fetchBaseQuery({
      baseUrl,
      timeout: 30000,
      prepareHeaders: (headers) => {
        // Set required headers
        headers.set("Accept", "application/json");

        // Set default language header to Persian
        headers.set("accept-language", "fa");

        // Intelligent Content-Type handling
        if (shouldSetJsonContentType(args, headers)) {
          headers.set("Content-Type", "application/json");
        }

        // Add authorization token
        const token = getToken();
        if (token && needToken) {
          headers.set("authorization", `Bearer ${token}`);
        }

        // Add extra headers (these can override defaults)
        Object.entries(extraHeaders).forEach(([key, value]) => {
          headers.set(key, value);
        });

        return headers;
      },
      // for cookie handling
      credentials:
        import.meta.env.VITE_URL_IS_HEADER_CREDENTIAL_ENABLED === "1"
          ? "include"
          : undefined,
    });

    // Execute initial request
    let result = await baseQuery(args, api, extraOptions);

    if (enableDebugLogging) {
      const status = result?.error?.status || "SUCCESS";
      console.warn(
        `[${method} ${endpoint}] Initial result: ${status}, signal aborted:`,
        api.signal?.aborted
      );
    }

    // Handle errors
    if (result?.error) {
      const status = result.error.status;

      // Handle 401 Unauthorized
      if (status === 401) {
        const hasRefreshToken =
          !!getFromLocalStorage("refresh_token") ||
          !!getFromLocalStorage("mainRefreshToken");
        const shouldAttemptRefresh = needToken || hasRefreshToken;
        if (enableDebugLogging) {
          console.warn(
            `[${method} ${endpoint}] Got 401, attempting refresh, signal aborted:`,
            api.signal?.aborted
          );
        }

        if (shouldAttemptRefresh) {
          if (api.signal?.aborted) {
            if (enableDebugLogging) {
              console.warn(`[${method} ${endpoint}] Request aborted before refresh`);
            }
            return { error: createAbortError() };
          }

          try {
            // Add small delay to prevent thundering herd
            if (retryDelayMs > 0) {
              await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
            }

            // Attempt token refresh
            await refreshManager.refreshToken(api.signal);

            // FIXED: Return proper abort error during refresh
            if (api.signal?.aborted) {
              if (enableDebugLogging) {
                console.warn(`[${method} ${endpoint}] Request aborted during refresh`);
              }
              return { error: createAbortError() };
            }

            if (enableDebugLogging) {
              console.warn(`[${method} ${endpoint}] Token refreshed, retrying request`);
            }

            // Retry the original request
            result = await baseQuery(args, api, extraOptions);

            if (enableDebugLogging) {
              const retryStatus = result?.error?.status || "SUCCESS";
              console.warn(`[${method} ${endpoint}] Retry result: ${retryStatus}`);
            }
            // FIXED: Handle ALL errors after retry, not just 401
            if (result?.error) {
              if (result.error.status === 401) {
                safeTrackEvent("Authentication Error", "Failed After Refresh", endpoint);
                performLogout();
              } else {
                // Handle all other errors after successful token refresh
                handleApiError(result.error, args);
              }
            }
          } catch (refreshError) {
            if (enableDebugLogging) {
              console.error(
                `[${method} ${endpoint}] Token refresh failed:`,
                refreshError
              );
            }
            // IMPROVED ERROR HANDLING: Distinguish network vs auth errors
            if (isNetworkError(refreshError)) {
              // It's a network issue - show network error toast, don't logout
              NetworkToastGenerator({ msg: ERROR_MESSAGES.NETWORK_ERROR });
              safeTrackEvent("Network Error", "Connection Failed", endpoint);
            } else if (isAuthError(refreshError)) {
              // It's a real authentication error - logout
              safeTrackEvent("Authentication Error", "Invalid Credentials", endpoint);
              performLogout();
            } else {
              // Unknown error - show generic network message, don't logout
              NetworkToastGenerator({ msg: ERROR_MESSAGES.SERVER_ERROR });
              safeTrackEvent("Unknown Error", "Refresh Failed", endpoint);
            }
          }
        } else {
          // No token, no refresh token — treat as regular error
          handleApiError(result.error, args);
        }
      } else {
        // Handle non-401 errors
        handleApiError(result.error, args);
      }
    }

    return result;
  };

  return baseQueryWithDynamicUrl;
};

// ==================== HELPER FUNCTIONS ====================
const getEndpointFromArgs = (args: string | FetchArgs): string => {
  if (typeof args === "string") {
    return args;
  }

  if (args.url) {
    try {
      const url = new URL(args.url, window.location.origin);
      return url.pathname;
    } catch {
      return args.url;
    }
  }

  return "unknown";
};

const getHttpMethodFromArgs = (args: string | FetchArgs): string => {
  if (typeof args === "string") {
    return "GET";
  }
  return (args.method || "GET").toUpperCase();
};

// FIXED: Handle ALL error types including network errors
const handleApiError = (error: FetchBaseQueryError, args: string | FetchArgs): void => {
  const status = error.status;
  const endpoint = getEndpointFromArgs(args);
  const method = getHttpMethodFromArgs(args);

  // Track the error
  safeTrackEvent("API Error", `${method} ${status}`, endpoint, status as number);

  // Extract error message
  const errorData = error.data as ApiErrorResponse;
  let errorMessage: string;

  // FIXED: Show appropriate toasts for ALL error types including network errors
  if (status === "FETCH_ERROR") {
    errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
  } else if (status === "TIMEOUT_ERROR") {
    errorMessage = ERROR_MESSAGES.TIMEOUT_ERROR;
  } else {
    const defaultMessage =
      (typeof status === "number" && errorCodes[status as keyof typeof errorCodes]) ||
      ERROR_MESSAGES.UNKNOWN_ERROR;
    errorMessage =
      errorData?.detail?.message ||
      errorData?.msg ||
      errorData?.message ||
      defaultMessage;
  }

  // Show toast for ALL errors
  NetworkToastGenerator({ msg: errorMessage });
};

const performLogout = (): void => {
  safeTrackEvent("Authentication", "Logout", "Forced by API Error");

  // Perform complete session cleanup
  sessionCleanup();

  // Reset refresh manager
  RefreshTokenManager.getInstance().resetAttempts();

  // Show warning toast
  toast.warn(WARNING_LOGIN_MESSAGE, {
    toastId: WARNING_LOGIN_MESSAGE,
    autoClose: 5000,
  });

  // Redirect to login with delay to ensure cleanup
  setTimeout(() => {
    window.location.assign(`${SIGN_IN_FIRST_PAGE_ROUTE}?reason=unauthorized`);
  }, 100);
};

const safeTrackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  try {
    trackEvent(category, action, label, value);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn("[CustomBaseQuery] Failed to track event:", error);
    }
  }
};

export default customBaseQuery;
