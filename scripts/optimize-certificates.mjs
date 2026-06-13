/**
 * One-off optimiser for the certificate scans + press cutting.
 * Source PNGs are 1.2–2.5 MB each; these are displayed at <800px,
 * so we resize to 1100px wide and emit quality-82 WebP.
 * Run: node scripts/optimize-certificates.mjs
 */
import sharp from 'sharp';
import { stat } from 'node:fs/promises';
import path from 'node:path';

const PUBLIC = new URL('../public/', import.meta.url).pathname;

const targets = [
  'Certificates/Certificate 1.png',
  'Certificates/Certificate 2.png',
  'Certificates/Certificate 3.png',
  'Paper cutting.png',
];

for (const rel of targets) {
  const src = path.join(PUBLIC, rel);
  const out = src.replace(/\.png$/i, '.webp');
  await sharp(src)
    .resize({ width: 1100, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(out);
  const before = (await stat(src)).size;
  const after = (await stat(out)).size;
  console.log(
    `${rel}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB webp`
  );
}
console.log('\nDone. Update component src references from .png to .webp.');
