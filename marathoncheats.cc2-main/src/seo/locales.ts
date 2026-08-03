/** Supported SEO locales — each has a dedicated URL prefix for hreflang indexing. */
export const SEO_LOCALES = [
  { code: 'en', segment: 'en', hreflang: 'en', ogLocale: 'en_US', i18n: 'en' },
  { code: 'de', segment: 'de', hreflang: 'de', ogLocale: 'de_DE', i18n: 'de' },
  { code: 'fr', segment: 'fr', hreflang: 'fr', ogLocale: 'fr_FR', i18n: 'fr' },
  { code: 'es', segment: 'es', hreflang: 'es', ogLocale: 'es_ES', i18n: 'es' },
  { code: 'pt', segment: 'pt', hreflang: 'pt', ogLocale: 'pt_BR', i18n: 'pt' },
  { code: 'ja', segment: 'ja', hreflang: 'ja', ogLocale: 'ja_JP', i18n: 'ja' },
  { code: 'ko', segment: 'ko', hreflang: 'ko', ogLocale: 'ko_KR', i18n: 'ko' },
  { code: 'tr', segment: 'tr', hreflang: 'tr', ogLocale: 'tr_TR', i18n: 'tr' },
  { code: 'pl', segment: 'pl', hreflang: 'pl', ogLocale: 'pl_PL', i18n: 'pl' },
  { code: 'it', segment: 'it', hreflang: 'it', ogLocale: 'it_IT', i18n: 'it' },
  { code: 'nl', segment: 'nl', hreflang: 'nl', ogLocale: 'nl_NL', i18n: 'nl' },
  { code: 'zh-CN', segment: 'zh-cn', hreflang: 'zh-CN', ogLocale: 'zh_CN', i18n: 'zh' },
  { code: 'sv', segment: 'sv', hreflang: 'sv', ogLocale: 'sv_SE', i18n: 'en' },
  { code: 'ru', segment: 'ru', hreflang: 'ru', ogLocale: 'ru_RU', i18n: 'ru' },
  { code: 'id', segment: 'id', hreflang: 'id', ogLocale: 'id_ID', i18n: 'en' },
] as const;

export type SeoLocaleCode = (typeof SEO_LOCALES)[number]['code'];

export const DEFAULT_SEO_LOCALE: SeoLocaleCode = 'en';

/** English uses unprefixed URLs (/blog). Other locales use /{segment}/blog. */
export function localeUsesUrlPrefix(code: SeoLocaleCode): boolean {
  return code !== DEFAULT_SEO_LOCALE;
}

export const SEO_LOCALE_CODES = SEO_LOCALES.map(locale => locale.code) as SeoLocaleCode[];

const segmentByCode = new Map(SEO_LOCALES.map(locale => [locale.code, locale.segment]));
const codeBySegment = new Map(SEO_LOCALES.map(locale => [locale.segment, locale.code]));
const localeByCode = new Map(SEO_LOCALES.map(locale => [locale.code, locale]));

export function getSeoLocale(segmentOrCode: string): (typeof SEO_LOCALES)[number] | undefined {
  const normalized = segmentOrCode.toLowerCase();
  return localeByCode.get(normalized as SeoLocaleCode) ?? SEO_LOCALES.find(locale => locale.segment === normalized);
}

export function getSeoLocaleSegment(code: SeoLocaleCode): string {
  return segmentByCode.get(code) ?? code.toLowerCase();
}

export function isSeoLocaleSegment(segment: string): boolean {
  return codeBySegment.has(segment.toLowerCase() as (typeof SEO_LOCALES)[number]['segment']);
}

/** Locale URL prefix segments excluding English (en is default at /). */
export function isPrefixedLocaleSegment(segment: string): boolean {
  const normalized = segment.toLowerCase();
  if (normalized === 'en') return false;
  return isSeoLocaleSegment(normalized);
}

export function i18nToSeoLocale(i18nCode: string): SeoLocaleCode | undefined {
  const match = SEO_LOCALES.find(locale => locale.i18n === i18nCode);
  return match?.code;
}

export function seoLocaleToI18n(code: SeoLocaleCode): string {
  return getSeoLocale(code)?.i18n ?? 'en';
}

export function toOgLocaleFromSeo(code: SeoLocaleCode): string {
  return getSeoLocale(code)?.ogLocale ?? 'en_US';
}
