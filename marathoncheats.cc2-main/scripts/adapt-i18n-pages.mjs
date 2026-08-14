#!/usr/bin/env node
/** Adapt pages-en.mjs and pages-i18n.mjs from Marathon source. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const REMOVE_PAGE_KEYS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

const REPLACEMENTS = [
	['marathon-esp', 'marathon-esp'],
	['marathon-aimbot', 'marathon-aimbot'],
	["'battleye'", "'battleye'"],
	['battleye-bypass', 'battleye-bypass'],
	['undetected-marathon-cheats', 'undetected-marathon-cheats'],
	['marathon-wallhack', 'marathon-wallhack'],
	['marathon-radar-hack', 'marathon-radar-hack'],
	['marathon-cheats-2026', 'marathon-cheats-2026'],
	['bungie-marathon-cheats', 'bungie-marathon-cheats'],
	['bungie-marathon', 'marathon'],
	['Bungie Marathon', 'Bungie Marathon'],
	['Bungie Marathon', 'Bungie Marathon'],
	['Marathon Cheats', 'Marathon Cheats'],
	['Marathon cheats', 'Marathon cheats'],
	['Marathon cheat', 'Marathon cheat'],
	['Marathon ESP', 'Bungie Marathon ESP'],
	['Marathon Aimbot', 'Bungie Marathon Aimbot'],
	['Marathon wallhack', 'Bungie Marathon wallhack'],
	['Marathon radar', 'Bungie Marathon radar'],
	['Marathon firefights', 'Bungie Marathon firefights'],
	['Marathon combat', 'Bungie Marathon combat'],
	['Marathon patches', 'Bungie Marathon patches'],
	['Marathon updates', 'Bungie Marathon updates'],
	['Marathon setup', 'Bungie Marathon setup'],
	['Marathon license', 'Bungie Marathon license'],
	['Marathon licenses', 'Bungie Marathon licenses'],
	['Marathon sessions', 'Bungie Marathon sessions'],
	['in Marathon', 'in Bungie Marathon'],
	['for Marathon', 'for Bungie Marathon'],
	['Marathon on', 'Bungie Marathon on'],
	['Marathon or', 'Bungie Marathon or'],
	['Marathon\'s', 'Bungie Marathon\'s'],
	['Marathon ', 'Bungie Marathon '],
	['BattlEye anti-cheat', 'BattlEye anti-cheat'],
	['BattlEye maintenance', 'BattlEye maintenance'],
	['BattlEye bypass', 'BattlEye bypass'],
	['BattlEye Bypass', 'BattlEye Bypass'],
	['BattlEye', 'BattlEye anti-cheat'],
	['battleye', 'battleye'],
	['support@marathoncheats.cc', 'support@marathoncheats.cc'],
	['raids, maps, and Streets of Marathon', 'raids, maps, and Streets of Marathon'],
	['raids, maps and Streets of Marathon', 'raids, maps and Streets of Marathon'],
	['extract fights', 'extract fights'],
	['extract fight', 'extract fight'],
	['raid rounds', 'raid rounds'],
	['extract', 'extract'],
	['runners', 'players'],
	['operator', 'player'],
	['runners', 'Players'],
	['Operator', 'Player'],
	['extract timer', 'extract timer'],
	['extraction raids', 'extraction raids'],
	['extraction raids', 'extraction raids'],
	['PMC & Scav', 'PMC & Scav'],
	['high-value loot', 'high-value loot'],
	['high-value loot', 'high-value loot'],
	['contracts', 'chests'],
	['contract', 'chest'],
	['Activision\'s', 'Epic Games\''],
	['Call of Duty combat pace', 'Bungie Marathon combat pace'],
	['COD', 'Bungie Marathon'],
];

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

function removePageObjectBlocks(content) {
	let r = content;
	for (const key of REMOVE_PAGE_KEYS) {
		const quoted = `'${key}'`;
		const patterns = [
			new RegExp(`\\t${quoted}: \\{[\\s\\S]*?\\},\\n`, 'g'),
			new RegExp(`\\t${key.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'),
		];
		for (const p of patterns) r = r.replace(p, '');
	}
	return r;
}

async function adaptFile(rel) {
	let content = await readFile(path.join(SRC, rel), 'utf8');
	content = apply(content);
	content = removePageObjectBlocks(content);
	await writeFile(path.join(ROOT, rel), content);
	console.log('Adapted', rel);
}

await adaptFile('scripts/i18n-data/pages-en.mjs');
await adaptFile('scripts/i18n-data/pages-i18n.mjs');
await adaptFile('scripts/i18n-data/phrases.mjs');

// Patch phrases KW object
let phrases = await readFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), 'utf8');
phrases = phrases.replace(
	/const KW = \{[\s\S]*?\};/,
	`const KW = {
	esp: 'ESP wallhack',
	radar: 'radar hack',
	aimbot: 'Aimbot',
	product: 'Marathon Cheats',
	game: 'Bungie Marathon',
	checkout: 'Zadeyo',
	battleye: 'BattlEye anti-cheat',
};`,
);
phrases = phrases.replace(/KW\.battleye/g, 'KW.battleye');
phrases = phrases.replace(/maps: '[^']*'/g, "maps: 'raids, maps, and Streets of Marathon'");
await writeFile(path.join(ROOT, 'scripts/i18n-data/phrases.mjs'), phrases);

console.log('Done adapting i18n pages.');
