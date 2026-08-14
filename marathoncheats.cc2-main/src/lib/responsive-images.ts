export interface ResponsiveWidth {
	src: string;
	width: number;
}

/** Build a srcset string from width-tagged image paths. */
export function buildSrcSet(widths: ResponsiveWidth[]): string {
	return widths.map(({ src, width }) => `${src} ${width}w`).join(', ');
}

/** Build srcset for content images that have -480w / -960w variants. */
export function contentSrcSet(baseSrc: string): string | undefined {
	const match = baseSrc.match(/^(.+\/)(.+)\.webp$/i);
	if (!match) return undefined;

	const [, dir, name] = match;
	if (
		name.endsWith('-640w') ||
		name.endsWith('-960w') ||
		name.endsWith('-1400w') ||
		name.endsWith('-1024w') ||
		name.endsWith('-1536w') ||
		name.endsWith('-480w')
	) {
		return undefined;
	}

	return buildSrcSet(
		contentWidths.map((width) => ({
			src: `${dir}${name}-${width}w.webp`,
			width,
		})),
	);
}

/** Homepage / banner hero — native 2120×742 (~2.86:1) Marathon banner. */
export const heroWidths = [640, 960, 1400, 2120] as const;

export const heroWebpSrcSet = heroWidths.map((width) => `/hero-${width}w.webp ${width}w`).join(', ');
export const heroAvifSrcSet = heroWidths.map((width) => `/hero-${width}w.avif ${width}w`).join(', ');

/** Default src for browsers that ignore srcset (mid-size WebP). */
export const heroSrc = '/hero-1400w.webp';
export const heroSrcSet = heroWebpSrcSet;
export const heroSizes = '100vw';

/** LCP preload — AVIF; browsers that cannot decode it ignore the preload and use WebP. */
export const heroPreloadSrc = '/hero-960w.avif';
export const heroPreloadSrcSet = heroAvifSrcSet;
export const heroPreloadType = 'image/avif';

/** PNG master kept for Open Graph / crawlers that dislike WebP. */
export const heroPngSrc = '/hero.png';

/** Exact native dimensions (no zoom crop / no recompress of layout box). */
export const heroWidth = 2120;
export const heroHeight = 742;

/** Responsive widths for below-fold content images. */
export const contentWidths = [480, 960] as const;

export const galleryFeaturedSizes = '(max-width: 560px) 100vw, (max-width: 900px) 90vw, 640px';
export const galleryTileSizes = '(max-width: 560px) 100vw, (max-width: 900px) 45vw, 320px';
export const productMainSizes = '(max-width: 900px) 100vw, 640px';
export const productThumbSizes = '160px';
