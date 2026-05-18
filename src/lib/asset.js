/**
 * asset — resolves a public image path for the app.
 *
 * Image paths live in content.js as root-relative ".jpg" strings. Every
 * image also has an optimized ".webp" sibling (see optimize-images.mjs);
 * this helper rewrites the extension so the app always loads the lighter
 * WebP, and prefixes the build's base URL.
 */
export function asset(path) {
  if (!path || !path.startsWith('/')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + path.replace(/\.jpe?g$/i, '.webp');
}
