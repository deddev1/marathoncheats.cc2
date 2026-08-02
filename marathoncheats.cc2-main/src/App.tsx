import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { StickyBuyBar } from './components/StickyBuyBar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/Home';
import { StorePage } from './pages/Store';
import { STORE_FAQS, HOME_FAQS } from './content/faqs';
import { BLOG_POSTS } from './content/blogPosts';
import { BlogListPage, BlogPostPage } from './pages/Blog';
import { VideoPage } from './pages/VideoPage';
import { NotFoundPage } from './pages/NotFound';
import { TermsPage, PrivacyPage, RefundPage } from './pages/Legal';
import { I18nProvider } from './i18n';
import { useI18n } from './i18n/useI18n';
import { DEFAULT_OG_IMAGE, SITE_URL, Seo } from './components/Seo';
import { getSiteVideo } from './content/videos';
import { HOME_SEO, ROUTE_SEO, BLOG_POST_SEO, buildBlogPostTitle, type LanguageCode } from './seo/config';
import { buildFaqPageSchema } from './seo/faqSchema';
import { buildBreadcrumbJsonLd, AIMBOT_BREADCRUMB } from './seo/breadcrumbSchema';
import { buildHomepageImageSchemas, buildImageGallerySchema } from './seo/imageSchema';
import { buildVideoObjectJsonLd } from './seo/videoSchema';
import { buildSoftwareApplicationSchema } from './seo/softwareApplicationSchema';
import { IMAGE_SEO_REGISTRY, getImageSeoOrFallback } from './content/imageSeo';
import './globals.css';

function toIsoDate(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? date : parsed.toISOString().slice(0, 10);
}

function RouteSeo() {
  const { pathname } = useLocation();
  const { lang } = useI18n();
  const currentPath = pathname !== '/' ? pathname.replace(/\/$/, '') : pathname;
  const localizedHome = HOME_SEO[lang as LanguageCode] ?? HOME_SEO.en;

  if (currentPath === '/blog') {
    const blogImages = IMAGE_SEO_REGISTRY.filter(entry => entry.pagePath.startsWith('/blog'));
    const blogGallery = buildImageGallerySchema('/blog', blogImages);

    return (
      <Seo
        title={ROUTE_SEO.blog.title}
        description={ROUTE_SEO.blog.description}
        path="/blog"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Marathon Cheat Guides',
            description: ROUTE_SEO.blog.description,
            url: `${SITE_URL}/blog`,
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

  if (currentPath.startsWith('/blog/')) {
    const slug = currentPath.replace('/blog/', '');
    const post = BLOG_POSTS.find(entry => entry.slug === slug);

    if (!post) {
      return (
        <Seo
          title={ROUTE_SEO.notFound.title}
          description={ROUTE_SEO.notFound.description}
          path={currentPath}
          noindex
        />
      );
    }

    const canonicalPath = `/blog/${post.slug}`;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const publishedTime = toIsoDate(post.date);

    const postSeo = BLOG_POST_SEO[post.slug];
    const metaTitle = buildBlogPostTitle(post.title);
    const metaDescription = postSeo?.description ?? post.excerpt;
    const imageMeta = getImageSeoOrFallback(post.image, post.title);

    return (
      <Seo
        title={metaTitle}
        description={metaDescription}
        path={canonicalPath}
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
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: canonicalPath },
          ]),
        ]}
      />
    );
  }

  if (currentPath === '/marathoncheats-buy') {
    const featureVideo = getSiteVideo('marathon-feature-demo');

    return (
      <Seo
        title={ROUTE_SEO.store.title}
        description={ROUTE_SEO.store.description}
        path="/marathoncheats-buy"
        structuredData={[
          buildSoftwareApplicationSchema({
            url: `${SITE_URL}/marathoncheats-buy`,
            description: ROUTE_SEO.store.description,
          }),
          buildFaqPageSchema(STORE_FAQS),
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Buy Marathon Cheats', path: '/marathoncheats-buy' },
          ]),
          ...(featureVideo ? [buildVideoObjectJsonLd(featureVideo)] : []),
        ]}
      />
    );
  }

  if (currentPath.startsWith('/videos/')) {
    return null;
  }

  if (currentPath === ROUTE_SEO.terms.path) {
    return <Seo title={ROUTE_SEO.terms.title} description={ROUTE_SEO.terms.description} path={ROUTE_SEO.terms.path} />;
  }

  if (currentPath === ROUTE_SEO.privacy.path) {
    return <Seo title={ROUTE_SEO.privacy.title} description={ROUTE_SEO.privacy.description} path={ROUTE_SEO.privacy.path} />;
  }

  if (currentPath === ROUTE_SEO.refund.path) {
    return <Seo title={ROUTE_SEO.refund.title} description={ROUTE_SEO.refund.description} path={ROUTE_SEO.refund.path} />;
  }

  if (currentPath !== '/') {
    return (
      <Seo
        title={ROUTE_SEO.notFound.title}
        description={ROUTE_SEO.notFound.description}
        path={currentPath}
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
      lang={lang}
      includeHomeJsonLd
      structuredData={[
        buildFaqPageSchema(HOME_FAQS),
        buildBreadcrumbJsonLd(AIMBOT_BREADCRUMB),
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
            <Route path="/" element={<HomePage />} />
            <Route path="/marathoncheats-buy" element={<StorePage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/videos/:slug" element={<VideoPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </I18nProvider>
    </BrowserRouter>
  );
}
