import { SITE_VIDEOS, getVideoWatchPath } from '../src/content/videos';
import {
  SEO_ASSET_PATHS,
  buildCanonicalPathRedirect,
  buildEnPrefixStripRedirect,
  buildSeoAssetTrailingSlashRedirect,
  isStaticAssetPath,
  parseLocalePath,
} from '../src/seo/localePaths';

/** Must match `SITE_URL` in src/seo/config.ts */
export const CANONICAL_ORIGIN = 'https://marathoncheats.cc';
export const CANONICAL_HOST = 'marathoncheats.cc';

type Env = {
  ASSETS: Fetcher;
};

/** Thin video landing pages redirect to the page where the clip is embedded. */
export const VIDEO_WATCH_REDIRECTS: Record<string, string> = Object.fromEntries(
  SITE_VIDEOS.map(video => [getVideoWatchPath(video), video.embedPath]),
);

const SECURITY_HEADERS: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '1; mode=block',
};

const LONG_CACHE_PATH_PREFIXES = ['/assets/', '/_astro/', '/images/', '/videos/'];
const SHORT_CACHE_PATHS = new Set([
  '/sitemap-index.xml',
  '/sitemap.xml',
  '/video-sitemap.xml',
  '/image-sitemap.xml',
  '/robots.txt',
]);

const SEO_ASSET_CONTENT_TYPES: Record<string, string> = {
  '/robots.txt': 'text/plain; charset=utf-8',
  '/sitemap-index.xml': 'application/xml; charset=utf-8',
  '/sitemap.xml': 'application/xml; charset=utf-8',
  '/video-sitemap.xml': 'application/xml; charset=utf-8',
  '/image-sitemap.xml': 'application/xml; charset=utf-8',
};

function normalizePathname(pathname: string) {
  return pathname === '/' ? '/' : pathname.replace(/\/$/, '') || '/';
}

/**
 * Resolve a request path to its canonical static asset path.
 * Strips mistaken /en or locale prefixes (e.g. /de/sitemap.xml -> /sitemap.xml).
 */
export function resolveStaticAssetPathname(pathname: string): string | null {
  const normalized = normalizePathname(pathname);
  if (isStaticAssetPath(normalized)) return normalized;

  if (normalized.startsWith('/en/')) {
    const stripped = normalizePathname(normalized.slice(3) || '/');
    if (isStaticAssetPath(stripped)) return stripped;
  }

  const { path } = parseLocalePath(normalized);
  if (SEO_ASSET_PATHS.has(path)) return path;

  return null;
}

function mustNotReturnHtml(pathname: string): boolean {
  return (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/_astro/') ||
    /\.(js|mjs|css)(\?|$)/i.test(pathname)
  );
}

function looksLikeHtml(body: string) {
  const trimmed = body.trimStart().toLowerCase();
  return trimmed.startsWith('<!doctype html') || trimmed.startsWith('<html');
}

function notFoundResponse(pathname: string): Response {
  const headers = new Headers();
  applyResponseHeaders(pathname, headers);
  return new Response('Not Found', { status: 404, headers });
}

/** Serve robots/sitemap files directly so SPA fallback never returns HTML to crawlers. */
export async function serveSeoAsset(request: Request, env: Env, pathname: string): Promise<Response | null> {
  const normalized = normalizePathname(pathname);
  if (!SEO_ASSET_PATHS.has(normalized)) return null;

  const assetUrl = new URL(normalized, request.url);
  const assetResponse = await env.ASSETS.fetch(new Request(assetUrl.toString(), request));
  if (!assetResponse.ok) return null;

  const body = await assetResponse.text();
  if (looksLikeHtml(body)) return null;

  const headers = new Headers();
  headers.set('Content-Type', SEO_ASSET_CONTENT_TYPES[normalized] ?? 'application/xml; charset=utf-8');
  applyResponseHeaders(normalized, headers);
  return new Response(body, { status: 200, headers });
}

/** Fetch a static asset at its canonical path and reject SPA HTML masquerading as JS/CSS. */
export async function serveStaticAsset(request: Request, env: Env, pathname: string): Promise<Response> {
  const requestUrl = new URL(request.url);
  const assetUrl = new URL(pathname + requestUrl.search, request.url);
  const assetResponse = await env.ASSETS.fetch(new Request(assetUrl.toString(), request));

  if (assetResponse.ok && mustNotReturnHtml(pathname)) {
    const contentType = assetResponse.headers.get('Content-Type') ?? '';
    if (contentType.includes('text/html')) {
      return notFoundResponse(pathname);
    }

    const body = await assetResponse.clone().text();
    if (looksLikeHtml(body)) {
      return notFoundResponse(pathname);
    }
  }

  return withResponseHeaders(assetResponse, pathname);
}

function requestUsesHttps(request: Request, requestUrl: URL) {
  if (requestUrl.protocol === 'https:') return true;

  const forwardedProto = request.headers.get('X-Forwarded-Proto')?.split(',')[0]?.trim().toLowerCase();
  if (forwardedProto === 'https') return true;

  const cfVisitor = request.headers.get('CF-Visitor');
  if (cfVisitor) {
    try {
      const visitor = JSON.parse(cfVisitor) as { scheme?: string };
      if (visitor.scheme === 'https') return true;
    } catch {
      // Ignore malformed CF-Visitor values.
    }
  }

  return false;
}

/** Build the canonical destination URL for a request path and query string. */
export function buildCanonicalDestination(pathname: string, search = '') {
  if (pathname === '/') {
    return new URL(`/${search}`, CANONICAL_ORIGIN);
  }

  if (/^\/[a-z]{2}(-[a-z]{2})?\/$/.test(pathname)) {
    return new URL(`${pathname}${search}`, CANONICAL_ORIGIN);
  }

  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  return new URL(`${normalizedPath}${search}`, CANONICAL_ORIGIN);
}

