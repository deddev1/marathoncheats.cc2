/**
 * Downloads official Bungie Marathon press screenshots hosted on IGN
 * (Marathon Screenshots 2026 and 2025 gallery) and writes optimized WebP/PNG
 * assets into public/ using existing filenames so no component changes are needed.
 *
 * Source gallery: https://nordic.ign.com/marathon/104923/gallery/marathon-screenshots-2026-and-2025
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IGN_BASE = 'https://sm.ign.com/t/ign_nordic';

const IMAGE_MAP = [
  {
    url: `${IGN_BASE}/gallery/m/marathon-s/marathon-screenshots-2026-and-2025_r5a9.1400.jpg`,
    output: 'public/blog-marathon-world.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/2026-marathon-server-slam-presskit-large-05-1772569983635_rn12.1400.jpg`,
    output: 'public/blog-recoil-control.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/2026-marathon-server-slam-presskit-large-04-1772569983635_67zj.1400.jpg`,
    output: 'public/blog-loot-esp.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/2026-marathon-server-slam-presskit-large-03-1772569983635_y2kb.1400.jpg`,
    output: 'public/blog-external-cheat.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/2026-marathon-server-slam-presskit-large-02-1772569983635_humq.1400.jpg`,
    output: 'public/blog-marathon-guide.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/2026-marathon-server-slam-presskit-large-01-1772569983635_dmq5.1400.jpg`,
    output: 'public/marathon-safety-characters-purple.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/2026-marathon-server-slam-presskit-compressed-06-17725699836_5f9h.1400.jpg`,
    output: 'public/marathon-safety-characters.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/2026-marathon-server-slam-presskit-compressed-05-17725699836_w7ug.1400.jpg`,
    output: 'public/blog-patch-updates.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/2026-marathon-server-slam-presskit-compressed-04-17725699836_5np3.1400.jpg`,
    output: 'public/blog-esp-guide.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/2026-marathon-server-slam-presskit-compressed-03-17725699836_dmav.1400.jpg`,
    output: 'public/blog-aimbot-guide.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/2026-marathon-server-slam-presskit-compressed-02-17725699836_grvb.1400.jpg`,
    output: 'public/blog-bungie-anticheat.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/2026-marathon-server-slam-presskit-compressed-01-17725699836_rvu4.1400.jpg`,
    output: 'public/blog-hwid-spoofer.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/rook-cinematic-8-1772569946938_gq78.1400.jpg`,
    output: 'public/blog-marathon-cheats-comparison.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/rook-cinematic-7-1772569946938_nfbq.1400.jpg`,
    output: 'public/blog-makima-comparison.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/rook-cinematic-6-1772569946938_gvt5.1400.jpg`,
    output: 'public/blog-novaxware-comparison.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/rook-cinematic-5-1772569946938_wrm6.1400.jpg`,
    output: 'public/blog-sternclient-comparison.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/rook-cinematic-4-1772569946937_axur.1400.jpg`,
    output: 'public/blog-checkout-guide.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/rook-cinematic-3-1772569946937_fwjz.1400.jpg`,
    output: 'public/blog-sony-bans.webp',
    width: 1600,
  },
  {
    url: `${IGN_BASE}/photo/default/rook-cinematic-2-1772569946937_a5rj.1400.jpg`,
    output: 'public/images/marathon-hero-demo-thumbnail.webp',
    width: 1280,
  },
  {
    url: `${IGN_BASE}/photo/default/rook-cinematic-1-1772569946936_u6qm.1400.jpg`,
    output: 'public/images/marathon-feature-demo-thumbnail.webp',
    width: 1280,
  },
  {
    url: `${IGN_BASE}/photo/default/2026-marathon-server-slam-presskit-large-05-1772569983635_rn12.1400.jpg`,
    output: 'public/image-44fb6aa2-4123-47aa-ba38-e2a9f0bdaee6.png',
    width: 1920,
    format: 'png',
  },
  {
    url: `${IGN_BASE}/gallery/m/marathon-s/marathon-screenshots-2026-and-2025_r5a9.1400.jpg`,
    output: 'public/marathon-cheats-social-preview.png',
    width: 1200,
    format: 'png',
    height: 630,
    fit: 'cover',
  },
];

async function downloadBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function writeOptimizedImage({ url, output, width, height, format = 'webp', fit = 'inside' }) {
  const buffer = await downloadBuffer(url);
  const outputPath = path.resolve(output);
  await mkdir(path.dirname(outputPath), { recursive: true });

  let pipeline = sharp(buffer).rotate().resize({
    width,
    height,
    fit,
    withoutEnlargement: true,
  });

  if (format === 'png') {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  } else {
    pipeline = pipeline.webp({ quality: 85 });
  }

  await pipeline.toFile(outputPath);
  const meta = await sharp(outputPath).metadata();
  console.log(`Wrote ${output} (${meta.width}x${meta.height}, ${format})`);
}

for (const entry of IMAGE_MAP) {
  await writeOptimizedImage(entry);
}

console.log(`Replaced ${IMAGE_MAP.length} Marathon images from IGN press screenshots.`);
