import { SITE_URL } from './config';
import {
  DEFAULT_SEO_LOCALE,
  SEO_LOCALES,
  type SeoLocaleCode,
  getSeoLocale,
  getSeoLocaleSegment,
  isPrefixedLocaleSegment,
  localeUsesUrlPrefix,
} from './locales';

export type ParsedLocalePath = {
  locale: SeoLocaleCode;
  /** App path without locale prefix, e.g. `/`, `/blog`, `/blog/slug` */
  path: string;
};

/** Normalize an app path (no locale prefix). Home is `/`. */
export function normalizeAppPath(path: string): string {
  if (!path || path === '/') return '/';
  const trimmed = path.replace(/\/+$/, '') || '/';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

/** Split a URL pathname into SEO locale + app path. */
export function parseLocalePath(pathname: string): ParsedLocalePath {
  const raw = pathname === '/' ? '/' : pathname.replace(/\/+$/, '') || '/';
  const segments = raw.split('/').filter(Boolean);

  if (segments.length > 0 && isPrefixedLocaleSegment(segments[0])) {
    const locale = getSeoLocale(segments[0])!.code;
    const rest = segments.slice(1).join('/');
    return { locale, path: rest ? `/${rest}` : '/' };
  }

  return { locale: DEFAULT_SEO_LOCALE, path: normalizeAppPath(raw) };
}

/** Build a localized pathname. English: `/`, `/blog`. Others: `/de/`, `/de/blog`. */
export function buildLocalizedPath(locale: SeoLocaleCode, appPath: string): string {
  const normalized = normalizeAppPath(appPath);

  if (!localeUsesUrlPrefix(locale)) {
    return normalized;
  }

  const segment = getSeoLocaleSegment(locale);
  if (normalized === '/') return `/${segment}/`;
  return `/${segment}${normalized}`;
}

/** Absolute canonical URL for a locale + app path. */
export function buildLocalizedCanonicalUrl(locale: SeoLocaleCode, appPath: string): string {
  return new URL(buildLocalizedPath(locale, appPath), SITE_URL).toString();
}

export type HreflangAlternate = {
  hreflang: string;
  href: string;
};

/** hreflang alternates for an app path across all SEO locales, plus x-default. */
export function buildHreflangAlternates(appPath: string): HreflangAlternate[] {
  const alternates: HreflangAlternate[] = SEO_LOCALES.map(locale => ({
    hreflang: locale.hreflang,
    href: buildLocalizedCanonicalUrl(locale.code, appPath),
  }));

  alternates.push({
    hreflang: 'x-default',
    href: buildLocalizedCanonicalUrl(DEFAULT_SEO_LOCALE, appPath),
  });

  return alternates;
}

/** Paths that must never be rewritten (SEO files, static assets). */
export const LOCALE_REDIRECT_EXCLUDED_EXACT = new Set([
  '/robots.txt',
  '/sitemap-index.xml',
  '/sitemap.xml',
  '/video-sitemap.xml',
  '/image-sitemap.xml',
  '/manifest.json',
]);

export const LOCALE_REDIRECT_EXCLUDED_PREFIXES = ['/assets/', '/_astro/', '/images/', '/videos/'] as const;

function hasStaticFileExtension(pathname: string) {
  return /\.[a-z0-9]+$/i.test(pathname);
}

/** Canonical SEO asset paths (no trailing slash). */
export const SEO_ASSET_PATHS = new Set([
  '/robots.txt',
  '/sitemap-index.xml',
  '/sitemap.xml',
  '/video-sitemap.xml',
  '/image-sitemap.xml',
]);

/** True for build assets and media that must never be locale-redirected. */
export function isStaticAssetPath(pathname: string): boolean {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '') || '/';

  if (SEO_ASSET_PATHS.has(normalized)) return true;
  if (normalized.startsWith('/assets/') || normalized.startsWith('/_astro/')) return true;
  if (normalized.startsWith('/favicon')) return true;
  if (normalized.startsWith('/images/')) return true;

  if (normalized.startsWith('/videos/') && hasStaticFileExtension(normalized)) {
    return true;
  }

  return false;
}

export function shouldSkipLocaleRedirect(pathname: string): boolean {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '') || '/';

  if (LOCALE_REDIRECT_EXCLUDED_EXACT.has(normalized)) return true;
  if (LOCALE_REDIRECT_EXCLUDED_PREFIXES.some(prefix => normalized.startsWith(prefix))) return true;
  if (hasStaticFileExtension(normalized)) return true;

  return false;
}

/**
 * Redirect /en and /en/* to unprefixed English URLs (/ and /*).
 * Used by the Cloudflare worker and client router.
 */
export function buildEnPrefixStripRedirect(pathname: string, search = ''): string | null {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '') || '/';

  if (normalized === '/en') {
    return new URL(`/${search}`, SITE_URL).toString();
  }

  if (normalized.startsWith('/en/')) {
    const stripped = normalized.slice(3) || '/';
    const destination = stripped.startsWith('/') ? stripped : `/${stripped}`;
    return new URL(`${destination}${search}`, SITE_URL).toString();
  }

  return null;
}

/**
 * Redirect path variants that do not match canonical URL rules:
 * - Locale homes: /de -> /de/
 * - Content pages: /blog/ -> /blog, /de/blog/ -> /de/blog
 */
export function buildCanonicalPathRedirect(pathname: string, search = ''): string | null {
  if (shouldSkipLocaleRedirect(pathname) || isStaticAssetPath(pathname)) return null;

  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '') || '/';

  if (normalized === '/en' || normalized.startsWith('/en/')) {
    return null;
  }

  const segments = normalized.split('/').filter(Boolean);

  if (
    segments.length === 1 &&
    isPrefixedLocaleSegment(segments[0]) &&
    !pathname.endsWith('/')
  ) {
    return new URL(`/${segments[0]}/${search}`, SITE_URL).toString();
  }

  if (pathname.endsWith('/') && pathname !== '/') {
    const { path } = parseLocalePath(pathname);
    if (path !== '/') {
      const withoutSlash = pathname.replace(/\/$/, '') || '/';
      return new URL(`${withoutSlash}${search}`, SITE_URL).toString();
    }
  }

  return null;
}

/** Redirect trailing-slash SEO assets to canonical paths, e.g. /sitemap.xml/ -> /sitemap.xml */
export function buildSeoAssetTrailingSlashRedirect(pathname: string, search = ''): string | null {
  if (!pathname.endsWith('/') || pathname === '/') return null;

  const withoutSlash = pathname.replace(/\/$/, '') || '/';
  if (!SEO_ASSET_PATHS.has(withoutSlash)) return null;

  return new URL(`${withoutSlash}${search}`, SITE_URL).toString();
}

/** @deprecated Use buildEnPrefixStripRedirect */
export function buildLegacyLocaleRedirect(pathname: string, search = ''): string | null {
  return buildEnPrefixStripRedirect(pathname, search);
}
