import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import {
  BLOG_POST_SEO,
  HOME_SEO,
  ROUTE_SEO,
  buildCanonicalUrl,
} from '../src/seo/config';

const TITLE_MIN = 50;
const TITLE_MAX = 60;
const DESC_MIN = 145;
const DESC_MAX = 160;

const FORBIDDEN_PATTERN =
  /\b(best|top rated|top-rated|number 1|no\.?\s*1|leading|ultimate|guaranteed|most powerful|premium provider|undetected|undetectable|safest|premium)\b|#1\b|100%\s*safe|lifetime protection/i;

const STUFFING_WORDS = ['marathon', 'esp', 'aimbot', 'wallhack', 'cheat', 'cheats'];

const distDir = join(process.cwd(), 'dist');
const prerenderMode = process.env.VALIDATE_PRERENDERED_META === '1';

type MetaEntry = { path: string; title: string; description: string };

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

function collectSourceMeta(): MetaEntry[] {
  return [
    { path: '/', title: HOME_SEO.en.title, description: HOME_SEO.en.description },
    { path: ROUTE_SEO.store.path, title: ROUTE_SEO.store.title, description: ROUTE_SEO.store.description },
    { path: ROUTE_SEO.blog.path, title: ROUTE_SEO.blog.title, description: ROUTE_SEO.blog.description },
    { path: ROUTE_SEO.terms.path, title: ROUTE_SEO.terms.title, description: ROUTE_SEO.terms.description },
    { path: ROUTE_SEO.privacy.path, title: ROUTE_SEO.privacy.title, description: ROUTE_SEO.privacy.description },
    { path: ROUTE_SEO.refund.path, title: ROUTE_SEO.refund.title, description: ROUTE_SEO.refund.description },
    { path: ROUTE_SEO.notFound.path, title: ROUTE_SEO.notFound.title, description: ROUTE_SEO.notFound.description },
    ...Object.entries(BLOG_POST_SEO).map(([slug, seo]) => ({
      path: `/blog/${slug}`,
      title: seo.title,
      description: seo.description,
    })),
    ...Object.entries(HOME_SEO)
      .filter(([lang]) => lang !== 'en')
      .map(([lang, seo]) => ({
        path: `/ (${lang})`,
        title: seo.title,
        description: seo.description,
      })),
  ];
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
    const path = base || '/';
    entries.push({
      path,
      title: decodeHtml(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? ''),
      description: decodeHtml(html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? ''),
    });
  }

  return entries;
}

function validateLengths(entry: MetaEntry, errors: string[]) {
  if (entry.title.length < TITLE_MIN || entry.title.length > TITLE_MAX) {
    errors.push(`${entry.path}: title length ${entry.title.length} (expected ${TITLE_MIN}-${TITLE_MAX})`);
  }

  if (entry.description.length < DESC_MIN || entry.description.length > DESC_MAX) {
    errors.push(
      `${entry.path}: description length ${entry.description.length} (expected ${DESC_MIN}-${DESC_MAX})`,
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
  if (canonical !== buildCanonicalUrl('/')) {
    errors.push("index.html canonical does not match buildCanonicalUrl('/')");
  }

  strings.forEach(value => {
    if (FORBIDDEN_PATTERN.test(value)) {
      errors.push(`Forbidden term in metadata: ${value}`);
    }
  });

  const titleGroups = new Map<string, string[]>();
  const descriptionGroups = new Map<string, string[]>();
  collectSourceMeta().forEach(entry => {
    if (entry.path.startsWith('/ (')) return;
    titleGroups.set(entry.title, [...(titleGroups.get(entry.title) ?? []), entry.path]);
    descriptionGroups.set(entry.description, [...(descriptionGroups.get(entry.description) ?? []), entry.path]);
  });

  for (const [title, paths] of titleGroups) {
    if (paths.length > 1) errors.push(`Duplicate title on ${paths.join(', ')}: ${title}`);
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
  for (const entry of walkPrerenderedHtml(distDir)) {
    const source = collectSourceMeta().find(item => item.path === entry.path);
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
  // Prerendered HTML checks require dist/. Source-only mode never reads dist/.
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
