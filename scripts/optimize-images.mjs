/**
 * optimize-images.mjs — compresses the deck's imagery for the web.
 *
 * The raw downloads from Wikimedia Commons are large (~4–5 MB total).
 * This re-encodes each JPEG in place: capped at 1280px wide, mozjpeg
 * quality 76, metadata stripped — typically a 55–65% size reduction with
 * no visible loss, which keeps the Lighthouse performance score high.
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
let before = 0;
let after = 0;

for (const file of files) {
  const path = join(DIR, file);
  const original = (await stat(path)).size;
  const input = await readFile(path);

  const output = await sharp(input)
    .resize({ width: 1280, withoutEnlargement: true })
    .jpeg({ quality: 76, mozjpeg: true })
    .toBuffer();

  // Only overwrite if we actually saved space.
  if (output.length < original) {
    await writeFile(path, output);
  }
  before += original;
  after += Math.min(output.length, original);
  const kb = (n) => `${Math.round(n / 1024)}KB`;
  console.log(`  ${file.padEnd(28)} ${kb(original)} -> ${kb(Math.min(output.length, original))}`);
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)}MB`;
console.log(`\nTotal: ${mb(before)} -> ${mb(after)}  (${Math.round((1 - after / before) * 100)}% smaller)`);
