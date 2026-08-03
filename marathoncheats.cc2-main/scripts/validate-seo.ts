import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import {
  BLOG_POST_SEO,
  HOME_SEO,
  ROUTE_PATHS,
  SEO_LOCALES,
  buildLocalizedCanonicalUrl,
  getRouteSeo,
} from '../src/seo/config';
import { buildLocalizedPath } from '../src/seo/localePaths';

const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 145;
const DESC_MAX = 160;

const CJK_LOCALES = new Set(['ja', 'ko', 'zh-CN']);

function getTitleLimits(locale: string) {
  if (locale === 'en') return { min: TITLE_MIN, max: TITLE_MAX };
  if (CJK_LOCALES.has(locale)) return { min: 27, max: 61 };
  return { min: 45, max: 61 };
}

function getDescLimits(locale: string) {
  if (locale === 'en') return { min: DESC_MIN, max: DESC_MAX };
  if (CJK_LOCALES.has(locale)) return { min: 62, max: DESC_MAX };
  return { min: 130, max: 165 };
}

const FORBIDDEN_PATTERN =
  /\b(best|top rated|top-rated|number 1|no\.?\s*1|leading|ultimate|guaranteed|most powerful|premium provider|undetected|undetectable|safest|premium)\b|#1\b|100%\s*safe|lifetime protection/i;

const STUFFING_WORDS = ['marathon', 'esp', 'aimbot', 'wallhack', 'cheat', 'cheats'];

const distDir = join(process.cwd(), 'dist');
const prerenderMode = process.env.VALIDATE_PRERENDERED_META === '1';

type MetaEntry = { path: string; locale: string; title: string; description: string };

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

function collectSourceMeta(): MetaEntry[] {
  const entries: MetaEntry[] = [];

  for (const locale of SEO_LOCALES) {
    entries.push({
      path: buildLocalizedPath(locale.code, '/'),
      locale: locale.code,
      title: HOME_SEO[locale.code].title,
      description: HOME_SEO[locale.code].description,
    });

    for (const key of ['store', 'blog', 'terms', 'privacy', 'refund', 'notFound'] as const) {
      const appPath = ROUTE_PATHS[key];
      const meta = getRouteSeo(key, locale.code);
      entries.push({
        path: buildLocalizedPath(locale.code, appPath),
        locale: locale.code,
        title: meta.title,
        description: meta.description,
      });
    }

    for (const slug of Object.keys(BLOG_POST_SEO)) {
      const meta = BLOG_POST_SEO[slug as keyof typeof BLOG_POST_SEO][locale.code];
      entries.push({
        path: buildLocalizedPath(locale.code, `/blog/${slug}`),
        locale: locale.code,
        title: meta.title,
        description: meta.description,
      });
    }
  }

  return entries;
}

function walkPrerenderedHtml(dir: string, base = ''): MetaEntry[] {
  if (!existsSync(dir)) {
    return [];
  }

  const entries: MetaEntry[] = [];

  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    if (statSync(fullPath).isDirectory()) {
      entries.push(...walkPrerenderedHtml(fullPath, `${base}/${name}`));
      continue;
    }

    if (name !== 'index.html') continue;

    const html = readFileSync(fullPath, 'utf8');
    const path = base ? `/${base}` : '/';
    entries.push({
      path: path.endsWith('/') ? path : `${path}/`.replace(/\/+/g, '/').replace(/\/$/, '') === path ? path : path,
      title: decodeHtml(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? ''),
      description: decodeHtml(html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? ''),
    });
  }

  return entries;
}

