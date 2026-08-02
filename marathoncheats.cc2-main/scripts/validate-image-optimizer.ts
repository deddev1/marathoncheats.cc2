import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { IMAGE_SEO_REGISTRY } from '../src/content/imageSeo';
import { IMAGE_DIMENSIONS } from '../src/content/imageDimensions';
import {
  generateAltFromFilename,
  getOptimizedImageProps,
  validateAltQuality,
} from '../src/seo/imageOptimizer';

const errors: string[] = [];

IMAGE_SEO_REGISTRY.forEach(entry => {
  errors.push(...validateAltQuality(entry.alt, entry.path));

  if (!IMAGE_DIMENSIONS[entry.path]) {
    errors.push(`Missing intrinsic dimensions for registered image: ${entry.path}`);
  }

  const optimized = getOptimizedImageProps({ src: entry.path, fallbackAlt: entry.alt });
  if (!optimized.width || !optimized.height) {
    errors.push(`Optimizer could not resolve width/height for ${entry.path}`);
  }
});

const sampleFilename = '/blog-unknown-feature.webp';
const generatedAlt = generateAltFromFilename(sampleFilename);
if (!generatedAlt.toLowerCase().includes('marathon')) {
  errors.push('Filename alt generator should include Marathon context');
}

const sourceFiles = [
  'src/components/SeoImage.tsx',
  'src/components/SiteLogo.tsx',
  'src/components/FeatureShowcaseGallery.tsx',
];

sourceFiles.forEach(relativePath => {
  const source = readFileSync(join(process.cwd(), relativePath), 'utf8');
  const rawImgTags = [...source.matchAll(/<img\b[^>]*>/g)];

  rawImgTags.forEach(tag => {
    const usesSeoImage = relativePath === 'src/components/SeoImage.tsx';
    if (usesSeoImage) return;

    errors.push(`${relativePath}: raw <img> should use SeoImage optimizer — ${tag[0].slice(0, 60)}...`);
  });
});

if (errors.length > 0) {
  console.error('Image optimizer validation failed:');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Image optimizer validation passed (${IMAGE_SEO_REGISTRY.length} registry images, ${Object.keys(IMAGE_DIMENSIONS).length} dimension entries).`,
);
