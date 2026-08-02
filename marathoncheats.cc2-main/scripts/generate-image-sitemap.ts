import { writeImageSitemap } from './image-sitemap-utils';

const buildDate = new Date();
writeImageSitemap(buildDate);
console.log(`Generated image sitemap at public/image-sitemap.xml (build date ${buildDate.toISOString().slice(0, 10)})`);