function normalizePrerenderPath(path: string) {
  if (path === '/index.html' || path === '/') return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

function validateLengths(entry: MetaEntry, errors: string[]) {
  const titleLimits = getTitleLimits(entry.locale);
  const descLimits = getDescLimits(entry.locale);

  if (entry.title.length < titleLimits.min || entry.title.length > titleLimits.max) {
    errors.push(
      `${entry.path}: title length ${entry.title.length} (expected ${titleLimits.min}-${titleLimits.max})`,
    );
  }

  if (entry.description.length < descLimits.min || entry.description.length > descLimits.max) {
    errors.push(
      `${entry.path}: description length ${entry.description.length} (expected ${descLimits.min}-${descLimits.max})`,
    );
  }
}

function validateKeywordStuffing(entry: MetaEntry, errors: string[]) {
  const text = `${entry.title} ${entry.description}`.toLowerCase();
  for (const word of STUFFING_WORDS) {
    const count = (text.match(new RegExp(`\\b${word}s?\\b`, 'gi')) ?? []).length;
    if (count >= 6) {
      errors.push(`${entry.path}: keyword stuffing risk for "${word}" (${count} uses)`);
    }
  }
}

function validateSourceMetadata(errors: string[], strings: string[]) {
  collectSourceMeta().forEach(entry => {
    strings.push(entry.title, entry.description);
    validateLengths(entry, errors);
    validateKeywordStuffing(entry, errors);
  });

  const indexHtml = readFileSync(join(process.cwd(), 'index.html'), 'utf8');
  const indexTitle = decodeHtml(indexHtml.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '');
  const indexDescription = decodeHtml(indexHtml.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? '');
  const ogTitle = decodeHtml(indexHtml.match(/<meta property="og:title" content="([^"]*)"/i)?.[1] ?? '');
  const ogDescription = decodeHtml(indexHtml.match(/<meta property="og:description" content="([^"]*)"/i)?.[1] ?? '');
  const twitterTitle = decodeHtml(indexHtml.match(/<meta name="twitter:title" content="([^"]*)"/i)?.[1] ?? '');
  const twitterDescription = decodeHtml(
    indexHtml.match(/<meta name="twitter:description" content="([^"]*)"/i)?.[1] ?? '',
  );
  const canonical = indexHtml.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] ?? '';

  strings.push(indexTitle, indexDescription, ogTitle, ogDescription, twitterTitle, twitterDescription);

  if (indexTitle !== HOME_SEO.en.title) {
    errors.push('index.html <title> does not match HOME_SEO.en.title');
  }
  if (indexDescription !== HOME_SEO.en.description) {
    errors.push('index.html meta description does not match HOME_SEO.en.description');
  }
  if (ogTitle !== HOME_SEO.en.title) {
    errors.push('index.html og:title does not match HOME_SEO.en.title');
  }
  if (ogDescription !== HOME_SEO.en.description) {
    errors.push('index.html og:description does not match HOME_SEO.en.description');
  }
  if (twitterTitle !== HOME_SEO.en.title) {
    errors.push('index.html twitter:title does not match HOME_SEO.en.title');
  }
  if (twitterDescription !== HOME_SEO.en.description) {
    errors.push('index.html twitter:description does not match HOME_SEO.en.description');
  }
  if (canonical !== buildLocalizedCanonicalUrl('en', '/')) {
    errors.push("index.html canonical does not match buildLocalizedCanonicalUrl('en', '/')");
  }

  strings.forEach(value => {
    if (FORBIDDEN_PATTERN.test(value)) {
      errors.push(`Forbidden term in metadata: ${value}`);
    }
  });

  const titleGroups = new Map<string, string[]>();
  const descriptionGroups = new Map<string, string[]>();
  collectSourceMeta().forEach(entry => {
    titleGroups.set(entry.title, [...(titleGroups.get(entry.title) ?? []), entry.path]);
    descriptionGroups.set(entry.description, [...(descriptionGroups.get(entry.description) ?? []), entry.path]);
  });

  for (const [title, paths] of titleGroups) {
    if (paths.length > 1) {
      const locales = paths.map(path => path.split('/')[1] ?? 'en');
      if (new Set(locales).size === paths.length) continue;
      errors.push(`Duplicate title on ${paths.join(', ')}: ${title}`);
    }
  }
  for (const [, paths] of descriptionGroups) {
    if (paths.length > 1) errors.push(`Duplicate description on ${paths.join(', ')}`);
  }

  const homeTitles = Object.values(HOME_SEO).map(entry => entry.title);
  const uniqueHomeTitles = new Set(homeTitles);
  if (uniqueHomeTitles.size !== homeTitles.length) {
    errors.push('Duplicate titles found among HOME_SEO locale variants');
  }

  if (!HOME_SEO.en.title.startsWith('Marathon Cheats')) {
    errors.push('English homepage title must start with "Marathon Cheats".');
  }
}

function validatePrerenderedMetadata(errors: string[]) {
  const sourceByPath = new Map(collectSourceMeta().map(entry => [entry.path.replace(/\/$/, '') || '/', entry]));

  for (const entry of walkPrerenderedHtml(distDir)) {
    const normalized = normalizePrerenderPath(entry.path).replace(/\/$/, '') || '/';
    const source = sourceByPath.get(normalized);
    if (!source) continue;
    if (source.title !== entry.title) {
      errors.push(`${entry.path}: prerendered title mismatch`);
    }
    if (source.description !== entry.description) {
      errors.push(`${entry.path}: prerendered description mismatch`);
    }
  }
}

function reportResult(errors: string[], modeLabel: string) {
  if (errors.length > 0) {
    console.error('SEO metadata validation failed:');
    errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log(
    `SEO metadata validation passed (${modeLabel}) for ${collectSourceMeta().length} metadata entries.`,
  );
}

function main() {
  if (!existsSync(distDir) && !prerenderMode) {
    console.log('Skipping SEO validation because dist has not been generated.');
    process.exit(0);
  }

  const errors: string[] = [];
  const strings: string[] = [];

  validateSourceMetadata(errors, strings);

  if (!prerenderMode) {
    reportResult(errors, 'source');
    return;
  }

  if (!existsSync(distDir)) {
    errors.push('dist/ is missing; run `vite build` and `npm run prerender` before validate:seo:prerendered');
    reportResult(errors, 'source + prerendered');
    return;
  }

  validatePrerenderedMetadata(errors);
  reportResult(errors, 'source + prerendered');
}

main();
