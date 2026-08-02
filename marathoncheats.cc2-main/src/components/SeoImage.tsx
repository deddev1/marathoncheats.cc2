import type { CSSProperties, MouseEventHandler } from 'react';
import { versionImageUrl } from '../content/imageSeo';
import {
  getOptimizedImageProps,
  type ImageContext,
} from '../seo/imageOptimizer';

type SeoImageProps = {
  src: string;
  /** Explicit alt — overrides registry for contextual sections. */
  alt?: string;
  fallbackAlt?: string;
  /** Nearby heading/label/caption for auto alt generation when registry has no entry. */
  context?: ImageContext;
  className?: string;
  loading?: 'eager' | 'lazy';
  /** Above-fold LCP image — disables lazy load and sets fetchpriority=high. */
  priority?: boolean;
  decoding?: 'async' | 'auto' | 'sync';
  width?: number;
  height?: number;
  style?: CSSProperties;
  draggable?: boolean;
  /** Decorative thumbnails inside labeled controls — parent must have aria-label. */
  decorative?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLImageElement>;
  onMouseLeave?: MouseEventHandler<HTMLImageElement>;
};

export function SeoImage({
  src,
  alt,
  fallbackAlt,
  context,
  className,
  loading,
  priority,
  decoding = 'async',
  width,
  height,
  style,
  draggable,
  decorative,
  onMouseEnter,
  onMouseLeave,
}: SeoImageProps) {
  const optimized = getOptimizedImageProps({
    src,
    alt,
    fallbackAlt,
    context,
    loading,
    priority,
    width,
    height,
    decorative,
  });

  const fallbackSrc = versionImageUrl(optimized.sources.fallback);
  const webpSrc = optimized.sources.webp ? versionImageUrl(optimized.sources.webp) : undefined;

  const image = (
    <img
      src={fallbackSrc}
      alt={optimized.alt}
      title={optimized.title}
      className={className}
      loading={optimized.loading}
      fetchPriority={optimized.fetchPriority}
      decoding={decoding}
      width={optimized.width}
      height={optimized.height}
      style={style}
      draggable={draggable}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );

  if (!webpSrc) {
    return image;
  }

  // SEO: WebP via <picture> — same img styling, smaller transfer for modern browsers.
  return (
    <picture>
      <source type="image/webp" srcSet={webpSrc} />
      {image}
    </picture>
  );
}
