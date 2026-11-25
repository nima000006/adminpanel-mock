/**
 * Local mock mode is the default for this mock workspace.
 * Set VITE_USE_MOCK=false explicitly when a live gateway is required.
 */
export const isMockMode = (): boolean => import.meta.env.VITE_USE_MOCK !== "false";
