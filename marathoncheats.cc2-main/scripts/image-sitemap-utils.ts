import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { groupImagesByPage } from '../src/content/imageSeo';
import { SITE_URL } from '../src/seo/config';
import { escapeXml, formatW3cDate, resolveSourceLastmod } from './sitemap-utils';

export const IMAGE_SITEMAP_PATH = join(process.cwd(), 'public', 'image-sitemap.xml');
export const IMAGE_SITEMAP_URL = `${SITE_URL}/image-sitemap.xml`;

export function renderImageSitemapXml(buildDate = new Date()) {
  const buildDateW3c = formatW3cDate(buildDate);
  const groups = groupImagesByPage();

  const body = [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([pagePath, images]) => {
      const pageUrl = pagePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${pagePath}`;
      const lastmod = formatW3cDate(
        resolveSourceLastmod(
          images.flatMap(image => image.sourceFiles),
          buildDate,
        ),
      );

      if (lastmod > buildDateW3c) {
        throw new Error(`Image sitemap lastmod is in the future for ${pagePath}: ${lastmod}`);
      }

      const imageBlocks = images
        .map(image => {
          const imageUrl = `${SITE_URL}${image.path}`;
          return `    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`;
        })
        .join('\n');

      return `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
${imageBlocks}
  </url>`;
    })
    .join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>
`;
}

export function writeImageSitemap(buildDate = new Date()) {
  writeFileSync(IMAGE_SITEMAP_PATH, renderImageSitemapXml(buildDate), 'utf8');
}

export function readImageSitemapFile() {
  return readFileSync(IMAGE_SITEMAP_PATH, 'utf8');
}
