/**
 * Lazy Query Hook Wrappers
 *
 * This module provides wrapper functions for RTK Query's lazy query hooks
 * that automatically apply `preferCacheValue: true` by default.
 *
 * This eliminates the need to manually pass `true` as the second argument
 * to every lazy query trigger call.
 *
 * @example
 * // Before (manual):
 * const [getTrigger] = useLazyGetSomethingQuery();
 * getTrigger(params, true); // Must manually add true every time
 *
 * // After (automatic):
 * const [getTrigger] = useCachedLazyQuery(useLazyGetSomethingQuery);
 * getTrigger(params); // Automatically uses cache
 */

import { useCallback } from "react";

/**
 * Wraps a lazy query hook to automatically use cached data when available.
 *
 * This is a generic wrapper that works with any RTK Query lazy hook.
 * It intercepts the trigger function and adds `preferCacheValue: true` by default.
 *
 * @param useLazyQuery - The RTK Query lazy hook to wrap
 * @param defaultPreferCache - Whether to prefer cache by default (default: true)
 * @returns The same hook result but with cache-preferring trigger
 *
 * @example
 * // In your component:
 * const [getAdmissionList, { data, isFetching }] = useCachedLazyQuery(
 *   useLazyGetAdmissionListQuery
 * );
 *
 * // Now you can call without the second parameter:
 * getAdmissionList({ page: 1 }); // Uses cache automatically
 *
 * // Or override to force refetch:
 * getAdmissionList({ page: 1 }, false); // Forces network request
 */
export function useCachedLazyQuery<T extends () => readonly [any, ...any[]]>(
  useLazyQuery: T,
  defaultPreferCache = true
): ReturnType<T> {
  const result = useLazyQuery();
  const [trigger, ...rest] = result;

  const cachedTrigger = useCallback(
    (arg: any, preferCacheValue?: boolean) => {
      // Use provided value or default to preferCache
      const shouldPreferCache = preferCacheValue ?? defaultPreferCache;
      return trigger(arg, shouldPreferCache);
    },
    [trigger, defaultPreferCache]
  );

  return [cachedTrigger, ...rest] as ReturnType<T>;
}

/**
 * A simpler alternative: Higher-order function that creates a wrapped hook.
 * This can be used at the module level to export pre-wrapped hooks.
 *
 * @example
 * // In dormBaseApi.tsx or a separate hooks file:
 * import { useLazyGetAdmissionListQuery } from "./dormBaseApi";
 * import { withCachePreference } from "@infra/states/redux/config";
 *
 * export const useCachedAdmissionListQuery = withCachePreference(
 *   useLazyGetAdmissionListQuery
 * );
 *
 * // In component:
 * const [getList, { data }] = useCachedAdmissionListQuery();
 * getList(params); // Uses cache automatically
 */
export function withCachePreference<T extends () => readonly [any, ...any[]]>(
  useLazyQuery: T,
  defaultPreferCache = true
): () => ReturnType<T> {
  return () => useCachedLazyQuery(useLazyQuery, defaultPreferCache);
}
