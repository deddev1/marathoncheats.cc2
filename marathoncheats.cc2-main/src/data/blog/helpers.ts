import { siteConfig } from '../site';
import { blogSitemapImageMeta } from '../brand-sitemap';
import {
	defaultLocale,
	localeCodes,
	type LocaleCode,
	locales,
} from '../i18n/locales';
import { resolvePageContextFromPath } from '../i18n/routing';
import type { BlogImageKey, BlogPostDefinition, BlogTranslation, ResolvedBlogPost } from './types';
import { blogPosts as rawBlogPosts } from './posts.generated';

/**
 * One unique Marathon cover per blog post.
 * Sources: user cheat screenshots (ESP/aimbot) + IGN Bungie Marathon press / cinematic art.
 * Simple root URLs — never reuse the same file across posts.
 */
const postImageById: Record<string, string> = {
	'marathon-esp-wallhack-explained': '/blog-esp.webp',
	'marathon-aimbot-settings-guide': '/blog-aimbot.webp',
	'patch-notes-breakdown': '/blog-patch.webp',
	'marathon-skin-leaks': '/blog-skins.webp',
	'marathon-weapon-tier-list': '/blog-weapons.webp',
	'marathon-loot-run-meta': '/blog-loot.webp',
	'marathon-tournament-meta': '/blog-tournament.webp',
	'marathon-loot-routes': '/blog-routes.webp',
	'marathon-pro-settings': '/blog-settings.webp',
	'marathon-warmup-maps': '/blog-warmup.webp',
	'marathon-cheats-complete-guide': '/blog-guide.webp',
	'bungie-marathon-cheats-buyers-guide': '/blog-buyers.webp',
	'marathon-cheats-2026-whats-new': '/blog-2026.webp',
	'undetected-marathon-cheats-battleye': '/blog-battleye.webp',
	'marathon-cheats-vs-cheatvault': '/blog-vs-cheatvault.webp',
	'elitefn-two-week-test': '/blog-elitefn.webp',
	'marathon-cheats-vs-ghostware': '/blog-vs-ghostware.webp',
};

const imageKeyFallback: Record<BlogImageKey, string> = {
	hero: '/blog-2026.webp',
	espWallhack: '/blog-esp.webp',
	aimbotCombat: '/blog-aimbot.webp',
	squadFight: '/blog-patch.webp',
	headerArt: '/blog-skins.webp',
	cheatsPackage: '/blog-buyers.webp',
	playerEsp: '/blog-warmup.webp',
	rebootFight: '/blog-battleye.webp',
	battleRoyaleCombat: '/blog-loot.webp',
	battleRoyaleIslandMap: '/blog-routes.webp',
};

function expandTranslations(
	translations: Partial<Record<LocaleCode, BlogTranslation>> & { en: BlogTranslation },
): Record<LocaleCode, BlogTranslation> {
	const en = translations.en;
	const full = {} as Record<LocaleCode, BlogTranslation>;
	for (const code of localeCodes) {
		full[code] = translations[code] ?? { ...en };
	}
	return full;
}

export const blogPosts: BlogPostDefinition[] = rawBlogPosts.map((post) => ({
	...post,
	translations: expandTranslations(post.translations as Partial<Record<LocaleCode, BlogTranslation>> & { en: BlogTranslation }),
}));

export function getBlogImageSrc(key: BlogImageKey, postId?: string): string {
	if (postId && postImageById[postId]) return postImageById[postId];
	return imageKeyFallback[key];
}

export function getBlogBasePath(locale: LocaleCode): string {
	return locale === defaultLocale ? '/blog/' : `/${locale}/blog/`;
}

export function isBlogPath(pathname: string): boolean {
	const context = resolvePageContextFromPath(pathname);
	return Boolean(context.isBlogIndex || context.blogSlug);
}

export function findPostBySlug(slug: string, locale?: LocaleCode): BlogPostDefinition | undefined {
	return blogPosts.find((post) => {
		if (locale) {
			return post.translations[locale]?.slug === slug;
		}
		return localeCodes.some((code) => post.translations[code]?.slug === slug);
	});
}

/** Target URL for the same blog index or post in another locale. */
export function getBlogLocaleSwitchHref(pathname: string, targetLocale: LocaleCode): string {
	const context = resolvePageContextFromPath(pathname);

	if (context.blogSlug) {
		const post = findPostBySlug(context.blogSlug, context.locale);
		if (post) {
			return getBlogPostPath(targetLocale, post.translations[targetLocale].slug);
		}
	}

	return getBlogBasePath(targetLocale);
}

export function getBlogPostPath(locale: LocaleCode, slug: string): string {
	const base = getBlogBasePath(locale);
	return `${base}${slug}/`;
}

export function absoluteBlogUrl(locale: LocaleCode, slug?: string): string {
	const path = slug ? getBlogPostPath(locale, slug) : getBlogBasePath(locale);
	return new URL(path, siteConfig.url).href;
}

export function resolvePost(post: BlogPostDefinition, locale: LocaleCode): ResolvedBlogPost {
	const translation = post.translations[locale];
	return {
		...post,
		locale,
		translation,
		imageSrc: getBlogImageSrc(post.imageKey, post.id),
		canonicalPath: getBlogPostPath(locale, translation.slug),
	};
}

