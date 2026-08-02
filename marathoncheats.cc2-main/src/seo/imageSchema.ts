import { IMAGE_SEO_REGISTRY, getImageAbsoluteUrl, type ImageSeoEntry } from '../content/imageSeo';
import { getImageDimensions } from '../content/imageDimensions';
import { SITE_URL } from './config';

export function buildImageObjectSchema(entry: ImageSeoEntry) {
  const dimensions = getImageDimensions(entry.path);

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `${SITE_URL}${entry.pagePath}#image-${entry.id}`,
    contentUrl: getImageAbsoluteUrl(entry.path),
    url: getImageAbsoluteUrl(entry.path),
    name: entry.title,
    caption: entry.caption,
    description: entry.caption,
    keywords: entry.keywords.join(', '),
    representativeOfPage: entry.pagePath === '/',
    inLanguage: 'en',
    ...(dimensions ? { width: dimensions.width, height: dimensions.height } : {}),
  };
}

export function buildImageGallerySchema(pagePath: string, entries: ImageSeoEntry[]) {
  if (entries.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${SITE_URL}${pagePath}#image-gallery`,
    name: 'Marathon Cheats Image Gallery',
    description: 'Screenshots and guides for Marathon ESP, aimbot, loot ESP, loader setup, and pricing on PC.',
    url: `${SITE_URL}${pagePath}`,
    associatedMedia: entries.map(entry => {
      const dimensions = getImageDimensions(entry.path);
      return {
        '@type': 'ImageObject',
        contentUrl: getImageAbsoluteUrl(entry.path),
        name: entry.title,
        caption: entry.caption,
        description: entry.caption,
        keywords: entry.keywords.join(', '),
        ...(dimensions ? { width: dimensions.width, height: dimensions.height } : {}),
      };
    }),
  };
}

export function buildHomepageImageSchemas(): Record<string, unknown>[] {
  const homeImages = IMAGE_SEO_REGISTRY.filter(entry => entry.pagePath === '/');
  const gallery = buildImageGallerySchema('/', homeImages);

  return [
    ...(gallery ? [gallery] : []),
    ...homeImages.slice(0, 8).map(buildImageObjectSchema),
  ];
}
