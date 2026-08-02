import { SITE_NAME, SITE_URL } from './config';

export type BreadcrumbItem = {
  name: string;
  /** App path, e.g. `/`, `/#features`, `/#aimbot` */
  path: string;
};

/** Home > Marathon Cheats > Features */
export const FEATURES_BREADCRUMB: readonly BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: SITE_NAME, path: '/' },
  { name: 'Features', path: '/#features' },
] as const;

/** Home > Marathon Cheats > Features > Aimbot */
export const AIMBOT_BREADCRUMB: readonly BreadcrumbItem[] = [
  ...FEATURES_BREADCRUMB,
  { name: 'Aimbot', path: '/#aimbot' },
] as const;

/** SEO: absolute URL for each breadcrumb step (hash anchors included). */
export function buildBreadcrumbUrl(path: string) {
  if (path === '/') return SITE_URL;
  return `${SITE_URL}${path}`;
}

/**
 * JSON-LD BreadcrumbList — invisible to users, helps search engines understand site hierarchy.
 */
export function buildBreadcrumbJsonLd(items: readonly BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildBreadcrumbUrl(item.path),
    })),
  };
}

/** Stable id for section-scoped JSON-LD script tags. */
export function getBreadcrumbScriptId(items: readonly BreadcrumbItem[]) {
  const leaf = items[items.length - 1]?.path.replace(/[^a-z0-9]+/gi, '-') ?? 'root';
  return `breadcrumb-jsonld-${leaf}`;
}