export function getAllPostsForLocale(locale: LocaleCode): ResolvedBlogPost[] {
	return blogPosts
		.map((post) => resolvePost(post, locale))
		.sort((a, b) => (a.published < b.published ? 1 : -1));
}

export function getFeaturedPosts(locale: LocaleCode, limit = 3): ResolvedBlogPost[] {
	const all = getAllPostsForLocale(locale);
	const featured = all.filter((p) => p.featured);
	return (featured.length >= limit ? featured : all).slice(0, limit);
}

export function getPostBySlug(locale: LocaleCode, slug: string): ResolvedBlogPost | undefined {
	const post = blogPosts.find((p) => p.translations[locale]?.slug === slug);
	return post ? resolvePost(post, locale) : undefined;
}

/** Hreflang alternates for a blog post — current locale first, then x-default. */
export function getBlogPostHreflangAlternates(
	post: BlogPostDefinition,
	currentLocale: LocaleCode = defaultLocale,
) {
	const byLocale = localeCodes.map((code) => ({
		hreflang: locales.find((l) => l.code === code)!.hreflang,
		href: absoluteBlogUrl(code, post.translations[code].slug),
		code,
	}));
	const self = byLocale.find((alt) => alt.code === currentLocale)!;
	const others = byLocale.filter((alt) => alt.code !== currentLocale);
	return [
		{ hreflang: self.hreflang, href: self.href },
		...others.map(({ hreflang, href }) => ({ hreflang, href })),
		{
			hreflang: 'x-default' as const,
			href: absoluteBlogUrl(defaultLocale, post.translations[defaultLocale].slug),
		},
	];
}

/** Hreflang alternates for a blog index — current locale first, then x-default. */
export function getBlogIndexHreflangAlternates(currentLocale: LocaleCode = defaultLocale) {
	const byLocale = localeCodes.map((code) => ({
		hreflang: locales.find((l) => l.code === code)!.hreflang,
		href: absoluteBlogUrl(code),
		code,
	}));
	const self = byLocale.find((alt) => alt.code === currentLocale)!;
	const others = byLocale.filter((alt) => alt.code !== currentLocale);
	return [
		{ hreflang: self.hreflang, href: self.href },
		...others.map(({ hreflang, href }) => ({ hreflang, href })),
		{ hreflang: 'x-default' as const, href: absoluteBlogUrl(defaultLocale) },
	];
}

/**
 * ⚠️ QUARANTINED — DO NOT USE YET.
 * Generates static paths for localized blog routes (`/{lang}/blog/{slug}/`)
 * that are not implemented — no `src/pages/[lang]/blog/` route exists.
 * Do not wire into getStaticPaths (or sitemaps) until localized blog routes exist,
 * otherwise sitemaps/links would reference pages that are never built.
 */
export function getAllBlogStaticPaths(): { params: { lang?: string; slug: string }; props: { locale: LocaleCode } }[] {
	const paths: { params: { lang?: string; slug: string }; props: { locale: LocaleCode } }[] = [];
	for (const post of blogPosts) {
		for (const locale of localeCodes) {
			const slug = post.translations[locale].slug;
			if (locale === defaultLocale) {
				paths.push({ params: { slug }, props: { locale } });
			} else {
				paths.push({ params: { lang: locale, slug }, props: { locale } });
			}
		}
	}
	return paths;
}

/** Blog sitemap entries for one locale (index + all posts). */
export function getBlogSitemapEntriesForLocale(locale: LocaleCode) {
	const indexLastmod = blogPosts.reduce(
		(max, post) => (post.updated > max ? post.updated : max),
		blogPosts[0]?.updated ?? new Date().toISOString().slice(0, 10),
	);

	const entries: {
		path: string;
		lastmod: string;
		priority: number;
		changefreq: 'daily' | 'weekly' | 'monthly';
		images: { url: string; title: string; caption: string }[];
	}[] = [
		{
			path: getBlogBasePath(locale),
			lastmod: indexLastmod,
			priority: locale === defaultLocale ? 0.92 : 0.9,
			changefreq: 'daily',
			images: [
				{
					url: new URL(siteConfig.defaultOgImage, siteConfig.url).href,
					...blogSitemapImageMeta(),
				},
			],
		},
	];

	for (const post of blogPosts) {
		const t = post.translations[locale];
		const imageSrc = getBlogImageSrc(post.imageKey, post.id);
		const isProductPost = /Marathon Cheats|Marathon Cheats|Aimbot|ESP|Undetected|Comparisons/i.test(
			post.category,
		);
		entries.push({
			path: getBlogPostPath(locale, t.slug),
			lastmod: post.updated,
			priority: isProductPost ? (locale === defaultLocale ? 0.95 : 0.93) : locale === defaultLocale ? 0.88 : 0.86,
			changefreq: 'weekly',
			images: [
				{
					url: new URL(imageSrc, siteConfig.url).href,
					title: t.title,
					caption: t.imageAlt,
				},
			],
		});
	}

	return entries;
}

/** English blog routes in the primary sitemap (localized posts live in per-locale sitemaps). */
export function getBlogSitemapEntries() {
	return getBlogSitemapEntriesForLocale(defaultLocale);
}
