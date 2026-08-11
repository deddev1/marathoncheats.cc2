#!/usr/bin/env node
/**
 * One-time migration: Warzone Hacks → Marathon Cheats (Bungie Marathon).
 * Domain: marathoncheats.cc
 * Run from project root: node scripts/adapt-marathon.mjs
 */
import { readFile, writeFile, readdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['warzone-aimbot', 'marathon-aimbot'],
	['warzone-esp', 'marathon-esp'],
	['warzone-wallhack', 'marathon-wallhack'],
	['warzone-radar-hack', 'marathon-radar-hack'],
	['undetected-warzone-cheats', 'undetected-marathon-cheats'],
	['warzone-cheats-2026', 'marathon-cheats-2026'],
	['ricochet-bypass', 'battleye-bypass'],
	['warzone-hacks', 'marathon-cheats'],
	['warzone-cheat-download', 'marathon-cheat-download'],
	['warzone-mod-menu', 'marathon-mod-menu'],
	['warzone-soft-aim', 'marathon-soft-aim'],
	['best-warzone-cheats', 'best-marathon-cheats'],
	['warzone-aimbot-hack', 'marathon-aimbot-hack'],
	['warzone-esp-hack', 'marathon-esp-hack'],
	['warzone-unlock-all', 'marathon-unlock-all'],
];

