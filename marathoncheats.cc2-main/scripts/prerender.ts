import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { getSiteVideo } from '../src/content/videos';
import { STORE_FAQS } from '../src/content/faqs';
import { BLOG_POSTS } from '../src/content/blogPosts';
import { buildFaqPageSchema } from '../src/seo/faqSchema';
import {
  buildBlogPostTitle,
  buildLocalizedCanonicalUrl,
  DEFAULT_OG_IMAGE,
  HOME_SEO,
  ROUTE_PATHS,
  getRouteSeo,
  getBlogPostSeo,
  SITE_URL,
} from '../src/seo/config';
import { IMAGE_SEO_REGISTRY } from '../src/content/imageSeo';
import { buildBreadcrumbJsonLd, AIMBOT_BREADCRUMB } from '../src/seo/breadcrumbSchema';
import { buildHomepageImageSchemas, buildImageGallerySchema } from '../src/seo/imageSchema';
import { getHomePageHeading } from '../src/seo/localized/pageHeadings';
import { getLocalizedHomeFaqs } from '../src/seo/localized/faqs';
import { SEO_LOCALES, type SeoLocaleCode, getSeoLocale, seoLocaleToI18n, toOgLocaleFromSeo } from '../src/seo/locales';
import { buildLocalizedPath, buildHreflangAlternates, parseLocalePath } from '../src/seo/localePaths';
import { buildVideoObjectJsonLd } from '../src/seo/videoSchema';
import { buildSoftwareApplicationSchema } from '../src/seo/softwareApplicationSchema';
import { getLegalHeading } from '../src/seo/pageHeadings';

