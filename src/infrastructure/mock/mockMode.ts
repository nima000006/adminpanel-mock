/** Local mock mode — skips live gateway when VITE_USE_MOCK=true. */
export const isMockMode = (): boolean => import.meta.env.VITE_USE_MOCK === "true";
