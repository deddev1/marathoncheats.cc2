import { writeFileSync } from 'node:fs';
import {
  SITEMAP_PATH,
  buildSitemapEntries,
  formatW3cDate,
  renderSitemapXml,
} from './sitemap-utils';

const buildDate = new Date();
const entries = buildSitemapEntries(buildDate);
const xml = renderSitemapXml(entries);

writeFileSync(SITEMAP_PATH, xml, 'utf8');

console.log(
  `Generated sitemap with ${entries.length} URLs at ${SITEMAP_PATH} (build date ${formatW3cDate(buildDate)})`,
);
