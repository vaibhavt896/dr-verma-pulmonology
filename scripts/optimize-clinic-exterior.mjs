/**
 * One-off: optimise the real clinic exterior photo.
 * Source is a 3123x4160 / 880KB phone JPEG; displayed at <650px wide.
 * Resize to 1280px wide and emit quality-82 WebP.
 * Run: node scripts/optimize-clinic-exterior.mjs
 */
import sharp from 'sharp';
import { stat } from 'node:fs/promises';
import path from 'node:path';

const PUBLIC = new URL('../public/', import.meta.url).pathname;
const src = path.join(PUBLIC, 'clinic outside image.jpeg');
const out = path.join(PUBLIC, 'clinic-exterior.webp');

await sharp(src)
  .rotate() // honour EXIF orientation
  .resize({ width: 1280, withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile(out);

const before = (await stat(src)).size;
const after = (await stat(out)).size;
const meta = await sharp(out).metadata();
console.log(
  `clinic-exterior.webp (${meta.width}x${meta.height}): ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`
);
