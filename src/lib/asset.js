/**
 * asset — resolves a public asset path against the build's base URL.
 *
 * In development the base is "/"; in the GitHub Pages production build it
 * is "/dubai-mall-deck/". Image paths live in content.js as root-relative
 * strings ("/assets/images/x.jpg"); this rewrites them so they resolve
 * correctly under whichever base the app is served from.
 */
export function asset(path) {
  if (!path || !path.startsWith('/')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + path;
}
