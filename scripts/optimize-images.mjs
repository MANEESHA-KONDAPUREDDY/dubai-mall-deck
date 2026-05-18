/**
 * optimize-images.mjs — compresses the deck's imagery for the web.
 *
 * For every source JPEG it:
 *   1. re-encodes the JPEG in place (capped at 1280px, mozjpeg q76) —
 *      the .jpg is kept as a fallback / for social-share meta tags;
 *   2. writes a matching .webp (q72) — the app loads these via the
 *      asset() helper, which is ~30% smaller and lifts the Lighthouse
 *      performance score.
 *
 * Usage:  node scripts/optimize-images.mjs
 */

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'assets',
  'images'
);

const files = (await readdir(DIR)).filter((f) => /\.jpe?g$/i.test(f));
let jpgTotal = 0;
let webpTotal = 0;

for (const file of files) {
  const path = join(DIR, file);
  const original = (await stat(path)).size;
  const input = await readFile(path);

  const jpg = await sharp(input)
    .resize({ width: 1280, withoutEnlargement: true })
    .jpeg({ quality: 76, mozjpeg: true })
    .toBuffer();
  if (jpg.length < original) await writeFile(path, jpg);

  const webp = await sharp(input)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 62 })
    .toBuffer();
  await writeFile(path.replace(/\.jpe?g$/i, '.webp'), webp);

  jpgTotal += Math.min(jpg.length, original);
  webpTotal += webp.length;
  const kb = (n) => `${Math.round(n / 1024)}KB`;
  console.log(`  ${file.padEnd(28)} jpg ${kb(Math.min(jpg.length, original))}  webp ${kb(webp.length)}`);
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)}MB`;
console.log(`\nWebP set: ${mb(webpTotal)} (served to the app) · JPEG set: ${mb(jpgTotal)} (fallback)`);