/** Ordered replacements — specific patterns first. */
const REPLACEMENTS = [
	['https://warzonehacks.net', 'https://marathoncheats.cc'],
	['https://www.warzonehacks.net', 'https://www.marathoncheats.cc'],
	['www.warzonehacks.net', 'www.marathoncheats.cc'],
	['warzonehacks.net', 'marathoncheats.cc'],
	['support@warzonehacks.net', 'support@marathoncheats.cc'],
	['support@warzonescheats.net', 'support@marathoncheats.cc'],
	['warzonescheats.net', 'marathoncheats.cc'],
	['warzonescheats.com', 'marathoncheats.cc'],
	['warzonescheats.xyz', 'marathoncheats.cc'],
	['/products/warzone', '/products/marathon'],
	['project-name=warzonehacks', 'project-name=marathoncheats2'],
	['project-name=warzonescheats', 'project-name=marathoncheats2'],
	['name = "warzonehacks"', 'name = "marathoncheats2"'],
	['name = "warzonescheats"', 'name = "marathoncheats2"'],
	['"name": "warzone-hacks"', '"name": "marathon-cheats"'],
	['warzone-esp-player-tags', 'marathon-esp-player-tags'],
	['warzone-wallhack-skeleton', 'marathon-wallhack-skeleton'],
	['warzone-aimbot-sniper', 'marathon-aimbot-sniper'],
	['warzone-aimbot-skeleton', 'marathon-aimbot-skeleton'],
	['warzone-esp-radar', 'marathon-esp-radar'],
	['warzone-cheats-combat', 'marathon-cheats-combat'],
	['warzone-hacks-logo', 'marathon-cheats-logo'],
	['warzone-hero-banner', 'marathon-hero-banner'],
	['warzone-hero-ghost', 'marathon-hero-ghost'],
	['warzone-hero-source', 'marathon-hero-source'],
	['undetected-warzone-cheats', 'undetected-marathon-cheats'],
	['best-warzone-cheats', 'best-marathon-cheats'],
	['warzone-cheat-download', 'marathon-cheat-download'],
	['warzone-cheats-2026', 'marathon-cheats-2026'],
	['warzone-radar-hack', 'marathon-radar-hack'],
	['warzone-aimbot-hack', 'marathon-aimbot-hack'],
	['warzone-esp-hack', 'marathon-esp-hack'],
	['warzone-unlock-all', 'marathon-unlock-all'],
	['warzone-soft-aim', 'marathon-soft-aim'],
	['warzone-mod-menu', 'marathon-mod-menu'],
	['warzone-wallhack', 'marathon-wallhack'],
	['warzone-hacks', 'marathon-cheats'],
	['warzone-aimbot', 'marathon-aimbot'],
	['warzone-esp', 'marathon-esp'],
	['ricochet-bypass', 'battleye-bypass'],
	["'ricochet'", "'battleye'"],
	['| ricochet', '| battleye'],
	['pageId="ricochet"', 'pageId="battleye"'],
	['pageId: \'ricochet\'', "pageId: 'battleye'"],
	['"ricochet"', '"battleye"'],
	['call-of-duty-warzone-cheats', 'bungie-marathon-cheats'],
	['Call of Duty: Warzone', 'Bungie Marathon'],
	['Call of Duty Warzone', 'Bungie Marathon'],
	['Warzone Hacks', 'Marathon Cheats'],
	['Warzone Cheats', 'Marathon Cheats'],
	['Warzone cheats', 'Marathon cheats'],
	['Warzone cheat', 'Marathon cheat'],
	['Warzone hacks', 'Marathon cheats'],
	['Warzone hack', 'Marathon cheat'],
	['WarzoneCheatsSite', 'MarathonCheatsSite'],
	['Warzone Intel', 'Marathon Intel'],
	['Ricochet anti-cheat', 'BattlEye anti-cheat'],
	['Ricochet maintenance', 'BattlEye maintenance'],
	['Ricochet bypass', 'BattlEye bypass'],
	['Ricochet Bypass', 'BattlEye Bypass'],
	['Ricochet patches', 'BattlEye patches'],
	['Ricochet patch', 'BattlEye patch'],
	['Ricochet updates', 'BattlEye updates'],
	['Ricochet update', 'BattlEye update'],
	['after Ricochet', 'after BattlEye'],
	['RICOCHET', 'BattlEye'],
	['Ricochet', 'BattlEye'],
	['ricochet', 'battleye'],
	['warzone hacks', 'marathon cheats'],
	['warzone cheats', 'marathon cheats'],
	['warzone hack', 'marathon cheat'],
	['warzone cheat', 'marathon cheat'],
	['Verdansk, Urzikstan, and Rebirth Island', 'raids, maps, and Streets of Marathon'],
	['Verdansk, Urzikstan and Rebirth Island', 'raids, maps and Streets of Marathon'],
	['Verdansk, Urzikstan et Rebirth Island', 'raids, maps et Streets of Marathon'],
	['Verdansk, Urzikstan e Rebirth Island', 'raids, maps e Streets of Marathon'],
	['Verdansk, Urzikstan und Rebirth Island', 'raids, maps und Streets of Marathon'],
	['gulag fights', 'extract fights'],
	['gulag fight', 'extract fight'],
	['gulag rounds', 'raid rounds'],
	['gulag', 'extract'],
	['BR and Resurgence-style modes', 'extraction raids'],
	['BR and Resurgence', 'extraction raids'],
	['BR & Resurgence', 'PMC & Scav'],
	['Resurgence and Battle Royale', 'extraction raids'],
	['Battle Royale', 'raid'],
	['Resurgence', 'loot run'],
	['resurgence', 'loot run'],
	['contract markers', 'extract and loot markers'],
	['loadout drops', 'high-value loot'],
	['loadout drop', 'high-value loot'],
	['Operators', 'runners'],
	['operators', 'runners'],
	['UAV', 'extract timer'],
	['warzoneImages', 'marathonImages'],
	["from './warzone'", "from './marathon'"],
	["from '../data/warzone'", "from '../data/marathon'"],
	["from '../../data/warzone'", "from '../../data/marathon'"],
	['fetch-warzone-images', 'fetch-marathon-images'],
	['warzone-hack-overlays', 'marathon-hack-overlays'],
	['trucos-warzone', 'trucos-marathon'],
	['triche-warzone', 'triche-marathon'],
	['cheats-warzone', 'cheats-marathon'],
	['trucchi-warzone', 'trucchi-marathon'],
	['cheaty-warzone', 'cheaty-marathon'],
	['chity-warzone', 'chity-marathon'],
	['chitov-warzone', 'chitov-marathon'],
	['chitiv-warzone', 'chitiv-marathon'],
	['cheatow-warzone', 'cheatow-marathon'],
	['hile-warzone', 'hile-marathon'],
	['warzone-hile', 'marathon-hile'],
	['warzone-esp-chity', 'marathon-esp-chity'],
	['warzone-aimbot-chity', 'marathon-aimbot-chity'],
	['unentdeckte-warzone-cheats', 'unentdeckte-marathon-cheats'],
	['cheats-warzone-indetectaveis', 'cheats-marathon-indetectaveis'],
	['trucchi-warzone-indetectabili', 'trucchi-marathon-indetectabili'],
	['niewykrywalne-cheats-warzone', 'niewykrywalne-cheats-marathon'],
	['nedecektiruemye-chity-warzone', 'nedecektiruemye-chity-marathon'],
	['tespit-edilemeyen-warzone-hileleri', 'tespit-edilemeyen-marathon-hileleri'],
	['nedecektovani-chity-warzone', 'nedecektovani-chity-marathon'],
	['cheats-warzone-nedetectabile', 'cheats-marathon-nedetectabile'],
	['basta-warzone-cheats', 'basta-marathon-cheats'],
	['warzone-cheats-funktionen', 'marathon-cheats-funktionen'],
	['warzone-cheats-functies', 'marathon-cheats-functies'],
	['caracteristicas-trucos-warzone', 'caracteristicas-trucos-marathon'],
	['fonctionnalites-triche-warzone', 'fonctionnalites-triche-marathon'],
	['recursos-cheats-warzone', 'recursos-cheats-marathon'],
	['call-of-duty-warzone', 'bungie-marathon'],
	['Buy Warzone Hacks', 'Buy Marathon Cheats'],
	['Warzone', 'Marathon'],
	['warzone', 'marathon'],
];

