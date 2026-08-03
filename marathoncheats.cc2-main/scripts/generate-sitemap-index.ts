import { writeFileSync } from 'node:fs';
import {
  SITEMAP_INDEX_PATH,
  formatW3cDate,
  renderSitemapIndexXml,
} from './sitemap-utils';

const buildDate = new Date();
const xml = renderSitemapIndexXml(buildDate);

writeFileSync(SITEMAP_INDEX_PATH, xml, 'utf8');

console.log(
  `Generated sitemap index at ${SITEMAP_INDEX_PATH} (build date ${formatW3cDate(buildDate)})`,
);
