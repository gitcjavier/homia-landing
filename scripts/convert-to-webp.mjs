import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const DIR = new URL('../public/images/before-after/', import.meta.url).pathname;
const MAX_WIDTH = 1600;
const QUALITY = 82;

const files = await readdir(DIR);
const sources = files.filter((f) => /\.(jpe?g|png)$/i.test(f));

let totalBefore = 0;
let totalAfter = 0;

for (const file of sources) {
  const src = join(DIR, file);
  const out = join(DIR, `${parse(file).name}.webp`);

  const before = (await stat(src)).size;
  totalBefore += before;

  await sharp(src)
    .rotate() // honour EXIF orientation
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);

  const after = (await stat(out)).size;
  totalAfter += after;

  const kb = (n) => `${(n / 1024).toFixed(0)} kB`;
  const pct = ((1 - after / before) * 100).toFixed(0);
  console.log(`${file.padEnd(28)} ${kb(before).padStart(8)} → ${kb(after).padStart(8)}  (-${pct}%)`);
}

const mb = (n) => `${(n / (1024 * 1024)).toFixed(2)} MB`;
console.log('—'.repeat(60));
console.log(`Total: ${mb(totalBefore)} → ${mb(totalAfter)}  (-${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`);
