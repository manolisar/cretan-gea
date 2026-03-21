/** Prepend Vite's base URL to a public asset path */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}

/** Prepend Vite's base URL to an internal route path */
export function routeHref(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}
