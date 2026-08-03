import { SITE_URL } from './config';
import {
  DEFAULT_SEO_LOCALE,
  SEO_LOCALES,
  type SeoLocaleCode,
  getSeoLocale,
  getSeoLocaleSegment,
  isSeoLocaleSegment,
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

  if (segments.length > 0 && isSeoLocaleSegment(segments[0])) {
    const locale = getSeoLocale(segments[0])!.code;
    const rest = segments.slice(1).join('/');
    return { locale, path: rest ? `/${rest}` : '/' };
  }

  return { locale: DEFAULT_SEO_LOCALE, path: normalizeAppPath(raw) };
}

/** Build a localized pathname, e.g. `/de/blog`. Home uses a trailing slash: `/en/`. */
export function buildLocalizedPath(locale: SeoLocaleCode, appPath: string): string {
  const segment = getSeoLocaleSegment(locale);
  const normalized = normalizeAppPath(appPath);
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

/**
 * Returns a canonical /en/... destination when the request path has no locale prefix.
 * Used by the Cloudflare worker for 301 redirects.
 */
export function buildLegacyLocaleRedirect(pathname: string, search = ''): string | null {
  const firstSegment = pathname.split('/').filter(Boolean)[0]?.toLowerCase() ?? '';

  if (firstSegment && isSeoLocaleSegment(firstSegment)) {
    return null;
  }

  const appPath = normalizeAppPath(pathname);
  return buildLocalizedCanonicalUrl(DEFAULT_SEO_LOCALE, appPath) + search;
}
