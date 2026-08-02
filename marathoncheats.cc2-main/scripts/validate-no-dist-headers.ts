import { existsSync } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const headersPath = join(distDir, '_headers');

if (!existsSync(distDir)) {
  console.error('validate:no-dist-headers: dist/ is missing. Run `vite build` first.');
  process.exit(1);
}

if (existsSync(headersPath)) {
  console.error(
    'dist/_headers must not be deployed. Cloudflare rejects this file in this project; headers are set in worker/index.ts instead.',
  );
  console.error(`Remove ${headersPath} and delete public/_headers from the repo.`);
  process.exit(1);
}

console.log('Confirmed dist/_headers is absent (headers served via Worker).');
