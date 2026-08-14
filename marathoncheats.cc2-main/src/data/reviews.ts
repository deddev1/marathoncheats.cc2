import { customerReviews, siteConfig } from './site';
import { reviewsSitemapImageMeta } from './brand-sitemap';

export const reviewsBasePath = '/reviews/';

export function getReviewPath(slug: string): string {
	return `${reviewsBasePath}${slug}/`;
}

export function absoluteReviewUrl(slug?: string): string {
	return new URL(slug ? getReviewPath(slug) : reviewsBasePath, siteConfig.url).href;
}

const reviewOgImage = {
	url: new URL(siteConfig.defaultOgImage, siteConfig.url).href,
	...reviewsSitemapImageMeta(),
};

/** English review routes for sitemap-en.xml — /reviews/ index + one URL per review. */
export function getReviewSitemapEntries() {
	const indexLastmod = customerReviews.reduce(
		(max, review) => (review.date > max ? review.date : max),
		customerReviews[0]?.date ?? new Date().toISOString().slice(0, 10),
	);

	const entries: {
		path: string;
		lastmod: string;
		priority: number;
		changefreq: 'daily' | 'weekly' | 'monthly';
		images: { url: string; title: string; caption: string }[];
	}[] = [
		{
			path: reviewsBasePath,
			lastmod: indexLastmod,
			priority: 0.85,
			changefreq: 'weekly',
			images: [reviewOgImage],
		},
	];

	for (const review of customerReviews) {
		entries.push({
			path: getReviewPath(review.slug),
			lastmod: review.date,
			priority: 0.75,
			changefreq: 'monthly',
			images: [
				{
					url: reviewOgImage.url,
					title: `Marathon Cheats review by @${review.handle}`,
					caption: review.seoDescription,
				},
			],
		});
	}

	return entries;
}
