import CryptoJS from "crypto-js";

import { isMockMode } from "@infra/mock/mockMode";

const getEncryptionKey = () =>
  import.meta.env.VITE_ENCRYPTION_KEY ||
  (isMockMode() ? "daneshjouyar-local-mock-key" : undefined);

export const setLocalStorage = (key: string, value: string) => {
  const encryptionKey = getEncryptionKey();
  if (!encryptionKey) return null;

  const encryptedToken = CryptoJS.AES.encrypt(value, encryptionKey)?.toString();
  if (encryptedToken) {
    try {
      localStorage.setItem(key, encryptedToken);
      try {
        window.dispatchEvent(new CustomEvent("localStorage:set", { detail: { key } }));
      } catch (_e) {
        // ignore dispatch errors in older browsers or test environments
      }
    } catch (_) {
      return null;
    }
  }
  return null;
};

export const getFromLocalStorage = (key: string) => {
  const encryptedToken = localStorage.getItem(key);
  if (encryptedToken) {
    try {
      const encryptionKey = getEncryptionKey();
      if (!encryptionKey) return null;

      const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, encryptionKey);
      const token = decryptedBytes?.toString(CryptoJS.enc.Utf8);
      return token;
    } catch (_) {
      removeFromStorage(key);
    }
  }
  return null;
};

export const removeFromStorage = (key: string) => {
  return localStorage.removeItem(key);
};
