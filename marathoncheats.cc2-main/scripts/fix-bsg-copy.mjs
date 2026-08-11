#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';

const files = ['scripts/i18n-data/pages-en.mjs', 'scripts/generate-blog-posts.mjs'];
const pairs = [
	["Activision's", "Battlestate Games'"],
	['Activision\u2019', "Battlestate Games'"],
	['Activision services', 'Battlestate Games services'],
	['Activision service', 'Battlestate Games service'],
	['Activision platform', 'Battlestate Games platform'],
	['Activision outages', 'launcher outages'],
	['Activision bans', 'Battlestate Games bans'],
	['Activision security', 'BattlEye security'],
	['Activision Status', 'Bungie Marathon Support'],
	['Activision Marathon', 'Bungie Marathon'],
	['Activision Support', 'Bungie Marathon Support'],
	['Activision', 'Battlestate Games'],
	['EAC guide', 'BattlEye guide'],
	['undetected EAC notes', 'undetected BattlEye notes'],
	['status.epicgames.com', 'www.bungie.net/support'],
	['www.epicgames.com/marathon', 'www.bungie.net'],
	['www.marathon.com/competitive', 'www.bungie.net'],
	['https://www.marathon.com/', 'https://www.bungie.net/'],
	['Marathon.com', 'Bungie Marathon'],
	['Marathon Competitive', 'Bungie Marathon'],
];

for (const f of files) {
	let c = readFileSync(f, 'utf8');
	const orig = c;
	for (const [a, b] of pairs) c = c.split(a).join(b);
	if (c !== orig) {
		writeFileSync(f, c);
		console.log('updated', f);
	} else {
		console.log('no change', f);
	}
}