type PrerenderRoute = {
  path: string;
  locale: SeoLocaleCode;
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

function replaceHtmlLang(html: string, lang: string) {
  return html.replace(/<html([^>]*)lang="[^"]*"/i, `<html$1lang="${escapeHtml(lang)}"`);
}

function injectHreflangLinks(html: string, appPath: string) {
  const links = buildHreflangAlternates(appPath)
    .map(
      alternate =>
        `    <link rel="alternate" hreflang="${escapeHtml(alternate.hreflang)}" href="${escapeHtml(alternate.href)}" />`,
    )
    .join('\n');
  return html.replace('</head>', `${links}\n  </head>`);
}

function replaceTitle(html: string, title: string) {
  return html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
}

function toIsoDate(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString().slice(0, 10) : parsed.toISOString().slice(0, 10);
}

function buildRoutesForLocale(locale: SeoLocaleCode): PrerenderRoute[] {
  const heroVideo = getSiteVideo('marathon-hero-demo');
  const featureVideo = getSiteVideo('marathon-feature-demo');
  const homeHeading = getHomePageHeading(locale);

  const storeStructuredData = [
    buildSoftwareApplicationSchema({
      url: buildLocalizedCanonicalUrl(locale, ROUTE_PATHS.store),
      description: getRouteSeo('store', locale).description,
    }),
    buildFaqPageSchema(STORE_FAQS),
    buildBreadcrumbJsonLd(
      [
        { name: 'Home', path: '/' },
        { name: 'Buy Marathon Cheats', path: ROUTE_PATHS.store },
      ],
      locale,
    ),
    ...(featureVideo ? [buildVideoObjectJsonLd(featureVideo)] : []),
  ];

  const blogImages = IMAGE_SEO_REGISTRY.filter(entry => entry.pagePath.startsWith('/blog'));
  const blogGallery = buildImageGallerySchema(ROUTE_PATHS.blog, blogImages);

  const legalRoutes: PrerenderRoute[] = [ROUTE_PATHS.terms, ROUTE_PATHS.privacy, ROUTE_PATHS.refund].map(path => {
    const routeKey = path === ROUTE_PATHS.terms ? 'terms' : path === ROUTE_PATHS.privacy ? 'privacy' : 'refund';
    const meta = getRouteSeo(routeKey, locale);
    const heading = getLegalHeading(path)!;
    return {
      path: buildLocalizedPath(locale, path),
      locale,
      title: meta.title,
      description: meta.description,
      heading: heading.h1,
      intro: heading.intro,
    };
  });

  const routes: PrerenderRoute[] = [
    {
      path: buildLocalizedPath(locale, '/'),
      locale,
      title: HOME_SEO[locale].title,
      description: HOME_SEO[locale].description,
      heading: homeHeading.h1,
      intro: homeHeading.intro,
      includeHomeJsonLd: locale === 'en',
      structuredData: [
        buildFaqPageSchema(getLocalizedHomeFaqs(locale)),
        buildBreadcrumbJsonLd(AIMBOT_BREADCRUMB, locale),
        ...buildHomepageImageSchemas(),
        ...(heroVideo ? [buildVideoObjectJsonLd(heroVideo)] : []),
      ],
    },
    {
      path: buildLocalizedPath(locale, ROUTE_PATHS.store),
      locale,
      title: getRouteSeo('store', locale).title,
      description: getRouteSeo('store', locale).description,
      heading: 'Marathon Cheat pricing & features',
      intro: getRouteSeo('store', locale).description,
      structuredData: storeStructuredData,
    },
    {
      path: buildLocalizedPath(locale, ROUTE_PATHS.blog),
      locale,
      title: getRouteSeo('blog', locale).title,
      description: getRouteSeo('blog', locale).description,
      heading: 'Marathon Cheat Guides',
      intro: getRouteSeo('blog', locale).description,
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Marathon Cheat Guides',
          description: getRouteSeo('blog', locale).description,
          url: buildLocalizedCanonicalUrl(locale, ROUTE_PATHS.blog),
          inLanguage: locale,
        },
        ...(blogGallery ? [blogGallery] : []),
      ],
    },
    ...legalRoutes,
    ...BLOG_POSTS.map(post => {
      const appPath = `/blog/${post.slug}`;
      const path = buildLocalizedPath(locale, appPath);
      const canonicalUrl = buildLocalizedCanonicalUrl(locale, appPath);
      const publishedTime = toIsoDate(post.date);
      const postSeo = getBlogPostSeo(post.slug, locale);
      const title = postSeo?.title ?? buildBlogPostTitle(post.title, locale);
      const description = postSeo?.description ?? post.excerpt;

      return {
        path,
        locale,
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
            inLanguage: locale,
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
          buildBreadcrumbJsonLd(
            [
              { name: 'Home', path: '/' },
              { name: 'Blog', path: ROUTE_PATHS.blog },
              { name: post.title, path: appPath },
            ],
            locale,
          ),
        ],
      };
    }),
  ];

  return routes;
}

function buildRoutes(): PrerenderRoute[] {
  return SEO_LOCALES.flatMap(locale => buildRoutesForLocale(locale.code));
}

function applyRouteSeo(template: string, route: PrerenderRoute) {
  const { locale, path: appPath } = parseLocalePath(route.path);
  const canonical = buildLocalizedCanonicalUrl(locale, appPath);
  const image = route.image ? `${SITE_URL}${route.image}` : DEFAULT_OG_IMAGE;
  const robots = route.noindex ? 'noindex, follow' : 'index, follow';
  const type = route.type ?? 'website';

  const localeMeta = getSeoLocale(locale);
  const lang = seoLocaleToI18n(locale);
  const ogLocale = localeMeta?.ogLocale ?? 'en_US';

  let html = template;
  html = replaceHtmlLang(html, lang);
  html = replaceTitle(html, route.title);
  html = replaceMetaContent(html, 'name="description"', route.description);
  html = replaceMetaContent(html, 'name="robots"', robots);
  html = replaceLinkHref(html, 'canonical', canonical);
  html = replaceMetaContent(html, 'property="og:type"', type);
  html = replaceMetaContent(html, 'property="og:url"', canonical);
  html = replaceMetaContent(html, 'property="og:locale"', ogLocale);
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
  html = injectHreflangLinks(html, appPath);

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
      : join(distDir, route.path.replace(/^\//, ''), 'index.html');

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
