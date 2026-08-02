import {
  getSiteVideo,
  getVideoContentUrl,
  getVideoEmbedUrl,
  getVideoThumbnailUrl,
  type SiteVideo,
} from '../content/videos';
import { SITE_NAME, SITE_URL } from '../seo/config';
import { VIDEO_DURATIONS_SECONDS, VIDEO_UPLOAD_DATES_ISO } from '../content/videoMetadata.generated';

const PUBLISHER_LOGO_URL = `${SITE_URL}/og-google-preview.png`;

export function formatVideoDuration(seconds: number) {
  const safeSeconds = Math.max(1, Math.round(seconds));
  return `PT${safeSeconds}S`;
}

export function buildVideoObjectJsonLd(
  video: SiteVideo,
  options?: { uploadDate?: string; durationSeconds?: number },
) {
  const uploadDate = options?.uploadDate ?? VIDEO_UPLOAD_DATES_ISO[video.slug];
  const durationSeconds = options?.durationSeconds ?? VIDEO_DURATIONS_SECONDS[video.slug];
  const embedUrl = getVideoEmbedUrl(video);

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${embedUrl}#video`,
    name: video.name,
    description: video.description,
    thumbnailUrl: [getVideoThumbnailUrl(video)],
    uploadDate,
    duration: formatVideoDuration(durationSeconds),
    contentUrl: getVideoContentUrl(video),
    embedUrl,
    url: embedUrl,
    inLanguage: 'en',
    isFamilyFriendly: true,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: PUBLISHER_LOGO_URL,
        width: 1024,
        height: 1024,
      },
    },
  };
}

export function buildVideoObjectJsonLdBySlug(
  slug: string,
  options?: { uploadDate?: string; durationSeconds?: number },
) {
  const video = getSiteVideo(slug);
  if (!video) return undefined;
  return buildVideoObjectJsonLd(video, options);
}
