import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  SITE_VIDEOS,
  getVideoContentUrl,
  getVideoEmbedUrl,
  getVideoThumbnailUrl,
} from '../src/content/videos';
import { VIDEO_DURATIONS_SECONDS, VIDEO_UPLOAD_DATES_ISO, VIDEO_UPLOAD_DATES_W3C } from '../src/content/videoMetadata.generated';
import { escapeXml } from './sitemap-utils';

export const VIDEO_SITEMAP_PATH = join(process.cwd(), 'public', 'video-sitemap.xml');
export const VIDEO_SITEMAP_URL = 'https://marathoncheats.cc/video-sitemap.xml';

export function renderVideoSitemapXml(buildDate = new Date()) {
  const buildDateW3c = buildDate.toISOString().slice(0, 10);

  const body = SITE_VIDEOS.map(video => {
    const publicationDate = VIDEO_UPLOAD_DATES_ISO[video.slug] ?? buildDate.toISOString();
    const publicationDay = VIDEO_UPLOAD_DATES_W3C[video.slug] ?? buildDateW3c;

    if (publicationDay > buildDateW3c) {
      throw new Error(`Video publication date is in the future for ${video.slug}: ${publicationDay}`);
    }

    return `  <url>
    <loc>${escapeXml(getVideoEmbedUrl(video))}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(getVideoThumbnailUrl(video))}</video:thumbnail_loc>
      <video:title>${escapeXml(video.name)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${escapeXml(getVideoContentUrl(video))}</video:content_loc>
      <video:player_loc>${escapeXml(getVideoEmbedUrl(video))}</video:player_loc>
      <video:duration>${VIDEO_DURATIONS_SECONDS[video.slug]}</video:duration>
      <video:publication_date>${escapeXml(publicationDate)}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
    </video:video>
  </url>`;
  }).join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${body}
</urlset>
`;
}

export function writeVideoSitemap(buildDate = new Date()) {
  const xml = renderVideoSitemapXml(buildDate);
  writeFileSync(VIDEO_SITEMAP_PATH, xml, 'utf8');
  return xml;
}

export function readVideoSitemapFile() {
  return readFileSync(VIDEO_SITEMAP_PATH, 'utf8');
}
