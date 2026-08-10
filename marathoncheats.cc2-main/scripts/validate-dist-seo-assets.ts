import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SEO_ASSET_PATHS } from '../src/seo/localePaths';

const distDir = join(process.cwd(), 'dist');

function fail(message: string) {
  console.error(`validate:dist-seo-assets: ${message}`);
  process.exit(1);
}

if (!existsSync(distDir)) {
  fail('dist/ is missing. Run `vite build` first.');
}

function looksLikeHtml(body: string) {
  const trimmed = body.trimStart().toLowerCase();
  return trimmed.startsWith('<!doctype html') || trimmed.startsWith('<html');
}

for (const assetPath of SEO_ASSET_PATHS) {
  const filePath = join(distDir, assetPath.replace(/^\//, ''));

  if (!existsSync(filePath)) {
    fail(`Missing ${assetPath} in dist/. SEO files must be copied from public/ during build.`);
  }

  const body = readFileSync(filePath, 'utf8');

  if (looksLikeHtml(body)) {
    fail(`${assetPath} in dist/ contains HTML instead of plain text/XML.`);
  }

  if (assetPath.endsWith('.xml') && !body.trimStart().startsWith('<?xml')) {
    fail(`${assetPath} in dist/ must start with an XML declaration.`);
  }
}

console.log(`Confirmed ${SEO_ASSET_PATHS.size} SEO assets in dist/ are present and not HTML.`);
