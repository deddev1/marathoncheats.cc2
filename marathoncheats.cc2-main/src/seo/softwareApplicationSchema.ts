import { PRICING_PLANS } from '../content/pricingPlans';
import { DEFAULT_OG_IMAGE, ROUTE_SEO, SITE_NAME, SITE_URL } from './config';

/** Matches on-page testimonial count for aggregateRating.reviewCount. */
export const SOFTWARE_REVIEW_COUNT = 9;

const SOFTWARE_FEATURE_LIST = [
  'Marathon ESP',
  'Marathon Player ESP',
  'Marathon Loot ESP',
  'Marathon Item ESP',
  'Marathon Aimbot',
  'Marathon Wallhack',
  'Marathon Radar',
  'No Recoil Control',
  'External Cheat Loader',
  'Cloud DMA Option',
] as const;

export type SoftwareApplicationSchemaOptions = {
  /** Canonical page URL for this schema instance. */
  url?: string;
  description?: string;
};

/**
 * Invisible JSON-LD for software product pages — rich results for Marathon Cheats.
 * Includes SoftwareApplication, aggregateRating, USD offers, and Windows OS.
 */
export function buildSoftwareApplicationSchema(options: SoftwareApplicationSchemaOptions = {}) {
  const pageUrl = options.url ?? `${SITE_URL}${ROUTE_SEO.store.path}`;
  const description =
    options.description ??
    'Marathon Cheats for PC with external ESP, aimbot, wallhack, player ESP, loot ESP, radar, recoil control, and loader updates for Steam on Windows.';

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    url: pageUrl,
    image: DEFAULT_OG_IMAGE,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Windows',
    description,
    featureList: [...SOFTWARE_FEATURE_LIST],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: String(SOFTWARE_REVIEW_COUNT),
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: String(PRICING_PLANS.monthly.price),
      highPrice: String(PRICING_PLANS.lifetime.price),
      priceCurrency: 'USD',
      offerCount: '2',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${ROUTE_SEO.store.path}`,
    },
  };
}
