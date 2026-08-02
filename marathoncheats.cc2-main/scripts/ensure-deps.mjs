import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const markerPath = join(process.cwd(), 'node_modules', 'sharp', 'package.json');

export async function ensureDependencies() {
  if (existsSync(markerPath)) {
    return;
  }

  console.log('Dependencies missing; running npm ci before build...');

  const result = spawnSync('npm', ['ci'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  if (!existsSync(markerPath)) {
    console.error('npm ci completed but sharp is still missing.');
    process.exit(1);
  }
}
