import { readFileSync } from 'node:fs';
import { SITE_VIDEOS, getVideoContentUrl, getVideoEmbedUrl, getVideoThumbnailUrl } from '../src/content/videos';
import { VIDEO_DURATIONS_SECONDS } from '../src/content/videoMetadata.generated';
import { ROBOTS_PATH } from './sitemap-utils';
import { VIDEO_SITEMAP_URL, readVideoSitemapFile } from './video-sitemap-utils';

const errors: string[] = [];
const buildDate = new Date();
const buildDateW3c = buildDate.toISOString().slice(0, 10);

function fail(message: string) {
  errors.push(message);
}

const xml = readVideoSitemapFile();
const robots = readFileSync(ROBOTS_PATH, 'utf8');

if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
  fail('video-sitemap.xml must start with an XML declaration and UTF-8 encoding.');
}

if (!xml.includes('xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"')) {
  fail('video-sitemap.xml must declare the Google video sitemap namespace.');
}

const locMatches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const contentLocMatches = [...xml.matchAll(/<video:content_loc>([^<]+)<\/video:content_loc>/g)].map(
  match => match[1],
);
const thumbnailMatches = [...xml.matchAll(/<video:thumbnail_loc>([^<]+)<\/video:thumbnail_loc>/g)].map(
  match => match[1],
);
const durationMatches = [...xml.matchAll(/<video:duration>([^<]+)<\/video:duration>/g)].map(
  match => match[1],
);
const publicationMatches = [...xml.matchAll(/<video:publication_date>([^<]+)<\/video:publication_date>/g)].map(
  match => match[1],
);

if (locMatches.length !== SITE_VIDEOS.length) {
  fail(`video-sitemap.xml has ${locMatches.length} video pages, expected ${SITE_VIDEOS.length}.`);
}

if (contentLocMatches.length !== SITE_VIDEOS.length) {
  fail(`video-sitemap.xml must include video:content_loc for every video.`);
}

if (durationMatches.length !== SITE_VIDEOS.length) {
  fail('video-sitemap.xml must include video:duration for every video.');
}

if (!robots.includes(`Sitemap: ${VIDEO_SITEMAP_URL}`)) {
  fail(`robots.txt must reference ${VIDEO_SITEMAP_URL}`);
}

SITE_VIDEOS.forEach(video => {
  const embedUrl = getVideoEmbedUrl(video);
  const contentUrl = getVideoContentUrl(video);
  const thumbnailUrl = getVideoThumbnailUrl(video);

  if (!locMatches.includes(embedUrl)) {
    fail(`video-sitemap.xml is missing embed page URL: ${embedUrl}`);
  }

  if (!contentLocMatches.includes(contentUrl)) {
    fail(`video-sitemap.xml is missing content URL: ${contentUrl}`);
  }

  if (!thumbnailMatches.includes(thumbnailUrl)) {
    fail(`video-sitemap.xml is missing thumbnail URL: ${thumbnailUrl}`);
  }

  if (contentUrl.includes('blob:') || contentUrl.includes('localhost')) {
    fail(`video-sitemap.xml must not use blob or localhost URLs: ${contentUrl}`);
  }

  if (!contentUrl.endsWith('.mp4')) {
    fail(`video content URL must be a direct .mp4 file: ${contentUrl}`);
  }

  if (!thumbnailUrl.endsWith('.webp')) {
    fail(`video thumbnail URL must be a permanent image file: ${thumbnailUrl}`);
  }

  const expectedDuration = String(VIDEO_DURATIONS_SECONDS[video.slug]);
  if (!durationMatches.includes(expectedDuration)) {
    fail(`video-sitemap.xml must include duration ${expectedDuration} for ${video.slug}.`);
  }
});

publicationMatches.forEach(dateValue => {
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    fail(`video-sitemap.xml publication_date must be valid ISO 8601: ${dateValue}`);
    return;
  }

  if (parsed.toISOString().slice(0, 10) > buildDateW3c) {
    fail(`video-sitemap.xml publication_date must not be in the future: ${dateValue}`);
  }
});

if (errors.length > 0) {
  console.error('Video sitemap validation failed:');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Video sitemap validation passed for ${SITE_VIDEOS.length} videos.`);