/**
 * Returns a 301 redirect when the request host, protocol, or path is non-canonical.
 * Canonical site: https://marathoncheats.cc (non-www, HTTPS).
 * Legacy /videos/:slug watch pages redirect to their embed page in one hop.
 */
export function buildRequestRedirect(request: Request): Response | null {
  const requestUrl = new URL(request.url);
  const hostname = requestUrl.hostname.toLowerCase();
  const isCanonicalHost = hostname === CANONICAL_HOST;
  const isWwwHost = hostname === `www.${CANONICAL_HOST}`;

  if (!isCanonicalHost && !isWwwHost) {
    return null;
  }

  const rawPathname = requestUrl.pathname;
  const pathname = rawPathname === '/' ? '/' : rawPathname.replace(/\/$/, '') || '/';
  const staticAssetPath = resolveStaticAssetPathname(pathname);

  const usesHttps = requestUsesHttps(request, requestUrl);
  const needsHttpsRedirect = !usesHttps;
  const needsWwwRedirect = isWwwHost;

  // Static assets: host/protocol normalization and /en prefix stripping only — never locale rewriting.
  if (staticAssetPath) {
    const needsEnPrefixStrip = staticAssetPath !== pathname;
    const slashCheckPath =
      rawPathname.endsWith('/') && rawPathname !== '/' ? rawPathname : null;
    const seoTrailingSlashRedirect = slashCheckPath
      ? buildSeoAssetTrailingSlashRedirect(slashCheckPath, requestUrl.search)
      : null;

    if (seoTrailingSlashRedirect) {
      return Response.redirect(seoTrailingSlashRedirect, 301);
    }

    if (!needsHttpsRedirect && !needsWwwRedirect && !needsEnPrefixStrip) {
      return null;
    }

    const destination = buildCanonicalDestination(staticAssetPath, requestUrl.search);
    return Response.redirect(destination.toString(), 301);
  }

  const embedPath = VIDEO_WATCH_REDIRECTS[pathname];

  let destinationPath = embedPath ?? pathname;
  const localeRedirect = buildEnPrefixStripRedirect(destinationPath);
  if (localeRedirect) {
    destinationPath = new URL(localeRedirect).pathname;
  }

  const canonicalPathRedirect = buildCanonicalPathRedirect(rawPathname, requestUrl.search);
  if (canonicalPathRedirect) {
    destinationPath = new URL(canonicalPathRedirect).pathname;
  }

  const slashCheckPath =
    rawPathname.endsWith('/') && rawPathname !== '/' ? `${destinationPath}/` : destinationPath;
  const seoTrailingSlashRedirect = buildSeoAssetTrailingSlashRedirect(slashCheckPath, requestUrl.search);
  if (seoTrailingSlashRedirect) {
    destinationPath = new URL(seoTrailingSlashRedirect).pathname;
  }

  const needsVideoRedirect = Boolean(embedPath);
  const needsLocaleRedirect = Boolean(localeRedirect);
  const needsCanonicalPathRedirect = Boolean(canonicalPathRedirect);
  const needsSeoTrailingSlashRedirect = Boolean(seoTrailingSlashRedirect);

  if (
    !needsHttpsRedirect &&
    !needsWwwRedirect &&
    !needsVideoRedirect &&
    !needsLocaleRedirect &&
    !needsCanonicalPathRedirect &&
    !needsSeoTrailingSlashRedirect
  ) {
    return null;
  }

  const destination = buildCanonicalDestination(destinationPath, requestUrl.search);
  return Response.redirect(destination.toString(), 301);
}

/** @deprecated Use buildRequestRedirect */
export function buildCanonicalRedirect(request: Request): Response | null {
  return buildRequestRedirect(request);
}

export function applyResponseHeaders(pathname: string, headers: Headers) {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }

  if (LONG_CACHE_PATH_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return;
  }

  if (SHORT_CACHE_PATHS.has(pathname)) {
    headers.set('Cache-Control', 'public, max-age=86400');
    if (pathname.endsWith('.xml')) {
      headers.set('Content-Type', 'application/xml; charset=utf-8');
    }
  }
}

export function withResponseHeaders(response: Response, pathname: string) {
  const headers = new Headers(response.headers);
  applyResponseHeaders(pathname, headers);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const requestUrl = new URL(request.url);
    const staticAssetPath = resolveStaticAssetPathname(requestUrl.pathname);

    // Serve static assets before any page-route / SPA catch-all logic.
    if (staticAssetPath) {
      const redirect = buildRequestRedirect(request);
      if (redirect) {
        return withResponseHeaders(redirect, requestUrl.pathname);
      }

      if (SEO_ASSET_PATHS.has(staticAssetPath)) {
        const seoAsset = await serveSeoAsset(request, env, staticAssetPath);
        if (seoAsset) {
          return seoAsset;
        }
      }

      return serveStaticAsset(request, env, staticAssetPath);
    }

    const redirect = buildRequestRedirect(request);
    if (redirect) {
      return withResponseHeaders(redirect, requestUrl.pathname);
    }

    const pathname = normalizePathname(requestUrl.pathname);
    const seoAsset = await serveSeoAsset(request, env, pathname);
    if (seoAsset) {
      return seoAsset;
    }

    const assetResponse = await env.ASSETS.fetch(request);
    return withResponseHeaders(assetResponse, pathname);
  },
} satisfies ExportedHandler<Env>;
