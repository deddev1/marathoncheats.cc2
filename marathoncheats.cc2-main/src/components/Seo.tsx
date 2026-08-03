import { useEffect } from 'react';
import { getImageDimensions } from '../content/imageDimensions';
import {
  DEFAULT_OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
  buildLocalizedCanonicalUrl,
  buildHreflangAlternates,
  parseLocalePath,
  toOgLocale,
  type SeoLocaleCode,
} from '../seo/config';

export { SITE_URL, DEFAULT_OG_IMAGE };

type SeoProps = {
  title: string;
  description: string;
  /** App path without locale prefix, e.g. `/`, `/blog` */
  path: string;
  locale?: SeoLocaleCode;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  lang?: string;
  noindex?: boolean;
  includeHomeJsonLd?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

function absoluteUrl(pathOrUrl: string) {
  return new URL(pathOrUrl, SITE_URL).toString();
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function setStaticHomeJsonLdVisible(visible: boolean) {
  document.head.querySelectorAll<HTMLScriptElement>('script[data-static-json-ld="true"]').forEach(script => {
    if (visible) {
      script.removeAttribute('data-hidden');
      script.type = 'application/ld+json';
    } else {
      script.setAttribute('data-hidden', 'true');
      script.type = 'application/ld+json+disabled';
    }
  });
}

export function Seo({
  title,
  description,
  path,
  locale,
  image = DEFAULT_OG_IMAGE,
  imageAlt = OG_IMAGE_ALT,
  type = 'website',
  lang = 'en',
  noindex = false,
  includeHomeJsonLd = false,
  publishedTime,
  modifiedTime,
  structuredData,
}: SeoProps) {
  const resolvedLocale = locale ?? parseLocalePath(path).locale;
  const appPath = path;
  const canonicalUrl = buildLocalizedCanonicalUrl(resolvedLocale, appPath);
  const imageUrl = absoluteUrl(image);
  const imageDimensions = image !== DEFAULT_OG_IMAGE ? getImageDimensions(image) : undefined;
  const ogImageWidth = imageDimensions?.width ?? OG_IMAGE_WIDTH;
  const ogImageHeight = imageDimensions?.height ?? OG_IMAGE_HEIGHT;
  const robots = noindex ? 'noindex, follow' : 'index, follow';

  useEffect(() => {
    const structuredDataItems = structuredData
      ? Array.isArray(structuredData)
        ? structuredData
        : [structuredData]
      : [];

    document.title = title;
    document.documentElement.lang = lang;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });
    upsertMeta('meta[property="og:image:secure_url"]', { property: 'og:image:secure_url', content: imageUrl });
    upsertMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: String(ogImageWidth) });
    upsertMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: String(ogImageHeight) });
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: imageAlt });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: toOgLocale(resolvedLocale) });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });
    upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: imageAlt });

    if (type === 'article' && publishedTime) {
      upsertMeta('meta[property="article:published_time"]', {
        property: 'article:published_time',
        content: publishedTime,
      });
      upsertMeta('meta[property="article:modified_time"]', {
        property: 'article:modified_time',
        content: modifiedTime ?? publishedTime,
      });
    } else {
      document.head.querySelector('meta[property="article:published_time"]')?.remove();
      document.head.querySelector('meta[property="article:modified_time"]')?.remove();
    }

    document.querySelectorAll('link[data-dynamic-hreflang="true"]').forEach(el => el.remove());
    buildHreflangAlternates(appPath).forEach(alternate => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = alternate.hreflang;
      link.href = alternate.href;
      link.dataset.dynamicHreflang = 'true';
      document.head.appendChild(link);
    });

    setStaticHomeJsonLdVisible(includeHomeJsonLd);

    document.head.querySelectorAll('script[data-route-json-ld="true"]').forEach(el => el.remove());

    structuredDataItems.forEach(item => {
      const jsonLd = document.createElement('script');
      jsonLd.type = 'application/ld+json';
      jsonLd.dataset.routeJsonLd = 'true';
      jsonLd.textContent = JSON.stringify(item);
      document.head.appendChild(jsonLd);
    });
  }, [
    appPath,
    canonicalUrl,
    description,
    imageAlt,
    imageUrl,
    includeHomeJsonLd,
    lang,
    modifiedTime,
    ogImageHeight,
    ogImageWidth,
    path,
    publishedTime,
    resolvedLocale,
    robots,
    structuredData,
    title,
    type,
  ]);

  return null;
}
