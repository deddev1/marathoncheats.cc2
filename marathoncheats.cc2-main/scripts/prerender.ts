import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { getSiteVideo } from '../src/content/videos';
import { HOME_FAQS, STORE_FAQS } from '../src/content/faqs';
import { BLOG_POSTS } from '../src/content/blogPosts';
import { buildFaqPageSchema } from '../src/seo/faqSchema';
import {
  BLOG_POST_SEO,
  buildBlogPostTitle,
  buildCanonicalUrl,
  DEFAULT_OG_IMAGE,
  HOME_SEO,
  ROUTE_SEO,
  SITE_URL,
} from '../src/seo/config';
import { IMAGE_SEO_REGISTRY } from '../src/content/imageSeo';
import { buildBreadcrumbJsonLd, AIMBOT_BREADCRUMB } from '../src/seo/breadcrumbSchema';
import { buildHomepageImageSchemas, buildImageGallerySchema } from '../src/seo/imageSchema';
import {
  BLOG_LIST_HEADING,
  HOME_PAGE_HEADING,
  STORE_PAGE_HEADING,
  getLegalHeading,
} from '../src/seo/pageHeadings';
import { buildVideoObjectJsonLd } from '../src/seo/videoSchema';
import { buildSoftwareApplicationSchema } from '../src/seo/softwareApplicationSchema';

type PrerenderRoute = {
  path: string;
  title: string;
  description: string;
  heading?: string;
  intro?: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  imageType?: string;
  noindex?: boolean;
  includeHomeJsonLd?: boolean;
  structuredData?: Record<string, unknown>[];
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function replaceMetaContent(html: string, selector: string, content: string) {
  const pattern = new RegExp(`(<meta[^>]*${selector}[^>]*content=")([^"]*)(")`, 'i');
  return html.replace(pattern, `$1${escapeHtml(content)}$3`);
}

function replaceLinkHref(html: string, rel: string, href: string) {
  const pattern = new RegExp(`(<link[^>]*rel="${rel}"[^>]*href=")([^"]*)(")`, 'i');
  return html.replace(pattern, `$1${escapeHtml(href)}$3`);
}

function replaceTitle(html: string, title: string) {
  return html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
}

function toIsoDate(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString().slice(0, 10) : parsed.toISOString().slice(0, 10);
}

function buildRoutes(): PrerenderRoute[] {
  const heroVideo = getSiteVideo('marathon-hero-demo');
  const featureVideo = getSiteVideo('marathon-feature-demo');

  const storeStructuredData = [
    buildSoftwareApplicationSchema({
      url: `${SITE_URL}${ROUTE_SEO.store.path}`,
      description: ROUTE_SEO.store.description,
    }),
    buildFaqPageSchema(STORE_FAQS),
    buildBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Buy Marathon Cheats', path: ROUTE_SEO.store.path },
    ]),
    ...(featureVideo ? [buildVideoObjectJsonLd(featureVideo)] : []),
  ];

  const blogImages = IMAGE_SEO_REGISTRY.filter(entry => entry.pagePath.startsWith('/blog'));
  const blogGallery = buildImageGallerySchema(ROUTE_SEO.blog.path, blogImages);

  const legalRoutes: PrerenderRoute[] = [
    ROUTE_SEO.terms,
    ROUTE_SEO.privacy,
    ROUTE_SEO.refund,
  ].map(route => {
    const heading = getLegalHeading(route.path)!;
    return {
      path: route.path,
      title: route.title,
      description: route.description,
      heading: heading.h1,
      intro: heading.intro,
    };
  });

  const routes: PrerenderRoute[] = [
    {
      path: '/',
      title: HOME_SEO.en.title,
      description: HOME_SEO.en.description,
      heading: HOME_PAGE_HEADING.h1,
      intro: HOME_PAGE_HEADING.intro,
      includeHomeJsonLd: true,
      structuredData: [
        buildFaqPageSchema(HOME_FAQS),
        buildBreadcrumbJsonLd(AIMBOT_BREADCRUMB),
        ...buildHomepageImageSchemas(),
        ...(heroVideo ? [buildVideoObjectJsonLd(heroVideo)] : []),
      ],
    },
    {
      path: ROUTE_SEO.store.path,
      title: ROUTE_SEO.store.title,
      description: ROUTE_SEO.store.description,
      heading: STORE_PAGE_HEADING.h1,
      intro: STORE_PAGE_HEADING.intro,
      structuredData: storeStructuredData,
    },
    {
      path: ROUTE_SEO.blog.path,
      title: ROUTE_SEO.blog.title,
      description: ROUTE_SEO.blog.description,
      heading: BLOG_LIST_HEADING.h1,
      intro: BLOG_LIST_HEADING.intro,
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Marathon Cheat Guides',
          description: ROUTE_SEO.blog.description,
          url: `${SITE_URL}${ROUTE_SEO.blog.path}`,
        },
        ...(blogGallery ? [blogGallery] : []),
      ],
    },
    ...legalRoutes,
    ...BLOG_POSTS.map(post => {
      const path = `/blog/${post.slug}`;
      const canonicalUrl = `${SITE_URL}${path}`;
      const publishedTime = toIsoDate(post.date);
      const postSeo = BLOG_POST_SEO[post.slug];
      const title = buildBlogPostTitle(post.title);
      const description = postSeo?.description ?? post.excerpt;

      return {
        path,
        title,
        description,
        heading: post.title,
        intro: `${post.title}. ${description}`,
        type: 'article' as const,
        image: post.image,
        structuredData: [
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description,
            image: `${SITE_URL}${post.image}`,
            datePublished: publishedTime,
            dateModified: publishedTime,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl,
            },
            author: {
              '@type': 'Organization',
              name: 'Marathon Cheats',
              url: SITE_URL,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Marathon Cheats',
              logo: {
                '@type': 'ImageObject',
                url: DEFAULT_OG_IMAGE,
              },
            },
          },
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: ROUTE_SEO.blog.path },
            { name: post.title, path },
          ]),
        ],
      };
    }),
  ];

  return routes;
}

