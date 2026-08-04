import {
  buildCanonicalDestination,
  buildRequestRedirect,
  CANONICAL_HOST,
  CANONICAL_ORIGIN,
} from '../worker/index';
import { buildLocalizedCanonicalUrl } from '../src/seo/config';

type RedirectCase = {
  name: string;
  url: string;
  headers?: Record<string, string>;
  expectRedirect: boolean;
  expectedLocation?: string;
};

const cases: RedirectCase[] = [
  {
    name: 'apex https homepage is canonical',
    url: `${CANONICAL_ORIGIN}/`,
    expectRedirect: false,
  },
  {
    name: 'apex http homepage',
    url: `http://${CANONICAL_HOST}/`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/`,
  },
  {
    name: 'www https homepage',
    url: `https://www.${CANONICAL_HOST}/`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/`,
  },
  {
    name: 'www http deep link',
    url: `http://www.${CANONICAL_HOST}/blog/marathoncheats-esp?ref=test`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/blog/marathoncheats-esp?ref=test`,
  },
  {
    name: 'apex https via forwarded proto on localized blog',
    url: `http://${CANONICAL_HOST}/de/blog`,
    headers: { 'X-Forwarded-Proto': 'https' },
    expectRedirect: false,
  },
  {
    name: 'www https store page',
    url: `https://www.${CANONICAL_HOST}/marathoncheats-buy`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/marathoncheats-buy`,
  },
  {
    name: '/en prefix strips to root',
    url: `${CANONICAL_ORIGIN}/en`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/`,
  },
  {
    name: '/en/ prefix strips to root with slash',
    url: `${CANONICAL_ORIGIN}/en/`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/`,
  },
  {
    name: '/en/blog strips to /blog',
    url: `${CANONICAL_ORIGIN}/en/blog`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/blog`,
  },
  {
    name: 'www https video watch page redirects to homepage',
    url: `https://www.${CANONICAL_HOST}/videos/marathon-hero-demo`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/`,
  },
  {
    name: 'apex https video watch page redirects to store',
    url: `${CANONICAL_ORIGIN}/videos/marathon-feature-demo`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/marathoncheats-buy`,
  },
  {
    name: 'www http video watch page single-hop redirect',
    url: `http://www.${CANONICAL_HOST}/videos/marathon-hero-demo?ref=test`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/?ref=test`,
  },
  {
    name: 'localized german homepage is canonical',
    url: `${CANONICAL_ORIGIN}/de/`,
    expectRedirect: false,
  },
  {
    name: '/en/sitemap.xml strips to /sitemap.xml',
    url: `${CANONICAL_ORIGIN}/en/sitemap.xml`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/sitemap.xml`,
  },
  {
    name: '/en/sitemap.xml/ strips to /sitemap.xml',
    url: `${CANONICAL_ORIGIN}/en/sitemap.xml/`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/sitemap.xml`,
  },
  {
    name: 'sitemap.xml trailing slash redirects to canonical',
    url: `${CANONICAL_ORIGIN}/sitemap.xml/`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/sitemap.xml`,
  },
  {
    name: 'sitemap-index.xml is served at root without locale redirect',
    url: `${CANONICAL_ORIGIN}/sitemap-index.xml`,
    expectRedirect: false,
  },
  {
    name: 'sitemap.xml is served at root without locale redirect',
    url: `${CANONICAL_ORIGIN}/sitemap.xml`,
    expectRedirect: false,
  },
  {
    name: 'robots.txt is served at root without locale redirect',
    url: `${CANONICAL_ORIGIN}/robots.txt`,
    expectRedirect: false,
  },
  {
    name: 'static assets are served without locale redirect',
    url: `${CANONICAL_ORIGIN}/assets/app.js`,
    expectRedirect: false,
  },
  {
    name: 'vite bundle assets are served without locale redirect',
    url: `${CANONICAL_ORIGIN}/assets/index-CA_rzBk1.js`,
    expectRedirect: false,
  },
  {
    name: 'astro build assets are served without locale redirect',
    url: `${CANONICAL_ORIGIN}/_astro/page.abc123.js`,
    expectRedirect: false,
  },
  {
    name: '/en/assets strips to /assets without redirect loop',
    url: `${CANONICAL_ORIGIN}/en/assets/index-CA_rzBk1.js`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/assets/index-CA_rzBk1.js`,
  },
  {
    name: '/de/sitemap.xml redirects to canonical /sitemap.xml',
    url: `${CANONICAL_ORIGIN}/de/sitemap.xml`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/sitemap.xml`,
  },
  {
    name: '/fr/sitemap-index.xml redirects to canonical /sitemap-index.xml',
    url: `${CANONICAL_ORIGIN}/fr/sitemap-index.xml`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/sitemap-index.xml`,
  },
  {
    name: '/de/video-sitemap.xml redirects to canonical /video-sitemap.xml',
    url: `${CANONICAL_ORIGIN}/de/video-sitemap.xml`,
    expectRedirect: true,
    expectedLocation: `${CANONICAL_ORIGIN}/video-sitemap.xml`,
  },
];

const errors: string[] = [];

cases.forEach(testCase => {
  const request = new Request(testCase.url, { headers: testCase.headers });
  const response = buildRequestRedirect(request);

  if (testCase.expectRedirect) {
    if (!response) {
      errors.push(`${testCase.name}: expected redirect, got none`);
      return;
    }

    if (response.status !== 301) {
      errors.push(`${testCase.name}: expected 301, got ${response.status}`);
    }

    const location = response.headers.get('Location');
    if (location !== testCase.expectedLocation) {
      errors.push(`${testCase.name}: expected Location ${testCase.expectedLocation}, got ${location}`);
    }
  } else if (response) {
    errors.push(`${testCase.name}: expected no redirect, got ${response.headers.get('Location')}`);
  }
});

const destination = buildCanonicalDestination('/blog/', '?utm=1');
if (destination.toString() !== `${CANONICAL_ORIGIN}/blog?utm=1`) {
  errors.push(`buildCanonicalDestination should drop trailing slashes: ${destination.toString()}`);
}

if (buildLocalizedCanonicalUrl('en', '/') !== `${CANONICAL_ORIGIN}/`) {
  errors.push(`English homepage canonical must be the root URL: ${buildLocalizedCanonicalUrl('en', '/')}`);
}

if (buildLocalizedCanonicalUrl('en', '/blog') !== `${CANONICAL_ORIGIN}/blog`) {
  errors.push(`English blog canonical must not end with a trailing slash: ${buildLocalizedCanonicalUrl('en', '/blog')}`);
}

if (buildLocalizedCanonicalUrl('de', '/') !== `${CANONICAL_ORIGIN}/de/`) {
  errors.push(`German homepage canonical must use /de/: ${buildLocalizedCanonicalUrl('de', '/')}`);
}

if (errors.length > 0) {
  console.error('Canonical redirect validation failed:');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Canonical redirect validation passed for ${cases.length} cases.`);
