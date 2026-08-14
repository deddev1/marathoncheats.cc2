import { getPageContent } from './i18n';
import { getBlogSitemapEntriesForLocale } from './blog/helpers';
import { getLocalizedPath, hreflangLinksXml, pageIds, type PageId } from './i18n/routing';
import { defaultLocale, localeCodes, type LocaleCode } from './i18n/locales';
import { siteConfig } from './site';
import { pageSitemapMeta } from './sitemap-meta';
import { escapeXml } from './sitemap-xml';
import { sitemapLastmod } from './brand-sitemap';

export type LocaleSitemapEntry = {
	path: string;
	pageId?: PageId;
	lastmod: string;
	priority: number;
	changefreq: string;
	image?: { url: string; title: string; caption: string };
};

/** Non-English locale codes included in regional sitemaps. */
export const i18nLocaleCodes = localeCodes.filter((code) => code !== defaultLocale);

const BLOG_PAGES_PER_LOCALE = 18; // /blog/ index + 17 posts

/** Build sitemap entries for one non-English locale (25 product pages + 18 blog URLs). */
export function buildLocaleSitemapEntries(locale: LocaleCode): LocaleSitemapEntry[] {
	if (locale === defaultLocale) {
		throw new Error(`English pages belong in sitemap-en.xml, not sitemap-${locale}.xml`);
	}

	const productEntries: LocaleSitemapEntry[] = pageIds.map((pageId) => {
		const meta = pageSitemapMeta[pageId];
		const page = pageId === 'home' ? null : getPageContent(locale, pageId);

		return {
			path: getLocalizedPath(pageId, locale),
			pageId,
			lastmod: sitemapLastmod(meta.lastmod),
			priority: meta.i18nPriority,
			changefreq: meta.changefreq,
			image:
				pageId === 'home'
					? undefined
					: {
							url: new URL(page!.heroImage, siteConfig.url).href,
							title: page!.title,
							caption: page!.imageAlt,
						},
		};
	});

	const blogEntries: LocaleSitemapEntry[] = getBlogSitemapEntriesForLocale(locale).map((entry) => ({
		path: entry.path,
		lastmod: entry.lastmod,
		priority: entry.priority,
		changefreq: entry.changefreq,
		image: entry.images[0],
	}));

	return [...productEntries, ...blogEntries];
}

export { BLOG_PAGES_PER_LOCALE };

export function localeSitemapFilename(locale: LocaleCode): string {
	return `sitemap-${locale}.xml`;
}

export function localeSitemapUrl(locale: LocaleCode): string {
	return new URL(`/${localeSitemapFilename(locale)}`, siteConfig.url).href;
}

export function renderLocaleSitemapUrlBlock(entry: LocaleSitemapEntry): string {
	const loc = new URL(entry.path, siteConfig.url).href;
	const hreflangBlock = entry.pageId ? `\n${hreflangLinksXml(entry.pageId, escapeXml)}` : '';
	const imageBlock = entry.image
		? `\n    <image:image>
      <image:loc>${escapeXml(entry.image.url)}</image:loc>
      <image:title>${escapeXml(entry.image.title)}</image:title>
      <image:caption>${escapeXml(entry.image.caption)}</image:caption>
    </image:image>`
		: '';

	return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>${hreflangBlock}${imageBlock}
  </url>`;
}

/** Combined i18n entries (all 21 locales) — used by sitemap-i18n.xml for backward compatibility. */
export function buildAllI18nSitemapEntries(): LocaleSitemapEntry[] {
	return i18nLocaleCodes.flatMap((locale) => buildLocaleSitemapEntries(locale));
}
