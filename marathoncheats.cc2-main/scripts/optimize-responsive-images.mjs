import { access, mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const imagesDir = path.join(publicDir, 'images');
const heroSource = path.join(publicDir, 'hero.png');

const HERO_WIDTHS = [640, 960, 1400, 2120];
const CONTENT_WIDTHS = [480, 960];

const SKIP_PATTERNS = [/-\d+w\.(webp|avif)$/i, /marathon-cheats-logo/i, /favicon/i];

async function exists(file) {
	try {
		await access(file);
		return true;
	} catch {
		return false;
	}
}

async function isFresh(src, dest) {
	try {
		const [source, output] = await Promise.all([stat(src), stat(dest)]);
		return output.mtimeMs >= source.mtimeMs && output.size > 0;
	} catch {
		return false;
	}
}

function webpQuality(width) {
	if (width <= 640) return 80;
	if (width <= 960) return 84;
	if (width <= 1400) return 86;
	return 90;
}

function avifQuality(width) {
	if (width <= 640) return 52;
	if (width <= 960) return 55;
	return 60;
}

async function writeIfStale(src, dest, build) {
	if (await isFresh(src, dest)) {
		console.log(`Fresh ${path.basename(dest)}`);
		return false;
	}
	const buffer = await build();
	await writeFile(dest, buffer);
	console.log(`Wrote ${path.basename(dest)} (${buffer.length} bytes)`);
	return true;
}

async function optimizeHero() {
	if (!(await exists(heroSource))) {
		console.warn('Skip hero — public/hero.png not found');
		return;
	}

	const meta = await sharp(heroSource).metadata();
	const pipeline = () => sharp(heroSource).rotate();

	for (const width of HERO_WIDTHS) {
		if (meta.width && width > meta.width && width !== meta.width) continue;

		const webpFile = path.join(publicDir, `hero-${width}w.webp`);
		const avifFile = path.join(publicDir, `hero-${width}w.avif`);

		await writeIfStale(heroSource, webpFile, () =>
			pipeline()
				.resize({ width, withoutEnlargement: true })
				.webp({ quality: webpQuality(width), effort: 6 })
				.toBuffer(),
		);

		await writeIfStale(heroSource, avifFile, () =>
			pipeline()
				.resize({ width, withoutEnlargement: true })
				.avif({ quality: avifQuality(width), effort: 6 })
				.toBuffer(),
		);
	}

	const defaultWebp = path.join(publicDir, 'hero.webp');
	await writeIfStale(heroSource, defaultWebp, () =>
		pipeline()
			.resize({ width: 1400, withoutEnlargement: true })
			.webp({ quality: 86, effort: 6 })
			.toBuffer(),
	);
}

async function optimizeContentImages() {
	if (!(await exists(imagesDir))) {
		console.warn('Skip content images — public/images not found');
		return;
	}

	const files = await readdir(imagesDir);
	const sources = files.filter(
		(file) => file.endsWith('.webp') && !SKIP_PATTERNS.some((pattern) => pattern.test(file)),
	);

	for (const file of sources) {
		const source = path.join(imagesDir, file);
		const meta = await sharp(source).metadata();
		const base = file.replace(/\.webp$/i, '');

		for (const width of CONTENT_WIDTHS) {
			if (meta.width && width >= meta.width) continue;
			const dest = path.join(imagesDir, `${base}-${width}w.webp`);
			await writeIfStale(source, dest, () =>
				sharp(source)
					.resize({ width, withoutEnlargement: true })
					.webp({ quality: 78, effort: 6 })
					.toBuffer(),
			);
		}
	}
}

await mkdir(imagesDir, { recursive: true });
await optimizeHero();
await optimizeContentImages();
console.log('Image optimize done.');
