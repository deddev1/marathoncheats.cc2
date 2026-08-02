import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

function buildDepsInstalled(cwd) {
  const appModules = join(cwd, 'node_modules');
  return (
    existsSync(join(appModules, 'sharp', 'package.json'))
    && existsSync(join(appModules, 'typescript', 'package.json'))
    && existsSync(join(appModules, 'vite', 'package.json'))
  );
}

export async function ensureDependencies() {
  const cwd = process.cwd();

  if (buildDepsInstalled(cwd)) {
    return;
  }

  console.log('Dependencies missing; running npm ci before build...');

  const result = spawnSync('npm', ['ci', '--include=dev'], {
    cwd,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  if (!buildDepsInstalled(cwd)) {
    console.error('npm ci completed but build dependencies are still missing.');
    process.exit(1);
  }
}
