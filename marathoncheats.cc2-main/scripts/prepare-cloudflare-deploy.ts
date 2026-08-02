import { existsSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const distHeaders = join(process.cwd(), 'dist', '_headers');
const publicHeaders = join(process.cwd(), 'public', '_headers');

for (const file of [distHeaders, publicHeaders]) {
  if (existsSync(file)) {
    unlinkSync(file);
    console.log(`Removed ${file}`);
  }
}

let commit = 'unknown';
try {
  commit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
} catch {
  // Non-git environments are fine.
}

console.log(`Cloudflare deploy prep complete (commit ${commit}). Headers are set in worker/index.ts.`);
