#!/usr/bin/env node
/** Rebuild routing.ts and constants.mjs from clean Marathon source. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'amansand');

const REMOVE_IDS = [
	'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all',
];

const REPLACEMENTS = [
	['marathon-esp', 'marathon-esp'],
	['marathon-aimbot', 'marathon-aimbot'],
	['battleye', 'battleye'],
	['undetected-marathon-cheats', 'undetected-marathon-cheats'],
	['marathon-wallhack', 'marathon-wallhack'],
	['marathon-radar-hack', 'marathon-radar-hack'],
	['marathon-cheats-2026', 'marathon-cheats-2026'],
	['battleye-bypass', 'battleye-bypass'],
	['marathoncheats.cc', 'marathoncheats.cc'],
	['trucos-marathon', 'trucos-marathon'],
	['triche-marathon', 'triche-marathon'],
	['marathon-cheats', 'bungie-marathon-cheats'],
	['cheats-marathon', 'cheats-marathon'],
	['trucchi-marathon', 'trucchi-marathon'],
	['cheaty-marathon', 'cheaty-marathon'],
	['chity-marathon', 'chity-marathon'],
	['chitov-marathon', 'chitov-marathon'],
	['chitiv-marathon', 'chitiv-marathon'],
	['cheatow-marathon', 'cheatow-marathon'],
	['hile-marathon', 'hile-marathon'],
	['marathon-hile', 'marathon-hile'],
	['marathon-esp-chity', 'marathon-esp-chity'],
	['marathon-aimbot-chity', 'marathon-aimbot-chity'],
	['unentdeckte-marathon-cheats', 'unentdeckte-bungie-marathon-cheats'],
	['cheats-marathon-indetectaveis', 'cheats-marathon-indetectaveis'],
	['trucchi-marathon-indetectabili', 'trucchi-marathon-indetectabili'],
	['niewykrywalne-cheats-marathon', 'niewykrywalne-cheats-marathon'],
	['nedecektiruemye-chity-marathon', 'nedecektiruemye-chity-marathon'],
	['tespit-edilemeyen-marathon-hileleri', 'tespit-edilemeyen-marathon-hileleri'],
	['nedecektovani-chity-marathon', 'nedecektovani-chity-marathon'],
	['cheats-marathon-nedetectabile', 'cheats-marathon-nedetectabile'],
	['basta-marathon-cheats', 'basta-bungie-marathon-cheats'],
	['battleye-bypass-trucos-marathon', 'battleye-bypass-trucos-marathon'],
	['battleye-bypass-triche-marathon', 'battleye-bypass-triche-marathon'],
	['battleye-bypass-cheats-marathon', 'battleye-bypass-cheats-marathon'],
	['battleye-bypass-chity-marathon', 'battleye-bypass-chity-marathon'],
	['battleye-bypass-marathon', 'battleye-bypass'],
];

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	return r;
}

function removePageBlocks(content, pageId) {
	const keyPatterns = [
		new RegExp(`\\t${pageId.replace(/-/g, '\\-')}: \\{[\\s\\S]*?\\},\\n`, 'g'),
		new RegExp(`\\t'${pageId.replace(/-/g, '\\-')}': \\{[\\s\\S]*?\\},\\n`, 'g'),
	];
	let r = content;
	for (const p of keyPatterns) r = r.replace(p, '');
	// Remove from PageId union
	r = r.replace(new RegExp(`\\s*\\|\\s*'${pageId}'`, 'g'), '');
	// Remove from englishPaths single line
	r = r.replace(new RegExp(`\\t${pageId.replace(/-/g, '\\-')}: '[^']*',\\n`, 'g'), '');
	r = r.replace(new RegExp(`\\t'${pageId.replace(/-/g, '\\-')}': '[^']*',\\n`, 'g'), '');
	return r;
}

async function fixRouting() {
	let content = await readFile(path.join(SRC, 'src/data/i18n/routing.ts'), 'utf8');
	content = apply(content);
	for (const id of REMOVE_IDS) content = removePageBlocks(content, id);
	// Fix battleye key in englishPaths
	content = content.replace(/\tbattleye: '/, "\t'battleye': '");
	await writeFile(path.join(ROOT, 'src/data/i18n/routing.ts'), content);
	console.log('Fixed routing.ts');
}

async function fixConstants() {
	const heroImages = `/** Hero image per page topic — keyword-rich bungie-marathon-cheats paths. */
export const HERO_IMAGES = {
	home: '/images/bungie-marathon-cheats-hero.webp',
	'marathon-esp': '/images/bungie-marathon-cheats-esp-wallhack.webp',
	'marathon-aimbot': '/images/bungie-marathon-cheats-aimbot-combat.webp',
	features: '/images/bungie-marathon-cheats-package.webp',
	pricing: '/images/bungie-marathon-cheats-cover.webp',
	setup: '/images/marathon-loadout-builder.webp',
	updates: '/images/marathon-header-art.webp',
	faq: '/images/marathon-squad-fight.webp',
	support: '/images/bungie-marathon-cheats-package.webp',
	undetected: '/images/marathon-battle-royale-combat.webp',
	wallhack: '/images/bungie-marathon-cheats-esp-wallhack.webp',
	radar: '/images/marathon-player-esp.webp',
	'battleye': '/images/marathon-reboot-van-fight.webp',
	'cheats-2026': '/images/bungie-marathon-cheats-hero.webp',
	privacy: '/images/bungie-marathon-cheats-aimbot-combat.webp',
	refund: '/images/bungie-marathon-cheats-cover.webp',
	terms: '/images/bungie-marathon-cheats-package.webp',
};`;

	let content = await readFile(path.join(SRC, 'scripts/i18n-data/constants.mjs'), 'utf8');
	content = apply(content);
	for (const id of REMOVE_IDS) {
		content = content.replace(new RegExp(`'${id}',\\s*`, 'g'), '');
	}
	content = content.replace(
		/export const PAGE_IDS = \[[\s\S]*?\];/,
		`export const PAGE_IDS = [\n\t'home', 'marathon-esp', 'marathon-aimbot', 'features', 'pricing', 'setup',\n\t'updates', 'faq', 'support', 'undetected', 'wallhack', 'radar', 'battleye',\n\t'cheats-2026', 'privacy', 'refund', 'terms',\n];`,
	);
	content = content.replace(/\/\*\* Hero image[\s\S]*?};/, heroImages);
	content = content.replace(
		/export type PageId = [^;]+;/,
		"export type PageId = 'home' | 'marathon-esp' | 'marathon-aimbot' | 'features' | 'pricing' | 'setup' | 'updates' | 'faq' | 'support' | 'undetected' | 'wallhack' | 'radar' | 'battleye' | 'cheats-2026' | 'privacy' | 'refund' | 'terms';",
	);
	content = content.replace(/operatorEsp/g, 'playerEsp');
	content = content.replace(/extractFight/g, 'rebootFight');
	content = content.replace(/alMazrah/g, 'battleRoyaleIsland');
	await writeFile(path.join(ROOT, 'scripts/i18n-data/constants.mjs'), content);
	console.log('Fixed constants.mjs');
}

await fixRouting();
await fixConstants();
