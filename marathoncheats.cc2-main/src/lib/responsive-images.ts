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
	// Supports both `/images/foo.webp` and simple root `/foo.webp`
	const match = baseSrc.match(/^(\/|(?:.+\/))([^/]+)\.webp$/i);
	if (!match) return undefined;

	const [, dir, name] = match;
	if (
		name.endsWith('-640w') ||
		name.endsWith('-480w') ||
		name.endsWith('-960w') ||
		name.endsWith('-1400w') ||
		name.endsWith('-1024w') ||
		name.endsWith('-1536w')
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

/**
 * Homepage hero — native 2120×742 (~2.86:1) Marathon banner.
 * Prefer the PNG master (no lossy compression). Do not point at WebP.
 */
export const heroResponsive: ResponsiveWidth[] = [
	{ src: '/hero.png', width: 2120 },
];

export const heroDesktopResponsive: ResponsiveWidth[] = heroResponsive;

/** Uncompressed PNG master — do not point this at a lossy webp. */
export const heroSrc = '/hero.png';
export const heroSrcSet = `${heroSrc} 2120w`;
export const heroSizes = '100vw';

/** LCP preload — PNG master. */
export const heroPreloadSrc = heroSrc;

/** Exact native dimensions (no zoom crop / no recompress). */
export const heroWidth = 2120;
export const heroHeight = 742;

/** Responsive widths for below-fold content images. */
export const contentWidths = [480, 960] as const;

export const galleryFeaturedSizes = '(max-width: 560px) 100vw, (max-width: 900px) 90vw, 640px';
export const galleryTileSizes = '(max-width: 560px) 100vw, (max-width: 900px) 45vw, 320px';
export const productMainSizes = '(max-width: 900px) 100vw, 640px';
export const productThumbSizes = '160px';
