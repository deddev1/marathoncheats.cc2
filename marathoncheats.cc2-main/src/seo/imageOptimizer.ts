import { getImageSeoOrFallback } from '../content/imageSeo';
import { getImageDimensions } from '../content/imageDimensions';
import { SITE_NAME } from './config';

/** Nearby copy used when registry/fallback alt text is missing or too short. */
export type ImageContext = {
  heading?: string;
  label?: string;
  caption?: string;
  title?: string;
};

export type OptimizeImageOptions = {
  src: string;
  /** Explicit alt — wins over registry when set (for contextual sections). */
  alt?: string;
  /** Manual alt when registry has no entry. */
  fallbackAlt?: string;
  /** Heading, label, or caption near the image for alt generation. */
  context?: ImageContext;
  /** Above-fold hero/LCP images should set priority to avoid lazy-load delay. */
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  /** Treat as decorative (empty alt). Parent must expose an accessible name. */
  decorative?: boolean;
  width?: number;
  height?: number;
};

export type OptimizedImageSources = {
  /** Original or best fallback format (png/jpeg/webp). */
  fallback: string;
  /** WebP variant when available — smaller payload for supporting browsers. */
  webp?: string;
};

export type OptimizedImageProps = {
  alt: string;
  title?: string;
  loading: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding: 'async';
  width?: number;
  height?: number;
  sources: OptimizedImageSources;
};

const SITE_PREFIX = 'Bungie Marathon';
const GENERIC_UUID_ALT =
  'Bungie Marathon gameplay screenshot from official press materials';

function stripQuery(path: string) {
  return path.split('?')[0] ?? path;
}

function basename(path: string) {
  const clean = stripQuery(path);
  return clean.split('/').pop() ?? clean;
}

/**
 * SEO: descriptive alt text from kebab-case filenames when no registry entry exists.
 * Example: blog-loot-esp.webp → "Bungie Marathon Blog Loot Esp"
 */
export function generateAltFromFilename(path: string): string {
  const file = basename(path);
  const base = file.replace(/\.[^.]+$/i, '');

  if (/^image-[a-f0-9-]+$/i.test(base)) {
    return GENERIC_UUID_ALT;
  }

  const words = base
    .replace(/[_]+/g, '-')
    .split('-')
    .filter(word => word.length > 1 && !/^\d+$/.test(word))
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  if (words.length === 0) {
    return `${SITE_PREFIX} screenshot`;
  }

  const phrase = words.join(' ');
  if (phrase.toLowerCase().includes('marathon')) {
    return phrase;
  }

  return `${SITE_PREFIX} ${phrase}`;
}

/**
 * SEO: derive alt text from surrounding headings/labels when filename is not descriptive.
 */
export function generateAltFromContext(context: ImageContext): string | undefined {
  const parts = [context.label, context.heading, context.title, context.caption]
    .map(value => value?.trim())
    .filter((value): value is string => Boolean(value));

  if (parts.length === 0) return undefined;

  const primary = parts[0]!;
  if (primary.toLowerCase() === 'esp') {
    return 'Marathon ESP showing player boxes and loot highlights';
  }

  if (primary.toLowerCase().includes('marathon')) {
    return primary;
  }

  return `${SITE_PREFIX} ${primary}`;
}

function resolveAltText(
  src: string,
  explicitAlt: string | undefined,
  fallbackAlt: string | undefined,
  context: ImageContext | undefined,
  decorative: boolean,
): string {
  if (decorative) return '';

  if (explicitAlt?.trim()) {
    return explicitAlt.trim();
  }

  const registry = getImageSeoOrFallback(src, fallbackAlt ?? '');
  if (registry.alt && registry.alt.length >= 20) {
    return registry.alt;
  }

  if (fallbackAlt && fallbackAlt.trim().length >= 20) {
    return fallbackAlt.trim();
  }

  const fromContext = context ? generateAltFromContext(context) : undefined;
  if (fromContext) {
    return fromContext;
  }

  if (fallbackAlt?.trim()) {
    return fallbackAlt.trim();
  }

  return generateAltFromFilename(src);
}

/**
 * SEO: lazy-load below-fold images by default; eager + fetchpriority for LCP candidates.
 */
export function resolveLoadingStrategy(options: Pick<OptimizeImageOptions, 'priority' | 'loading'>) {
  if (options.priority || options.loading === 'eager') {
    return { loading: 'eager' as const, fetchPriority: 'high' as const };
  }

  return { loading: 'lazy' as const, fetchPriority: undefined };
}

/**
 * SEO: width/height reserve layout space before decode to prevent CLS (Core Web Vitals).
 */
export function resolveImageDimensions(
  src: string,
  width?: number,
  height?: number,
): { width?: number; height?: number } {
  if (width && height) {
    return { width, height };
  }

  const intrinsic = getImageDimensions(src);
  if (!intrinsic) {
    return { width, height };
  }

  return {
    width: width ?? intrinsic.width,
    height: height ?? intrinsic.height,
  };
}

/**
 * SEO: serve WebP to supporting browsers via <picture> while keeping original as fallback.
 */
export function resolveImageSources(src: string): OptimizedImageSources {
  const clean = stripQuery(src);

  if (/\.webp$/i.test(clean)) {
    return { fallback: src };
  }

  const intrinsic = getImageDimensions(src);
  if (intrinsic?.webpPath) {
    return { fallback: src, webp: intrinsic.webpPath };
  }

  return { fallback: src };
}

/** Validate alt text quality for build-time checks. */

/**
 * Central image SEO optimizer — returns invisible attributes for <img>/<picture>.
 * Does not affect CSS classes, layout wrappers, or visual styling.
 */
export function getOptimizedImageProps(options: OptimizeImageOptions): OptimizedImageProps {
  const {
    src,
    alt,
    fallbackAlt,
    context,
    priority,
    loading,
    decorative = false,
    width,
    height,
  } = options;

  const resolvedAlt = resolveAltText(src, alt, fallbackAlt, context, decorative);
  const registry = getImageSeoOrFallback(src, resolvedAlt);
  const dimensions = resolveImageDimensions(src, width, height);
  const loadingStrategy = resolveLoadingStrategy({ priority, loading });
  const sources = resolveImageSources(src);

  return {
    alt: resolvedAlt,
    title: decorative ? undefined : registry.title || resolvedAlt,
    loading: loadingStrategy.loading,
    fetchPriority: loadingStrategy.fetchPriority,
    decoding: 'async',
    width: dimensions.width,
    height: dimensions.height,
    sources,
  };
}

export function validateAltQuality(alt: string, src: string): string[] {
  const errors: string[] = [];

  if (!alt.trim()) return errors;

  if (alt.length < 20) {
    errors.push(`Alt text too short for ${src}: "${alt}"`);
  }

  if (/\.(png|jpe?g|webp|gif)$/i.test(alt)) {
    errors.push(`Alt must describe content, not filename: ${src}`);
  }

  return errors;
}

export { SITE_NAME };
