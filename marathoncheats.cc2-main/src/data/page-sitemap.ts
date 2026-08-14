import { siteConfig } from './site';
import { marathonImages } from './marathon';
import { englishPaths, pageIds, type PageId } from './i18n/routing';
import { pageSitemapMeta } from './sitemap-meta';
import {
	pageSitemapImageLabels,
	resolvedSitemapImages,
	sitemapLastmod,
} from './brand-sitemap';

export type SitemapImage = {
	url: string;
	title: string;
	caption: string;
};

export type PageSitemapEntry = {
	path: string;
	priority: number;
	changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
	lastmod: string;
	images: SitemapImage[];
};

const abs = (path: string) => new URL(path, siteConfig.url).href;

const img = (path: string, title: string, caption: string): SitemapImage => ({
	url: abs(path),
	title,
	caption,
});

/**
 * One screenshot per page — paths stay in marathonImages; titles/captions from brand tokens.
 */
const pageImageSrcById: Record<PageId, string> = {
	home: marathonImages.hero,
	'marathon-esp': marathonImages.playerEsp,
	'marathon-aimbot': marathonImages.aimbotCombat,
	features: marathonImages.aimbotSkeleton,
	pricing: marathonImages.cheatsCombat,
	setup: marathonImages.playerEsp,
	updates: marathonImages.hero,
	faq: marathonImages.aimbotSkeleton,
	support: marathonImages.cheatsCombat,
	undetected: marathonImages.espWallhack,
	wallhack: marathonImages.espWallhack,
	radar: marathonImages.playerEsp,
	battleye: marathonImages.aimbotCombat,
	'cheats-2026': marathonImages.hero,
	hacks: marathonImages.cheatsCombat,
	'cheat-download': marathonImages.cheatsCombat,
	'mod-menu': marathonImages.playerEsp,
	'soft-aim': marathonImages.aimbotSkeleton,
	'best-cheats': marathonImages.hero,
	'aimbot-hack': marathonImages.aimbotSkeleton,
	'esp-hack': marathonImages.espWallhack,
	'unlock-all': marathonImages.playerEsp,
	privacy: marathonImages.aimbotCombat,
	refund: marathonImages.cheatsCombat,
	terms: marathonImages.aimbotSkeleton,
};

for (const pageId of pageIds) {
	if (!pageImageSrcById[pageId]) {
		throw new Error(`[sitemap] No image path configured for pageId: ${pageId}`);
	}
}

/**
 * Canonical English sitemap entries — always includes every pageId from routing.
 * Absolute locs use siteConfig.url (from brand.url).
 */
export const pageSitemapEntries: PageSitemapEntry[] = pageIds.map((pageId) => {
	const meta = pageSitemapMeta[pageId];
	const labels = pageSitemapImageLabels(pageId);
	return {
		path: englishPaths[pageId],
		priority: meta.priority,
		changefreq: meta.changefreq,
		lastmod: sitemapLastmod(meta.lastmod),
		images: [img(pageImageSrcById[pageId], labels.title, labels.caption)],
	};
});

/** Unique keyword images for the dedicated image sitemap (editable in Brand Studio). */
export const imageSitemapEntries: SitemapImage[] = resolvedSitemapImages().map((entry) =>
	img(entry.src, entry.title, entry.caption),
);

export function absolutePageUrl(path: string): string {
	return abs(path);
}

export function absoluteAssetUrl(path: string): string {
	return abs(path);
}