const TEXT_EXTENSIONS = new Set([
	'.ts', '.tsx', '.js', '.mjs', '.astro', '.css', '.json', '.toml', '.txt', '.md', '.html', '.mdc',
]);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro']);
const SKIP_FILES = new Set([
	'adapt-warzone.mjs',
	'adapt-fortnite.mjs',
	'adapt-marathon.mjs',
]);

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			await walk(full, files);
		} else {
			files.push(full);
		}
	}
	return files;
}

function applyReplacements(content) {
	let result = content;
	for (const [from, to] of REPLACEMENTS) {
		if (from === to) continue;
		result = result.split(from).join(to);
	}
	return result;
}

async function transformTextFiles() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		if (SKIP_FILES.has(path.basename(file))) continue;
		const original = await readFile(file, 'utf8');
		const updated = applyReplacements(original);
		if (updated !== original) {
			await writeFile(file, updated, 'utf8');
			changed++;
		}
	}
	console.log(`Transformed ${changed} text files`);
}

async function renamePageDirs() {
	for (const [from, to] of RENAME_PAGE_DIRS) {
		const src = path.join(ROOT, 'src', 'pages', from);
		const dest = path.join(ROOT, 'src', 'pages', to);
		try {
			await rename(src, dest);
			console.log(`Renamed page: ${from} → ${to}`);
		} catch (e) {
			console.warn(`Skip rename ${from}: ${e.message}`);
		}
	}
}

async function renameWarzoneTs() {
	const from = path.join(ROOT, 'src', 'data', 'warzone.ts');
	const to = path.join(ROOT, 'src', 'data', 'marathon.ts');
	try {
		await rename(from, to);
		console.log('Renamed warzone.ts → marathon.ts');
	} catch (e) {
		console.warn(`warzone.ts rename: ${e.message}`);
	}
}

async function renameScripts() {
	const pairs = [
		['fetch-warzone-images.mjs', 'fetch-marathon-images.mjs'],
		['warzone-hack-overlays.mjs', 'marathon-hack-overlays.mjs'],
		['fix-warzone-copy.mjs', 'fix-marathon-copy.mjs'],
	];
	for (const [from, to] of pairs) {
		try {
			await rename(path.join(ROOT, 'scripts', from), path.join(ROOT, 'scripts', to));
			console.log(`Renamed script: ${from} → ${to}`);
		} catch (e) {
			console.warn(`Skip script rename ${from}: ${e.message}`);
		}
	}
}

async function updatePageAstroFiles() {
	const idMap = {
		'marathon-aimbot': 'marathon-aimbot',
		'marathon-esp': 'marathon-esp',
		'marathon-wallhack': 'wallhack',
		'marathon-radar-hack': 'radar',
		'undetected-marathon-cheats': 'undetected',
		'marathon-cheats-2026': 'cheats-2026',
		'battleye-bypass': 'battleye',
		'marathon-cheats': 'hacks',
		'marathon-cheat-download': 'cheat-download',
		'marathon-mod-menu': 'mod-menu',
		'marathon-soft-aim': 'soft-aim',
		'best-marathon-cheats': 'best-cheats',
		'marathon-aimbot-hack': 'aimbot-hack',
		'marathon-esp-hack': 'esp-hack',
		'marathon-unlock-all': 'unlock-all',
	};

	for (const [dir, pageId] of Object.entries(idMap)) {
		const file = path.join(ROOT, 'src', 'pages', dir, 'index.astro');
		try {
			const content = `---
import LocalizedPage from '../../components/LocalizedPage.astro';
---

<LocalizedPage locale="en" pageId="${pageId}" />
`;
			await writeFile(file, content, 'utf8');
		} catch {
			// ignore missing dirs
		}
	}
}

async function renameImages() {
	const imagesDir = path.join(ROOT, 'public', 'images');
	let files;
	try {
		files = await readdir(imagesDir);
	} catch {
		return;
	}
	for (const file of files) {
		if (!file.includes('warzone')) continue;
		const newName = file.replace(/warzone/g, 'marathon').replace(/marathon-hacks-logo/g, 'marathon-cheats-logo');
		if (newName !== file) {
			try {
				await rename(path.join(imagesDir, file), path.join(imagesDir, newName));
				console.log(`Renamed image: ${file} → ${newName}`);
			} catch (e) {
				console.warn(`Skip image ${file}: ${e.message}`);
			}
		}
	}
}

async function main() {
	console.log('Adapting Warzone Hacks → Marathon Cheats (marathoncheats.cc)...\n');
	await renamePageDirs();
	await renameWarzoneTs();
	await renameScripts();
	await transformTextFiles();
	await updatePageAstroFiles();
	await renameImages();
	console.log('\nDone. Next: fix brand.ts identity, sync:brand, regenerate i18n/blog.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
