import { clearAllIndexedDBData } from "@infra/services/IndexedDB/operations";
import { removeFromStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";

import { removeToken } from "./authUtil";
import { AUTH_KEYS_TO_CLEAR } from "../constants";

/**
 * Centralized session cleanup logic.
 *
 * 1. Clears Auth Tokens from LocalStorage/Cookie
 * 2. Clears User Info
 * 3. Clears IndexedDB (Column orders, preferences, etc.)
 */
export const sessionCleanup = async () => {
  // 1. Clear LocalStorage keys
  AUTH_KEYS_TO_CLEAR.forEach((key) => {
    try {
      removeFromStorage(key);
    } catch (error) {
      console.warn(`Failed to remove ${key}:`, error);
    }
  });

  // 2. Remove Token
  removeToken();

  // 3. Clear IndexedDB Data (Async but we don't necessarily block waiting for it)
  try {
    await clearAllIndexedDBData();
    console.warn("IndexedDB data cleared successfully.");
  } catch (error) {
    console.error("Failed to clear IndexedDB data:", error);
  }
};
