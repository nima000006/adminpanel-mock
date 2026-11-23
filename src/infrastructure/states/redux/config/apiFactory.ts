/**
 * RTK Query API Factory
 * Creates consistent API configurations across the application
 */

import { createApi } from "@reduxjs/toolkit/query/react";

import customBaseQuery from "@infra/helpers/customBaseQuery/customBaseQuery";

// ==================== TYPES ====================

export interface ApiFactoryConfig {
  /** Unique reducer path for this API slice */
  reducerPath: string;
  /** Base URL for all endpoints in this API */
  baseUrl: string;
  /** Tag types for cache invalidation */
  tagTypes: readonly string[];
  /** Whether endpoints require authentication token (default: true) */
  needToken?: boolean;
  /** Extra headers to include in all requests */
  extraHeaders?: Record<string, string>;
  /** Time in seconds to keep unused data in cache (default: 300 = 5 minutes) */
  keepUnusedDataFor?: number;
  /**
   * Time in seconds after which to refetch on mount/arg change
   * Set to false to disable, true to always refetch, or number for seconds
   * (default: false - use cache)
   */
  refetchOnMountOrArgChange?: boolean | number;
  /** Refetch when window regains focus (default: false) */
  refetchOnFocus?: boolean;
  /** Refetch when network reconnects (default: true) */
  refetchOnReconnect?: boolean;
}

// ==================== DEFAULT CONFIG ====================

const DEFAULT_CONFIG: Partial<ApiFactoryConfig> = {
  needToken: true,
  keepUnusedDataFor: 300, // 5 minutes
  refetchOnMountOrArgChange: false, // Use cache by default
  refetchOnFocus: false,
  refetchOnReconnect: true,
};

// ==================== API FACTORY ====================

/**
 * Creates a new RTK Query API with consistent configuration
 *
 * @example
 * export const dormApi = createBaseApi({
 *   reducerPath: "api/dorm",
 *   baseUrl: import.meta.env.VITE_URL_DORM,
 *   tagTypes: ALL_DORM_TAG_TYPES,
 * });
 */
export function createBaseApi<TagTypes extends readonly string[]>(
  config: ApiFactoryConfig & { tagTypes: TagTypes }
) {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  return createApi({
    reducerPath: mergedConfig.reducerPath,
    tagTypes: mergedConfig.tagTypes as unknown as string[],
    baseQuery: customBaseQuery({
      baseUrl: mergedConfig.baseUrl,
      needToken: mergedConfig.needToken,
      extraHeaders: mergedConfig.extraHeaders,
    }),
    keepUnusedDataFor: mergedConfig.keepUnusedDataFor,
    refetchOnMountOrArgChange: mergedConfig.refetchOnMountOrArgChange,
    refetchOnFocus: mergedConfig.refetchOnFocus,
    refetchOnReconnect: mergedConfig.refetchOnReconnect,
    endpoints: () => ({}),
  });
}

// ==================== PRE-CONFIGURED API CREATORS ====================

/**
 * Creates an API with default settings optimized for frequently accessed data
 * - Longer cache time (10 minutes)
 * - No auto-refetch on mount
 */
export function createCachedApi<TagTypes extends readonly string[]>(
  config: Omit<ApiFactoryConfig, "keepUnusedDataFor" | "refetchOnMountOrArgChange"> & {
    tagTypes: TagTypes;
  }
) {
  return createBaseApi({
    ...config,
    keepUnusedDataFor: 600, // 10 minutes
    refetchOnMountOrArgChange: false,
  });
}

/**
 * Creates an API with settings optimized for real-time data
 * - Shorter cache time (1 minute)
 * - Auto-refetch on mount after 30 seconds
 * - Refetch on focus
 */
export function createRealtimeApi<TagTypes extends readonly string[]>(
  config: Omit<
    ApiFactoryConfig,
    "keepUnusedDataFor" | "refetchOnMountOrArgChange" | "refetchOnFocus"
  > & { tagTypes: TagTypes }
) {
  return createBaseApi({
    ...config,
    keepUnusedDataFor: 60, // 1 minute
    refetchOnMountOrArgChange: 30, // Refetch after 30 seconds
    refetchOnFocus: true,
  });
}

/**
 * Creates an API for static/reference data that rarely changes
 * - Very long cache time (30 minutes)
 * - No auto-refetch
 */
export function createStaticApi<TagTypes extends readonly string[]>(
  config: Omit<
    ApiFactoryConfig,
    "keepUnusedDataFor" | "refetchOnMountOrArgChange" | "refetchOnFocus"
  > & { tagTypes: TagTypes }
) {
  return createBaseApi({
    ...config,
    keepUnusedDataFor: 1800, // 30 minutes
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
  });
}
