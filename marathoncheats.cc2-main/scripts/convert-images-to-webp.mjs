/**
 * Build-time: create WebP copies of PNG/JPEG assets (keeps originals as fallback).
 * SEO/perf benefit: smaller payloads via <picture> without changing rendered layout.
 */
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ensureDependencies } from './ensure-deps.mjs';

const publicDir = join(process.cwd(), 'public');
let converted = 0;
let skipped = 0;

async function walk(dir, sharp) {
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      await walk(fullPath, sharp);
      continue;
    }

    if (!/\.(png|jpe?g)$/i.test(name)) continue;

    const webpPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp');

    try {
      const webpStats = statSync(webpPath);
      if (webpStats.mtimeMs >= stats.mtimeMs) {
        skipped += 1;
        continue;
      }
    } catch {
      // WebP missing — create it.
    }

    await sharp(fullPath)
      .webp({ quality: 85, effort: 4 })
      .toFile(webpPath);

    converted += 1;
    console.log(`WebP: ${relative(publicDir, webpPath)}`);
  }
}

await ensureDependencies();
const sharp = (await import('sharp')).default;
await walk(publicDir, sharp);
console.log(`WebP conversion complete (${converted} created/updated, ${skipped} up-to-date).`);
