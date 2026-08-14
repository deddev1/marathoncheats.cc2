/**
 * Sitemap labels + lastmod bump — driven by brand.sitemap with safe defaults.
 * XML endpoints stay generated; this only supplies brand-aware strings / dates.
 */
import { brand, fillBrandTokens } from './brand';
import type { PageId } from './i18n/routing';

export type BrandSitemapImage = {
	src: string;
	title: string;
	caption: string;
};

const defaultImages: BrandSitemapImage[] = [
	{
		src: '/images/marathon-cheats-esp.webp',
		title: 'marathon cheats esp',
		caption: 'marathon cheats esp wallhack',
	},
	{
		src: '/images/marathon-cheats-wallhack.webp',
		title: 'marathon cheats wallhack',
		caption: 'marathon cheats wallhack esp',
	},
	{
		src: '/images/marathon-cheats-aimbot.webp',
		title: 'marathon cheats aimbot',
		caption: 'marathon cheats aimbot soft aim',
	},
	{
		src: '/images/marathon-cheats-aimbot-view.webp',
		title: 'marathon cheats aimbot',
		caption: 'marathon cheats aimbot view',
	},
	{
		src: '/images/marathon-cheats-radar.webp',
		title: 'marathon cheats radar',
		caption: 'marathon cheats radar hack',
	},
	{
		src: '/images/marathon-cheats-raid.webp',
		title: 'marathon cheats',
		caption: 'marathon cheats in raid',
	},
];

/** Per-page image title/caption templates for the English urlset. */
const pageImageTemplates: Record<PageId, { title: string; caption: string }> = {
	home: { title: '{primaryKeyword}', caption: 'ESP, aimbot, and radar for Marathon on PC' },
	'marathon-esp': { title: '{primaryKeyword} ESP', caption: 'See players through walls with {primaryKeyword}' },
	'marathon-aimbot': { title: '{primaryKeyword} aimbot', caption: 'Aimbot view in {primaryKeyword}' },
	features: { title: '{primaryKeyword} features', caption: 'What you get with {primaryKeyword}' },
	pricing: { title: '{primaryKeyword} plans', caption: 'Monthly and lifetime {primaryKeyword} plans' },
	setup: { title: '{primaryKeyword} setup', caption: 'How to set up {primaryKeyword} on PC' },
	updates: { title: '{primaryKeyword} status', caption: 'Check {primaryKeyword} after a game patch' },
	faq: { title: '{primaryKeyword} FAQ', caption: 'Common questions about {primaryKeyword}' },
	support: { title: '{primaryKeyword} support', caption: 'Help with your {primaryKeyword} license' },
	undetected: { title: 'Undetected {primaryKeyword}', caption: 'Safe status notes for {primaryKeyword}' },
	wallhack: { title: '{primaryKeyword} wallhack', caption: 'See through walls with {primaryKeyword}' },
	radar: { title: '{primaryKeyword} radar', caption: 'Radar map in {primaryKeyword}' },
	battleye: { title: '{antiCheat} and {primaryKeyword}', caption: '{primaryKeyword} after a BattlEye update' },
	'cheats-2026': { title: '{primaryKeyword} 2026', caption: '{primaryKeyword} buyer guide for 2026' },
	hacks: { title: '{primaryKeyword}', caption: '{primaryKeyword} ESP, aimbot, and radar' },
	'cheat-download': { title: '{primaryKeyword} download', caption: 'Get {primaryKeyword} after you buy' },
	'mod-menu': { title: '{primaryKeyword} menu', caption: 'In-game menu for {primaryKeyword}' },
	'soft-aim': { title: '{primaryKeyword} soft aim', caption: 'Soft aim settings in {primaryKeyword}' },
	'best-cheats': { title: 'Best {primaryKeyword}', caption: 'Why players pick {primaryKeyword}' },
	'aimbot-hack': { title: '{primaryKeyword} aimbot', caption: 'Aimbot tools in {primaryKeyword}' },
	'esp-hack': { title: '{primaryKeyword} ESP', caption: 'ESP tools in {primaryKeyword}' },
	'unlock-all': { title: '{primaryKeyword} unlock guide', caption: 'Unlock tips with {primaryKeyword}' },
	privacy: { title: '{brand} privacy', caption: 'Privacy info for {primaryKeyword}' },
	refund: { title: '{brand} refunds', caption: 'Refund info for {primaryKeyword}' },
	terms: { title: '{brand} terms', caption: 'Terms for {primaryKeyword}' },
};

