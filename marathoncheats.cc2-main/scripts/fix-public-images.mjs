import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const entries = await readdir(publicDir);
const targets = entries.filter(name => name.endsWith('.webp'));

for (const name of targets) {
  const inputPath = path.join(publicDir, name);
  const tempPath = path.join(publicDir, `${name}.tmp`);

  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(tempPath);

    await sharp(tempPath).metadata();
    await import('node:fs/promises').then(({ rename, unlink }) =>
      rename(tempPath, inputPath).catch(async error => {
        await unlink(tempPath).catch(() => undefined);
        throw error;
      }),
    );

    console.log(`Converted ${name}`);
  } catch (error) {
    console.warn(`Skipped ${name}: ${error.message}`);
  }
}
