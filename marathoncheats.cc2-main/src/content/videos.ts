import { SITE_URL } from '../seo/config';

export type SiteVideo = {
  slug: string;
  filename: string;
  thumbnailFilename: string;
  name: string;
  description: string;
  /** ISO 8601 publication date for schema and video sitemap metadata. */
  publicationDate: string;
  /** Fallback duration in seconds when ffprobe and video-metadata.json are unavailable. */
  durationSeconds: number;
  /** Primary page where the video is embedded (used for embedUrl in schema). */
  embedPath: string;
  /** Repo files used to derive sitemap lastmod from file mtime. */
  sourceFiles: string[];
};

export const SITE_VIDEOS = [
  {
    slug: 'marathon-hero-demo',
    filename: 'marathon-hero-demo.mp4',
    thumbnailFilename: 'marathon-hero-demo-thumbnail.webp',
    name: 'Marathon Hero Gameplay Demo',
    description:
      'Gameplay footage of Marathon Cheats on PC showing ESP overlays, raid movement, and external loader presentation.',
    publicationDate: '2026-07-21T22:30:08.000Z',
    durationSeconds: 32,
    embedPath: '/',
    sourceFiles: [
      'public/videos/marathon-hero-demo.mp4',
      'public/images/marathon-hero-demo-thumbnail.webp',
      'src/components/HeroSection.tsx',
    ],
  },
  {
    slug: 'marathon-feature-demo',
    filename: 'marathon-feature-demo.mp4',
    thumbnailFilename: 'marathon-feature-demo-thumbnail.webp',
    name: 'Marathon ESP & Aimbot Feature Demo',
    description:
      'Feature walkthrough of Marathon Cheats showing ESP, aimbot, loot highlights, and in-game overlay behavior on the store page.',
    publicationDate: '2026-07-21T22:30:11.000Z',
    durationSeconds: 20,
    embedPath: '/marathoncheats-buy',
    sourceFiles: [
      'public/videos/marathon-feature-demo.mp4',
      'public/images/marathon-feature-demo-thumbnail.webp',
      'src/components/FeatureShowcaseGallery.tsx',
    ],
  },
] as const satisfies readonly SiteVideo[];

export type SiteVideoSlug = (typeof SITE_VIDEOS)[number]['slug'];

export function getSiteVideo(slug: string) {
  return SITE_VIDEOS.find(video => video.slug === slug);
}

export function getVideoContentPath(video: SiteVideo) {
  return `/videos/${video.filename}`;
}

export function getVideoThumbnailPath(video: SiteVideo) {
  return `/images/${video.thumbnailFilename}`;
}

/** Legacy watch-page path — 301-redirected to `embedPath` in the worker. */
export function getVideoWatchPath(video: SiteVideo) {
  return `/videos/${video.slug}`;
}

export function getVideoEmbedPath(video: SiteVideo) {
  return video.embedPath;
}

export function getVideoContentUrl(video: SiteVideo) {
  return `${SITE_URL}${getVideoContentPath(video)}`;
}

export function getVideoThumbnailUrl(video: SiteVideo) {
  return `${SITE_URL}${getVideoThumbnailPath(video)}`;
}

/** Canonical page URL where the video is embedded and played. */
export function getVideoEmbedUrl(video: SiteVideo) {
  return `${SITE_URL}${getVideoEmbedPath(video)}`;
}

/** @deprecated Use getVideoEmbedUrl — watch pages redirect to embed pages. */
export function getVideoWatchUrl(video: SiteVideo) {
  return getVideoEmbedUrl(video);
}
