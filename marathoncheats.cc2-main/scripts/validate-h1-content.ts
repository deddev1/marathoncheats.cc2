import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { BLOG_POSTS } from '../src/content/blogPosts';
import {
  BLOG_LIST_HEADING,
  HOME_PAGE_HEADING,
  LEGAL_PAGE_HEADINGS,
  STORE_PAGE_HEADING,
  getMissingH1Words,
} from '../src/seo/pageHeadings';
import { ROUTE_SEO } from '../src/seo/config';
import { SEO_LOCALES, localeUsesUrlPrefix } from '../src/seo/locales';
import { buildLocalizedPath } from '../src/seo/localePaths';

type HeadingCase = {
  name: string;
  file: string;
  h1: string;
};

const distDir = join(process.cwd(), 'dist');
const prefixedLocaleSegments = new Set(
  SEO_LOCALES.filter(locale => localeUsesUrlPrefix(locale.code)).map(locale => locale.segment),
);

const englishRouteDirs = new Set([
  '',
  'blog',
  'marathoncheats-buy',
  'terms',
  'privacy',
  'refund',
  ...BLOG_POSTS.map(post => `blog/${post.slug}`),
]);

function distPathFor(appPath: string) {
  const localized = buildLocalizedPath('en', appPath);
  const relative = localized === '/' ? '' : localized.replace(/^\//, '');
  return join(distDir, relative, 'index.html');
}

function shouldCountPrerenderFile(relativeDir: string) {
  const firstSegment = relativeDir.split('/').filter(Boolean)[0];
  if (firstSegment && prefixedLocaleSegments.has(firstSegment)) return true;
  return englishRouteDirs.has(relativeDir);
}

function collectHtmlFiles(dir: string, relativeDir = '', files: string[] = []): string[] {
  if (!existsSync(dir)) {
    return files;
  }

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      const nextRelative = relativeDir ? `${relativeDir}/${entry}` : entry;
      collectHtmlFiles(fullPath, nextRelative, files);
      continue;
    }
    if (entry === 'index.html' && shouldCountPrerenderFile(relativeDir)) {
      files.push(fullPath);
    }
  }
  return files;
}

function decodeHtmlEntities(text: string) {
  return text
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"');
}

function extractTagContent(html: string, tag: string) {
  const pattern = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const raw = html.match(pattern)?.[1]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ?? '';
  return decodeHtmlEntities(raw);
}

const englishHeadingCases: HeadingCase[] = [
  { name: 'home', file: distPathFor('/'), h1: HOME_PAGE_HEADING.h1 },
  { name: 'store', file: distPathFor('/marathoncheats-buy'), h1: STORE_PAGE_HEADING.h1 },
  { name: 'blog', file: distPathFor('/blog'), h1: BLOG_LIST_HEADING.h1 },
  { name: 'terms', file: distPathFor('/terms'), h1: LEGAL_PAGE_HEADINGS.terms.h1 },
  { name: 'privacy', file: distPathFor('/privacy'), h1: LEGAL_PAGE_HEADINGS.privacy.h1 },
  { name: 'refund', file: distPathFor('/refund'), h1: LEGAL_PAGE_HEADINGS.refund.h1 },
  ...BLOG_POSTS.map(post => ({
    name: `blog/${post.slug}`,
    file: distPathFor(`/blog/${post.slug}`),
    h1: post.title,
  })),
];

const errors: string[] = [];

if (!existsSync(distDir)) {
  console.error('H1 content validation failed: dist/ is missing. Run `vite build` and `npm run prerender` first.');
  process.exit(1);
}

englishHeadingCases.forEach(testCase => {
  if (!existsSync(testCase.file)) {
    errors.push(`${testCase.name}: prerendered HTML not found at ${testCase.file}`);
    return;
  }

  const html = readFileSync(testCase.file, 'utf8');
  const h1 = extractTagContent(html, 'h1');
  const mainText = extractTagContent(html, 'main');

  if (!h1) {
    errors.push(`${testCase.name}: missing <h1> in prerendered HTML`);
    return;
  }

  if (h1 !== testCase.h1) {
    errors.push(`${testCase.name}: expected H1 "${testCase.h1}", got "${h1}"`);
  }

  const missing = getMissingH1Words(testCase.h1, mainText);
  if (missing.length > 0) {
    errors.push(`${testCase.name}: H1 words missing from page text: ${missing.join(', ')}`);
  }
});

const prerenderedCount = collectHtmlFiles(distDir).length;
const routesPerLocale = englishHeadingCases.length;
const expectedCount = routesPerLocale * SEO_LOCALES.length;
if (prerenderedCount !== expectedCount) {
  errors.push(`Expected ${expectedCount} prerendered pages, found ${prerenderedCount}.`);
}

if (!ROUTE_SEO.store.path.startsWith('/')) {
  errors.push('Store path must be absolute for sitemap consistency.');
}

if (errors.length > 0) {
  console.error('H1 content validation failed:');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`H1 content validation passed for ${englishHeadingCases.length} English prerendered pages (${prerenderedCount} total locale pages).`);
