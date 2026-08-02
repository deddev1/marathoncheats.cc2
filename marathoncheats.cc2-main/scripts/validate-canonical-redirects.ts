import {
  buildCanonicalDestination,
  buildRequestRedirect,
  CANONICAL_HOST,
  CANONICAL_ORIGIN,
} from '../worker/index';
import { buildCanonicalUrl } from '../src/seo/config';

type RedirectCase = {
  name: string;
  url: string;
  headers?: Record<string, string>;
  expectRedirect: boolean;
  expectedLocation?: string;
};

const cases: RedirectCase[] = [
  {
    name: 'apex https homepage',
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
    name: 'apex https via forwarded proto',
    url: `http://${CANONICAL_HOST}/blog`,
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

if (buildCanonicalUrl('/') !== `${CANONICAL_ORIGIN}/`) {
  errors.push(`Homepage canonical must end with a trailing slash: ${buildCanonicalUrl('/')}`);
}

if (buildCanonicalUrl('/blog') !== `${CANONICAL_ORIGIN}/blog`) {
  errors.push(`Blog canonical must not end with a trailing slash: ${buildCanonicalUrl('/blog')}`);
}

if (errors.length > 0) {
  console.error('Canonical redirect validation failed:');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Canonical redirect validation passed for ${cases.length} cases.`);
