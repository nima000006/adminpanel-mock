import CryptoJS from "crypto-js";

export const setLocalStorage = (key: string, value: string) => {
  const encryptedToken = CryptoJS.AES.encrypt(
    value,
    import.meta.env.VITE_ENCRYPTION_KEY
  )?.toString();
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
      const decryptedBytes = CryptoJS.AES.decrypt(
        encryptedToken,
        import.meta.env.VITE_ENCRYPTION_KEY
      );
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
