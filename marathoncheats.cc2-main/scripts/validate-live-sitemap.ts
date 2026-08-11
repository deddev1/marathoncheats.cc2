import { SEO_ASSET_PATHS } from '../src/seo/localePaths';
import { SITE_URL } from '../src/seo/config';
import { parseSitemapLocs, SITEMAP_INDEX_URL, SITEMAP_URL } from './sitemap-utils';

const ORIGIN = SITE_URL.replace(/\/$/, '');

const errors: string[] = [];

function fail(message: string) {
  errors.push(message);
}

function looksLikeHtml(body: string) {
  const trimmed = body.trimStart().toLowerCase();
  return trimmed.startsWith('<!doctype html') || trimmed.startsWith('<html');
}

async function fetchText(url: string, init?: RequestInit) {
  const response = await fetch(url, init);
  const body = await response.text();
  return { response, body };
}

async function expectXmlAsset(path: string) {
  const url = `${ORIGIN}${path}`;
  const { response, body } = await fetchText(url);

  if (!response.ok) {
    fail(`${path} returned HTTP ${response.status}, expected 200.`);
    return;
  }

  const contentType = response.headers.get('Content-Type') ?? '';
  if (!contentType.includes('xml')) {
    fail(`${path} Content-Type must be XML, got "${contentType}".`);
  }

  if (looksLikeHtml(body)) {
    fail(`${path} returned HTML instead of XML.`);
    return;
  }

  if (!body.trimStart().startsWith('<?xml')) {
    fail(`${path} must start with an XML declaration.`);
  }
}

async function expectRedirect(fromPath: string, toUrl: string) {
  const response = await fetch(`${ORIGIN}${fromPath}`, { redirect: 'manual' });
  if (response.status !== 301 && response.status !== 302) {
    fail(`${fromPath} should redirect with 301/302, got ${response.status}.`);
    return;
  }

  const location = response.headers.get('Location');
  if (location !== toUrl) {
    fail(`${fromPath} should redirect to ${toUrl}, got ${location ?? 'no Location header'}.`);
  }
}

async function main() {
  for (const path of SEO_ASSET_PATHS) {
    if (path.endsWith('.xml')) {
      await expectXmlAsset(path);
    } else if (path === '/robots.txt') {
      const { response, body } = await fetchText(`${ORIGIN}${path}`);
      if (!response.ok) fail(`/robots.txt returned HTTP ${response.status}.`);
      if (!body.includes(`Sitemap: ${SITEMAP_INDEX_URL}`)) {
        fail(`robots.txt must reference ${SITEMAP_INDEX_URL}.`);
      }
    }
  }

  await expectRedirect('/en/sitemap.xml', `${SITEMAP_URL}`);
  await expectRedirect('/de/sitemap.xml', `${SITEMAP_URL}`);
  await expectRedirect('/sitemap.xml/', `${SITEMAP_URL}`);

  const { body: sitemapXml } = await fetchText(`${SITEMAP_URL}`);
  const locs = parseSitemapLocs(sitemapXml);

  if (locs.length === 0) {
    fail('sitemap.xml contains no <loc> entries.');
  }

  for (const loc of locs) {
    if (loc.includes('/en/')) {
      fail(`sitemap.xml must not include /en/ URLs: ${loc}`);
    }

    const pageResponse = await fetch(loc, { redirect: 'manual' });
    if (pageResponse.status !== 200 && pageResponse.status !== 301 && pageResponse.status !== 302) {
      fail(`Sitemap URL returned HTTP ${pageResponse.status}: ${loc}`);
    }
  }

  const { body: indexXml } = await fetchText(`${SITEMAP_INDEX_URL}`);
  const childSitemaps = parseSitemapLocs(indexXml);
  for (const child of childSitemaps) {
    const { response, body } = await fetchText(child);
    if (!response.ok) {
      fail(`Child sitemap ${child} returned HTTP ${response.status}.`);
    }
    if (looksLikeHtml(body)) {
      fail(`Child sitemap ${child} returned HTML.`);
    }
  }

  if (errors.length > 0) {
    console.error('Live sitemap validation failed:');
    errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log(
    `Live sitemap validation passed (${SEO_ASSET_PATHS.size} SEO assets, ${locs.length} sitemap URLs, ${childSitemaps.length} index children).`,
  );
}

main().catch(error => {
  console.error('Live sitemap validation crashed:', error);
  process.exit(1);
});
