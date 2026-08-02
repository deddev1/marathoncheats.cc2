import { writeVideoSitemap } from './video-sitemap-utils';

const buildDate = new Date();
writeVideoSitemap(buildDate);
console.log(`Generated video sitemap at public/video-sitemap.xml (build date ${buildDate.toISOString().slice(0, 10)})`);
