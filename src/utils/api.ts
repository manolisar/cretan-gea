/**
 * Returns true if an API backend is available (dev server or production backend).
 * On static deployments (GitHub Pages), no backend exists so we skip API calls.
 */
export const hasBackend = (): boolean => {
  // Vite dev server proxies /api to the Express backend
  if (import.meta.env.DEV) return true;
  // In production, only call API if not on github.io (static hosting)
  if (typeof window !== "undefined" && window.location.hostname.includes("github.io")) return false;
  return true;
};
