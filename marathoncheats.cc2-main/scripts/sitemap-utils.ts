import { execSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { buildLocalizedCanonicalUrl, buildHreflangAlternates } from '../src/seo/localePaths';
import { SITE_URL } from '../src/seo/config';
import { DEFAULT_SEO_LOCALE, type SeoLocaleCode } from '../src/seo/locales';
import { SITEMAP_ROUTES, type SitemapRoute } from '../src/seo/sitemapRoutes';

export const SITEMAP_PATH = join(process.cwd(), 'public', 'sitemap.xml');
export const SITEMAP_INDEX_PATH = join(process.cwd(), 'public', 'sitemap-index.xml');
export const ROBOTS_PATH = join(process.cwd(), 'public', 'robots.txt');
export const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
export const SITEMAP_INDEX_URL = `${SITE_URL}/sitemap-index.xml`;
export const VIDEO_SITEMAP_URL = `${SITE_URL}/video-sitemap.xml`;
export const IMAGE_SITEMAP_URL = `${SITE_URL}/image-sitemap.xml`;

const W3C_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

/** UTC calendar date in W3C format (YYYY-MM-DD). */
export function formatW3cDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function parseW3cDate(value: string) {
  if (!W3C_DATE_PATTERN.test(value)) return undefined;

  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export function isValidW3cDate(value: string) {
  const parsed = parseW3cDate(value);
  return parsed ? formatW3cDate(parsed) === value : false;
}

/** Never emit a lastmod after the sitemap build date. */
export function clampToBuildDate(date: Date, buildDate: Date) {
  return date.getTime() > buildDate.getTime() ? buildDate : date;
}

export function getFileModifiedDate(filePath: string): Date | undefined {
  try {
    const stats = statSync(join(process.cwd(), filePath));
    return stats.mtime;
  } catch {
    return undefined;
  }
}

export function getGitLastModifiedDate(filePath: string): Date | undefined {
  try {
    const output = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    if (!output) return undefined;

    const parsed = new Date(output);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  } catch {
    return undefined;
  }
}

export function resolveSourceLastmod(sourceFiles: string[], buildDate: Date): Date {
  const candidates: Date[] = [];

  for (const file of sourceFiles) {
    const fileMtime = getFileModifiedDate(file);
    if (fileMtime) candidates.push(fileMtime);

    const gitDate = getGitLastModifiedDate(file);
    if (gitDate) candidates.push(gitDate);
  }

  if (candidates.length === 0) return buildDate;

  const latest = new Date(Math.max(...candidates.map(date => date.getTime())));
  return clampToBuildDate(latest, buildDate);
}

export function resolveRouteLastmod(route: SitemapRoute, buildDate: Date) {
  return formatW3cDate(resolveSourceLastmod(route.sourceFiles, buildDate));
}

export type SitemapEntry = {
  appPath: string;
  locale: SeoLocaleCode;
  loc: string;
  lastmod: string;
  alternates: ReturnType<typeof buildHreflangAlternates>;
};

export function buildSitemapEntries(buildDate = new Date()): SitemapEntry[] {
  return SITEMAP_ROUTES.map(route => ({
    appPath: route.path,
    locale: DEFAULT_SEO_LOCALE,
    loc: buildLocalizedCanonicalUrl(DEFAULT_SEO_LOCALE, route.path),
    lastmod: resolveRouteLastmod(route, buildDate),
    alternates: buildHreflangAlternates(route.path),
  }));
}

export function renderSitemapXml(entries: SitemapEntry[]) {
  const body = entries
    .map(entry => {
      const lines = [
        `  <url>`,
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        `    <lastmod>${entry.lastmod}</lastmod>`,
      ];

      entry.alternates.forEach(alternate => {
        lines.push(
          `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.hreflang)}" href="${escapeXml(alternate.href)}" />`,
        );
      });

      lines.push(`  </url>`);
      return lines.join('\n');
    })
    .join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`;
}

export function parseSitemapLocs(xml: string) {
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  return matches.map(match => match[1]);
}

export function parseSitemapLastmods(xml: string) {
  const matches = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)];
  return matches.map(match => match[1]);
}

export function readSitemapFile() {
  return readFileSync(SITEMAP_PATH, 'utf8');
}

export function renderSitemapIndexXml(buildDate = new Date()) {
  const lastmod = formatW3cDate(buildDate);
  const sitemaps = [SITEMAP_URL, VIDEO_SITEMAP_URL, IMAGE_SITEMAP_URL];
  const body = sitemaps
    .map(
      loc =>
        `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`,
    )
    .join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}
