import { readFileSync } from 'node:fs';
import { buildCanonicalUrl } from '../src/seo/config';
import { SITEMAP_ROUTES } from '../src/seo/sitemapRoutes';
import {
  ROBOTS_PATH,
  SITEMAP_URL,
  buildSitemapEntries,
  formatW3cDate,
  isValidW3cDate,
  parseSitemapLastmods,
  parseSitemapLocs,
  parseW3cDate,
  readSitemapFile,
} from './sitemap-utils';

const errors: string[] = [];
const buildDate = new Date();
const buildDateW3c = formatW3cDate(buildDate);

function fail(message: string) {
  errors.push(message);
}

const expectedEntries = buildSitemapEntries(buildDate);
const expectedLocs = expectedEntries.map(entry => entry.loc);
const xml = readSitemapFile();
const actualLocs = parseSitemapLocs(xml);
const actualLastmods = parseSitemapLastmods(xml);

if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
  fail('sitemap.xml must start with an XML declaration and UTF-8 encoding.');
}

if (!xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
  fail('sitemap.xml must use the standard sitemaps.org urlset namespace.');
}

if (actualLocs.length !== expectedLocs.length) {
  fail(`sitemap.xml has ${actualLocs.length} URLs, expected ${expectedLocs.length}.`);
}

if (actualLastmods.length !== actualLocs.length) {
  fail('Every sitemap URL must include a <lastmod> value.');
}

const duplicateLocs = actualLocs.filter((loc, index) => actualLocs.indexOf(loc) !== index);
if (duplicateLocs.length > 0) {
  fail(`sitemap.xml contains duplicate URLs: ${[...new Set(duplicateLocs)].join(', ')}`);
}

expectedLocs.forEach(loc => {
  if (!actualLocs.includes(loc)) {
    fail(`sitemap.xml is missing canonical URL: ${loc}`);
  }
});

actualLocs.forEach(loc => {
  if (!loc.startsWith('https://')) {
    fail(`sitemap.xml URLs must be absolute HTTPS URLs: ${loc}`);
  }

  if (loc.includes('#')) {
    fail(`sitemap.xml must not include fragment URLs: ${loc}`);
  }

  if (loc.includes('?')) {
    fail(`sitemap.xml must not include query-string URLs: ${loc}`);
  }

  if (loc !== buildCanonicalUrl(new URL(loc).pathname)) {
    fail(`sitemap.xml URL does not match canonical format: ${loc}`);
  }
});

actualLastmods.forEach(lastmod => {
  if (!isValidW3cDate(lastmod)) {
    fail(`sitemap.xml lastmod must use W3C date format YYYY-MM-DD: ${lastmod}`);
  }

  const parsed = parseW3cDate(lastmod);
  if (!parsed) {
    fail(`sitemap.xml lastmod is not a valid calendar date: ${lastmod}`);
    return;
  }

  if (parsed.getTime() > buildDate.getTime()) {
    fail(`sitemap.xml lastmod must not be in the future: ${lastmod} (build date ${buildDateW3c})`);
  }
});

expectedEntries.forEach(entry => {
  if (!entry.lastmod) {
    fail(`Missing lastmod for ${entry.loc}`);
  }

  if (entry.lastmod > buildDateW3c) {
    fail(`Generated lastmod is in the future for ${entry.loc}: ${entry.lastmod}`);
  }
});

SITEMAP_ROUTES.forEach(route => {
  const canonical = buildCanonicalUrl(route.path);

  if (route.path === '/') {
    if (!canonical.endsWith('/')) {
      fail('Homepage canonical must keep a trailing slash.');
    }
  } else if (canonical.endsWith('/')) {
    fail(`Non-homepage canonical must not end with a trailing slash: ${canonical}`);
  }
});

const robots = readFileSync(ROBOTS_PATH, 'utf8');
if (!robots.includes(`Sitemap: ${SITEMAP_URL}`)) {
  fail(`robots.txt must reference ${SITEMAP_URL}`);
}

const unexpectedLocs = actualLocs.filter(loc => !expectedLocs.includes(loc));
if (unexpectedLocs.length > 0) {
  fail(`sitemap.xml contains unexpected URLs: ${unexpectedLocs.join(', ')}`);
}

if (errors.length > 0) {
  console.error('Sitemap validation failed:');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Sitemap validation passed for ${actualLocs.length} canonical URLs.`);
