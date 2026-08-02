import { execSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { buildCanonicalUrl, SITE_URL } from '../src/seo/config';
import { SITEMAP_ROUTES, type SitemapRoute } from '../src/seo/sitemapRoutes';

export const SITEMAP_PATH = join(process.cwd(), 'public', 'sitemap.xml');
export const ROBOTS_PATH = join(process.cwd(), 'public', 'robots.txt');
export const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

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

export function buildSitemapEntries(buildDate = new Date()) {
  return SITEMAP_ROUTES.map(route => {
    const loc = buildCanonicalUrl(route.path);
    const lastmod = resolveRouteLastmod(route, buildDate);

    return {
      path: route.path,
      loc,
      lastmod,
    };
  });
}

export function renderSitemapXml(entries: ReturnType<typeof buildSitemapEntries>) {
  const body = entries
    .map(entry => {
      const lines = [
        `  <url>`,
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        `    <lastmod>${entry.lastmod}</lastmod>`,
      ];

      lines.push(`  </url>`);
      return lines.join('\n');
    })
    .join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
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