function applyRouteSeo(template: string, route: PrerenderRoute) {
  const canonical = buildCanonicalUrl(route.path);
  const image = route.image ? `${SITE_URL}${route.image}` : DEFAULT_OG_IMAGE;
  const robots = route.noindex ? 'noindex, follow' : 'index, follow';
  const type = route.type ?? 'website';

  let html = template;
  html = replaceTitle(html, route.title);
  html = replaceMetaContent(html, 'name="description"', route.description);
  html = replaceMetaContent(html, 'name="robots"', robots);
  html = replaceLinkHref(html, 'canonical', canonical);
  html = replaceMetaContent(html, 'property="og:type"', type);
  html = replaceMetaContent(html, 'property="og:url"', canonical);
  html = replaceMetaContent(html, 'property="og:title"', route.title);
  html = replaceMetaContent(html, 'property="og:description"', route.description);
  html = replaceMetaContent(html, 'property="og:image"', image);
  html = replaceMetaContent(html, 'property="og:image:secure_url"', image);
  if (route.imageAlt) {
    html = replaceMetaContent(html, 'property="og:image:alt"', route.imageAlt);
    html = replaceMetaContent(html, 'name="twitter:image:alt"', route.imageAlt);
  }
  if (route.imageType) {
    html = replaceMetaContent(html, 'property="og:image:type"', route.imageType);
  }
  html = replaceMetaContent(html, 'name="twitter:title"', route.title);
  html = replaceMetaContent(html, 'name="twitter:description"', route.description);
  html = replaceMetaContent(html, 'name="twitter:image"', image);

  if (!route.includeHomeJsonLd) {
    html = html.replace(
      /<script type="application\/ld\+json" data-static-json-ld="true">[\s\S]*?<\/script>\s*/g,
      '',
    );
  }

  if (route.structuredData?.length) {
    const jsonLd = route.structuredData
      .map(data => `    <script type="application/ld+json">${JSON.stringify(data)}</script>`)
      .join('\n');
    html = html.replace('</head>', `${jsonLd}\n  </head>`);
  }

  return html;
}

function injectPrerenderBody(html: string, route: PrerenderRoute) {
  if (!route.heading) return html;

  const intro = route.intro ?? route.description;
  const body = `<main>
    <h1>${escapeHtml(route.heading)}</h1>
    <p>${escapeHtml(intro)}</p>
  </main>`;
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

function writeRouteHtml(distDir: string, route: PrerenderRoute, template: string) {
  const html = injectPrerenderBody(applyRouteSeo(template, route), route);
  const outputPath =
    route.path === '/'
      ? join(distDir, 'index.html')
      : join(distDir, route.path.slice(1), 'index.html');

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html);
  console.log(`Prerendered ${route.path} -> ${outputPath}`);
}

const distDir = join(process.cwd(), 'dist');
const templatePath = join(distDir, 'index.html');

if (!existsSync(templatePath)) {
  console.error('prerender: dist/index.html not found. Run `vite build` before `npm run prerender`.');
  process.exit(1);
}

const template = readFileSync(templatePath, 'utf8');

buildRoutes().forEach(route => writeRouteHtml(distDir, route, template));
console.log('Prerender complete.');