const sitemapDefaults = {
	contentLastmod: '2026-08-10',
	blogImageTitle: '{brand} blog',
	blogImageCaption: 'Tips and updates for {primaryKeyword}',
	reviewsImageTitle: '{brand} reviews',
	reviewsImageCaption: 'What buyers say about {primaryKeyword}',
	images: defaultImages,
} as const;

type SitemapShape = {
	contentLastmod: string;
	blogImageTitle: string;
	blogImageCaption: string;
	reviewsImageTitle: string;
	reviewsImageCaption: string;
	images: BrandSitemapImage[];
};

const raw = brand as typeof brand & { sitemap?: Partial<SitemapShape> };

function normalizeImages(input: unknown): BrandSitemapImage[] {
	if (!Array.isArray(input) || input.length < 1) return defaultImages.map((i) => ({ ...i }));
	const out: BrandSitemapImage[] = [];
	const seen = new Set<string>();
	for (const item of input) {
		if (!item || typeof item !== 'object') continue;
		const row = item as Record<string, unknown>;
		const src = typeof row.src === 'string' ? row.src.trim() : '';
		const title = typeof row.title === 'string' ? row.title.trim() : '';
		const caption = typeof row.caption === 'string' ? row.caption.trim() : '';
		if (!src.startsWith('/images/') || !title || !caption) continue;
		if (seen.has(src)) continue;
		seen.add(src);
		out.push({ src, title, caption });
	}
	return out.length ? out : defaultImages.map((i) => ({ ...i }));
}

export const brandSitemap: SitemapShape = {
	contentLastmod: raw.sitemap?.contentLastmod?.trim() || sitemapDefaults.contentLastmod,
	blogImageTitle: raw.sitemap?.blogImageTitle?.trim() || sitemapDefaults.blogImageTitle,
	blogImageCaption: raw.sitemap?.blogImageCaption?.trim() || sitemapDefaults.blogImageCaption,
	reviewsImageTitle: raw.sitemap?.reviewsImageTitle?.trim() || sitemapDefaults.reviewsImageTitle,
	reviewsImageCaption: raw.sitemap?.reviewsImageCaption?.trim() || sitemapDefaults.reviewsImageCaption,
	images: normalizeImages(raw.sitemap?.images),
};

/** Prefer the later of page lastmod vs brand contentLastmod (Brand Studio bump). */
export function sitemapLastmod(pageLastmod: string): string {
	const bump = brandSitemap.contentLastmod;
	return bump && bump > pageLastmod ? bump : pageLastmod;
}

export function resolvedSitemapImages(): BrandSitemapImage[] {
	return brandSitemap.images.map((entry) => ({
		src: entry.src,
		title: fillBrandTokens(entry.title),
		caption: fillBrandTokens(entry.caption),
	}));
}

export function pageSitemapImageLabels(pageId: PageId): { title: string; caption: string } {
	const tpl = pageImageTemplates[pageId];
	return {
		title: fillBrandTokens(tpl.title),
		caption: fillBrandTokens(tpl.caption),
	};
}

export function blogSitemapImageMeta() {
	return {
		title: fillBrandTokens(brandSitemap.blogImageTitle),
		caption: fillBrandTokens(brandSitemap.blogImageCaption),
	};
}

export function reviewsSitemapImageMeta() {
	return {
		title: fillBrandTokens(brandSitemap.reviewsImageTitle),
		caption: fillBrandTokens(brandSitemap.reviewsImageCaption),
	};
}

export { sitemapDefaults, pageImageTemplates };
