export { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT, OG_IMAGE_ALT, DISCORD_URL } from './siteConstants';
export { SEO_LOCALES, SEO_LOCALE_CODES, DEFAULT_SEO_LOCALE, type SeoLocaleCode } from './locales';
export { HOME_SEO } from './localized/homeSeo';
export { LOCALIZED_ROUTE_SEO, ROUTE_PATHS, getRouteSeo, type RouteSeoKey } from './localized/routeSeo';
export { BLOG_POST_SEO, getBlogPostSeo, buildBlogPostTitle } from './localized/blogSeo';
export { buildLocalizedCanonicalUrl, buildLocalizedPath, buildHreflangAlternates, parseLocalePath } from './localePaths';
export { toOgLocaleFromSeo as toOgLocale } from './locales';

import { buildLocalizedCanonicalUrl } from './localePaths';
import { DEFAULT_SEO_LOCALE } from './locales';
import { ROUTE_PATHS, getRouteSeo } from './localized/routeSeo';

/** Backward-compatible ROUTE_SEO (English paths + English meta). */
export const ROUTE_SEO = {
  store: { ...getRouteSeo('store', 'en'), path: ROUTE_PATHS.store },
  blog: { ...getRouteSeo('blog', 'en'), path: ROUTE_PATHS.blog },
  terms: { ...getRouteSeo('terms', 'en'), path: ROUTE_PATHS.terms },
  privacy: { ...getRouteSeo('privacy', 'en'), path: ROUTE_PATHS.privacy },
  refund: { ...getRouteSeo('refund', 'en'), path: ROUTE_PATHS.refund },
  notFound: { ...getRouteSeo('notFound', 'en'), path: ROUTE_PATHS.notFound },
} as const;

/** Build canonical URL for an app path in the default locale (legacy helper). */
export function buildCanonicalUrl(path: string, locale = DEFAULT_SEO_LOCALE) {
  return buildLocalizedCanonicalUrl(locale, path === '/' ? '/' : path.replace(/\/$/, '') || '/');
}
