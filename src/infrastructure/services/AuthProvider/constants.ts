/**
 * Centralized authentication storage key constants
 *
 * IMPORTANT: Always use these constants instead of hardcoded strings
 * to ensure consistent token storage and cleanup across the application.
 */

/** Key for storing the access token in localStorage */
export const ACCESS_TOKEN_KEY = "access_token";

/** Key for storing the encrypted refresh token in localStorage */
export const REFRESH_TOKEN_KEY = "refresh_token";

/** Key for storing user metadata in localStorage */
export const META_KEY = "meta";

/** Key for storing menu/role information */
export const MI_KEY = "MI";

/** Key for storing current page state */
export const CURRENT_PAGE_KEY = "currentPage";

/** Key for storing temporary token during sign-in flow */
export const MAIN_TOKEN_KEY = "mainToken";

/** Key for storing temporary refresh token during sign-in flow */
export const MAIN_REFRESH_TOKEN_KEY = "mainRefreshToken";

/** Key for storing temporary info during sign-in */
export const TEMP_INFO_KEY = "tempInfo";

/**
 * All auth-related keys that should be cleared on logout
 * Does NOT include app preferences or non-auth data
 */
export const AUTH_KEYS_TO_CLEAR = [
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  META_KEY,
  MI_KEY,
  CURRENT_PAGE_KEY,
  MAIN_TOKEN_KEY,
  MAIN_REFRESH_TOKEN_KEY,
  TEMP_INFO_KEY,
] as const;
