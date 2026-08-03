import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { StickyBuyBar } from './components/StickyBuyBar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/Home';
import { StorePage } from './pages/Store';
import { STORE_FAQS } from './content/faqs';
import { BLOG_POSTS } from './content/blogPosts';
import { BlogListPage, BlogPostPage } from './pages/Blog';
import { VideoPage } from './pages/VideoPage';
import { NotFoundPage } from './pages/NotFound';
import { TermsPage, PrivacyPage, RefundPage } from './pages/Legal';
import { I18nProvider } from './i18n';
import { DEFAULT_OG_IMAGE, SITE_URL, Seo } from './components/Seo';
import { getSiteVideo } from './content/videos';
import {
  HOME_SEO,
  ROUTE_PATHS,
  getRouteSeo,
  getBlogPostSeo,
  buildBlogPostTitle,
} from './seo/config';
import { buildFaqPageSchema } from './seo/faqSchema';
import { buildBreadcrumbJsonLd, AIMBOT_BREADCRUMB } from './seo/breadcrumbSchema';
import { buildHomepageImageSchemas, buildImageGallerySchema } from './seo/imageSchema';
import { buildVideoObjectJsonLd } from './seo/videoSchema';
import { buildSoftwareApplicationSchema } from './seo/softwareApplicationSchema';
import { IMAGE_SEO_REGISTRY, getImageSeoOrFallback } from './content/imageSeo';
import { parseLocalePath, buildLocalizedCanonicalUrl } from './seo/localePaths';
import { getLocalizedHomeFaqs } from './seo/localized/faqs';
import { EnPrefixRedirect, LocaleLayout } from './components/LocaleLayout';
import { seoLocaleToI18n } from './seo/locales';
import './globals.css';

function toIsoDate(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? date : parsed.toISOString().slice(0, 10);
}

function RouteSeo() {
  const { pathname } = useLocation();
  const { locale, path: appPath } = parseLocalePath(pathname);
  const i18nLang = seoLocaleToI18n(locale);
  const localizedHome = HOME_SEO[locale];

  if (appPath === ROUTE_PATHS.blog) {
    const blogMeta = getRouteSeo('blog', locale);
    const blogImages = IMAGE_SEO_REGISTRY.filter(entry => entry.pagePath.startsWith('/blog'));
    const blogGallery = buildImageGallerySchema(ROUTE_PATHS.blog, blogImages);

    return (
      <Seo
        title={blogMeta.title}
        description={blogMeta.description}
        path={ROUTE_PATHS.blog}
        locale={locale}
        lang={i18nLang}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Marathon Cheat Guides',
            description: blogMeta.description,
            url: buildLocalizedCanonicalUrl(locale, ROUTE_PATHS.blog),
            inLanguage: locale,
            publisher: {
              '@type': 'Organization',
              name: 'Marathon Cheats',
              url: SITE_URL,
            },
          },
          ...(blogGallery ? [blogGallery] : []),
        ]}
      />
    );
  }

  if (appPath.startsWith('/blog/')) {
    const slug = appPath.replace('/blog/', '');
    const post = BLOG_POSTS.find(entry => entry.slug === slug);

    if (!post) {
      const notFound = getRouteSeo('notFound', locale);
      return (
        <Seo
          title={notFound.title}
          description={notFound.description}
          path={appPath}
          locale={locale}
          lang={i18nLang}
          noindex
        />
      );
    }

    const canonicalPath = `/blog/${post.slug}`;
    const canonicalUrl = buildLocalizedCanonicalUrl(locale, canonicalPath);
    const publishedTime = toIsoDate(post.date);
    const postSeo = getBlogPostSeo(post.slug, locale);
    const metaTitle = postSeo?.title ?? buildBlogPostTitle(post.title, locale);
    const metaDescription = postSeo?.description ?? post.excerpt;
    const imageMeta = getImageSeoOrFallback(post.image, post.title);

    return (
      <Seo
        title={metaTitle}
        description={metaDescription}
        path={canonicalPath}
        locale={locale}
        lang={i18nLang}
        image={post.image}
        imageAlt={imageMeta.alt}
        type="article"
        publishedTime={publishedTime}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: metaDescription,
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
              { name: post.title, path: canonicalPath },
            ],
            locale,
          ),
        ]}
      />
    );
  }

  if (appPath === ROUTE_PATHS.store) {
    const storeMeta = getRouteSeo('store', locale);
    const featureVideo = getSiteVideo('marathon-feature-demo');

    return (
      <Seo
        title={storeMeta.title}
        description={storeMeta.description}
        path={ROUTE_PATHS.store}
        locale={locale}
        lang={i18nLang}
        structuredData={[
          buildSoftwareApplicationSchema({
            url: buildLocalizedCanonicalUrl(locale, ROUTE_PATHS.store),
            description: storeMeta.description,
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
        ]}
      />
    );
  }

  if (appPath.startsWith('/videos/')) {
    return null;
  }

  if (appPath === ROUTE_PATHS.terms) {
    const meta = getRouteSeo('terms', locale);
    return (
      <Seo title={meta.title} description={meta.description} path={ROUTE_PATHS.terms} locale={locale} lang={i18nLang} />
    );
  }

  if (appPath === ROUTE_PATHS.privacy) {
    const meta = getRouteSeo('privacy', locale);
    return (
      <Seo title={meta.title} description={meta.description} path={ROUTE_PATHS.privacy} locale={locale} lang={i18nLang} />
    );
  }

  if (appPath === ROUTE_PATHS.refund) {
    const meta = getRouteSeo('refund', locale);
    return (
      <Seo title={meta.title} description={meta.description} path={ROUTE_PATHS.refund} locale={locale} lang={i18nLang} />
    );
  }

  if (appPath !== '/') {
    const notFound = getRouteSeo('notFound', locale);
    return (
      <Seo
        title={notFound.title}
        description={notFound.description}
        path={appPath}
        locale={locale}
        lang={i18nLang}
        noindex
      />
    );
  }

  const heroVideo = getSiteVideo('marathon-hero-demo');

  return (
    <Seo
      title={localizedHome.title}
      description={localizedHome.description}
      path="/"
      locale={locale}
      lang={i18nLang}
      includeHomeJsonLd
      structuredData={[
        buildFaqPageSchema(getLocalizedHomeFaqs(locale)),
        buildBreadcrumbJsonLd(AIMBOT_BREADCRUMB, locale),
        ...buildHomepageImageSchemas(),
        ...(heroVideo ? [buildVideoObjectJsonLd(heroVideo)] : []),
      ]}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <RouteSeo />
        <Navbar />
        <StickyBuyBar />
        <main className="app-main">
          <Routes>
            <Route path="/en" element={<EnPrefixRedirect />} />
            <Route path="/en/*" element={<EnPrefixRedirect />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/marathoncheats-buy" element={<StorePage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/videos/:slug" element={<VideoPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/refund" element={<RefundPage />} />

            <Route path="/:locale" element={<LocaleLayout />}>
              <Route index element={<HomePage />} />
              <Route path="marathoncheats-buy" element={<StorePage />} />
              <Route path="blog" element={<BlogListPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="videos/:slug" element={<VideoPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="refund" element={<RefundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </I18nProvider>
    </BrowserRouter>
  );
}
