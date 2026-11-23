import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

// Custom hook to check online status
function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine, // on the client
    () => true // Default to online on the server-side (SSG/SSR)
  );
}

export default useOnlineStatus;
