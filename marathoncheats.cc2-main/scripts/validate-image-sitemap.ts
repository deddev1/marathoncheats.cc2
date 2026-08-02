import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { IMAGE_SEO_REGISTRY } from '../src/content/imageSeo';
import { ROBOTS_PATH } from './sitemap-utils';
import { IMAGE_SITEMAP_URL, readImageSitemapFile } from './image-sitemap-utils';

function fail(message: string): never {
  console.error(`Image sitemap validation failed. ${message}`);
  process.exit(1);
}

const xml = readImageSitemapFile();

if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
  fail('image-sitemap.xml must start with an XML declaration and UTF-8 encoding.');
}

if (!xml.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"')) {
  fail('image-sitemap.xml must declare the Google image sitemap namespace.');
}

const locMatches = [...xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)];
const imageUrls = locMatches.map(match => match[1]);

if (imageUrls.length !== IMAGE_SEO_REGISTRY.length) {
  fail(`image-sitemap.xml has ${imageUrls.length} images, expected ${IMAGE_SEO_REGISTRY.length}.`);
}

IMAGE_SEO_REGISTRY.forEach(entry => {
  const expectedUrl = `https://marathoncheats.cc${entry.path}`;
  if (!imageUrls.includes(expectedUrl)) {
    fail(`Missing image URL in sitemap: ${expectedUrl}`);
  }

  const publicPath = join(process.cwd(), 'public', entry.path.replace(/^\//, ''));
  if (!existsSync(publicPath)) {
    fail(`Image file missing on disk: ${entry.path}`);
  }
});

const robots = readFileSync(ROBOTS_PATH, 'utf8');
if (!robots.includes(IMAGE_SITEMAP_URL)) {
  fail(`robots.txt must reference ${IMAGE_SITEMAP_URL}`);
}

console.log(`Image sitemap validation passed for ${IMAGE_SEO_REGISTRY.length} images.`);
