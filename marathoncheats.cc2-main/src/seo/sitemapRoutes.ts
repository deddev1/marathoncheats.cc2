import { BLOG_POSTS } from '../pages/Blog';
import { ROUTE_SEO } from './config';

export type SitemapRoute = {
  /** App route path, e.g. `/blog/marathoncheats-esp` */
  path: string;
  /** Repo files used to derive an accurate <lastmod> date */
  sourceFiles: string[];
};

const blogPostRoutes: SitemapRoute[] = BLOG_POSTS.map(post => ({
  path: `/blog/${post.slug}`,
  sourceFiles: ['src/pages/Blog.tsx'],
}));

/** Canonical, indexable routes for sitemap.xml and Search Console. */
export const SITEMAP_ROUTES: SitemapRoute[] = [
  {
    path: '/',
    sourceFiles: ['src/pages/Home.tsx', 'index.html', 'src/seo/config.ts'],
  },
  {
    path: ROUTE_SEO.store.path,
    sourceFiles: ['src/pages/Store.tsx', 'src/content/pricingPlans.ts', 'src/components/PricingSelector.tsx'],
  },
  {
    path: ROUTE_SEO.blog.path,
    sourceFiles: ['src/pages/Blog.tsx'],
  },
  {
    path: ROUTE_SEO.terms.path,
    sourceFiles: ['src/pages/Legal.tsx'],
  },
  {
    path: ROUTE_SEO.privacy.path,
    sourceFiles: ['src/pages/Legal.tsx'],
  },
  {
    path: ROUTE_SEO.refund.path,
    sourceFiles: ['src/pages/Legal.tsx'],
  },
  ...blogPostRoutes,
];
