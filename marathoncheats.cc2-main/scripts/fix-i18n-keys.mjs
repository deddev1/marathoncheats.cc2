#!/usr/bin/env node
/** Fix remaining i18n key mismatches and ui-strings. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const UI_REPLACEMENTS = [
	['Marathon Cheats', 'Marathon Cheats'],
	['Marathon cheats', 'Marathon cheats'],
	['Marathon Cheats', 'Marathon Cheats'],
	['Bungie Marathon', 'Bungie Marathon'],
	['Bungie Marathon', 'Bungie Marathon'],
	['Call of Duty', 'Bungie Marathon'],
	['Marathon PC', 'Bungie Marathon PC'],
	['for Marathon', 'for Bungie Marathon'],
	['Marathon ', 'Bungie Marathon '],
	['marathon ', 'marathon '],
	['BattlEye maintenance', 'BattlEye maintenance'],
	['BattlEye anti-cheat', 'BattlEye anti-cheat'],
	['BattlEye', 'BattlEye anti-cheat'],
	['operatorEsp', 'playerEsp'],
	['extractFight', 'rebootFight'],
	['alMazrah', 'battleRoyaleIsland'],
	['runners', 'players'],
	['operator', 'player'],
	['runners', 'Players'],
	['Operator', 'Player'],
	['Al Mazrah', 'Verdansk'],
	['Verdansk', 'Verdansk'],
	['loot-run', 'loot-run'],
	['extract', 'extract'],
	['marathoncheats.cc', 'marathoncheats.cc'],
	['Trucos Marathon', 'Trucos Bungie Marathon'],
	['Triches Marathon', 'Triches Bungie Marathon'],
	['Cheats Marathon', 'Cheats Bungie Marathon'],
];

function apply(content) {
	let r = content;
	for (const [a, b] of UI_REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

// Rebuild ui-strings from clean source
for (const file of ['ui-strings-part1.mjs', 'ui-strings-part2.mjs']) {
	let content = await readFile(path.join(SRC, 'scripts/i18n-data', file), 'utf8');
	content = apply(content);
	await writeFile(path.join(ROOT, 'scripts/i18n-data', file), content);
	console.log('Fixed', file);
}

// Fix pages-en battleye key
let pagesEn = await readFile(path.join(ROOT, 'scripts/i18n-data/pages-en.mjs'), 'utf8');
pagesEn = pagesEn.replace(/\tbattleye: \{/, "\t'battleye': {");
pagesEn = pagesEn.replace(/Bungie Marathon Marathon/g, 'Bungie Marathon');
pagesEn = pagesEn.replace(/for Bungie Marathon Marathon/g, 'for Bungie Marathon');
await writeFile(path.join(ROOT, 'scripts/i18n-data/pages-en.mjs'), pagesEn);

// Fix pages-i18n
let pagesI18n = await readFile(path.join(ROOT, 'scripts/i18n-data/pages-i18n.mjs'), 'utf8');
pagesI18n = apply(pagesI18n);
pagesI18n = pagesI18n.replace(/'battleye'/g, "'battleye'");
pagesI18n = pagesI18n.replace(/battleye:/g, "'battleye':");
await writeFile(path.join(ROOT, 'scripts/i18n-data/pages-i18n.mjs'), pagesI18n);

// Fix generate-i18n pages count
let gen = await readFile(path.join(ROOT, 'scripts/generate-i18n-content.mjs'), 'utf8');
gen = gen.replace('Pages per locale: 25', 'Pages per locale: 17');
await writeFile(path.join(ROOT, 'scripts/generate-i18n-content.mjs'), gen);

console.log('Fixed i18n keys.');
