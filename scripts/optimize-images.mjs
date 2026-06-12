/**
 * Asset pipeline: WebP conversion, favicons, OG image.
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const PUBLIC = new URL('../public/', import.meta.url).pathname;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

// 1. Convert every JPG/PNG to WebP alongside the original
let converted = 0;
for await (const file of walk(PUBLIC)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  if (/favicon|apple-touch/i.test(file)) continue;
  const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
  const src = sharp(file);
  const meta = await src.metadata();
  // PNG cut-outs keep alpha; photos get quality 80
  await src.webp({ quality: 80, effort: 5 }).toFile(out);
  const before = (await stat(file)).size;
  const after = (await stat(out)).size;
  console.log(
    `${path.relative(PUBLIC, file)} (${meta.width}x${meta.height}): ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB webp`
  );
  converted++;
}
console.log(`\n${converted} images converted to WebP`);

// 2. Favicons from favicon.svg (referenced in index.html but missing)
const svg = path.join(PUBLIC, 'favicon.svg');
for (const [name, size] of [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
]) {
  await sharp(svg, { density: 300 })
    .resize(size, size)
    .png()
    .toFile(path.join(PUBLIC, name));
  console.log(`generated ${name}`);
}

// 3. OG image (1200x630) — navy brand card with portrait
const W = 1200;
const H = 630;
const portrait = await sharp(path.join(PUBLIC, 'dr-verma-new.png'))
  .resize({ height: H, fit: 'inside' })
  .toBuffer();
const portraitMeta = await sharp(portrait).metadata();

const textSvg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#0F2027"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="980" cy="80" r="320" fill="#0D9488" opacity="0.10"/>
  <circle cx="980" cy="80" r="220" fill="#0D9488" opacity="0.08"/>
  <text x="80" y="250" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="700" fill="#FFFFFF">Dr. A.K. Verma</text>
  <text x="80" y="320" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="400" fill="#5EEAD4">Pulmonologist — Kanpur</text>
  <text x="80" y="420" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#CBD5E1">Asthma · COPD · Allergy · Sleep Apnea</text>
  <text x="80" y="470" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#CBD5E1">4.9 ★ on Google · 15+ years of experience</text>
  <text x="80" y="560" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="#FFFFFF">+91-7041055430 · Ashok Nagar, Kanpur</text>
</svg>`);

await sharp(textSvg)
  .composite([
    {
      input: portrait,
      left: W - (portraitMeta.width ?? 0) + 40,
      top: H - (portraitMeta.height ?? 0),
    },
  ])
  .jpeg({ quality: 88 })
  .toFile(path.join(PUBLIC, 'images', 'dr-verma-og.jpg'));
console.log('generated images/dr-verma-og.jpg');
