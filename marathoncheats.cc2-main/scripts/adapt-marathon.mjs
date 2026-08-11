#!/usr/bin/env node
/**
 * Adapt tarkovcheats Astro template → Marathon Cheats (marathoncheats.cc).
 * Run from app root: node scripts/adapt-marathon.mjs
 */
import { readFile, writeFile, readdir, rename, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const RENAME_PAGE_DIRS = [
	['tarkov-aimbot', 'marathon-aimbot'],
	['tarkov-esp', 'marathon-esp'],
	['tarkov-wallhack', 'marathon-wallhack'],
	['tarkov-radar-hack', 'marathon-radar-hack'],
	['undetected-tarkov-cheats', 'undetected-marathon-cheats'],
	['tarkov-cheats-2026', 'marathon-cheats-2026'],
	['tarkov-cheats', 'marathon-cheats'],
	['tarkov-cheat-download', 'marathon-cheat-download'],
	['tarkov-mod-menu', 'marathon-mod-menu'],
	['tarkov-soft-aim', 'marathon-soft-aim'],
	['best-tarkov-cheats', 'best-marathon-cheats'],
	['tarkov-aimbot-hack', 'marathon-aimbot-hack'],
	['tarkov-esp-hack', 'marathon-esp-hack'],
	['tarkov-unlock-all', 'marathon-unlock-all'],
];

const REPLACEMENTS = [
	['https://besttarkovcheats.com', 'https://marathoncheats.cc'],
	['https://www.besttarkovcheats.com', 'https://www.marathoncheats.cc'],
	['www.besttarkovcheats.com', 'www.marathoncheats.cc'],
	['besttarkovcheats.com', 'marathoncheats.cc'],
	['support@besttarkovcheats.com', 'support@marathoncheats.cc'],
	['/products/escape-from-tarkov', '/products/marathon'],
	['project-name=besttarkovcheats', 'project-name=marathoncheats2'],
	['project-name=tarkovcheats', 'project-name=marathoncheats2'],
	['name = "tarkovcheats"', 'name = "marathoncheats2"'],
	['name = "besttarkovcheats"', 'name = "marathoncheats2"'],
	['"name": "tarkov-cheats"', '"name": "marathon-cheats"'],
	['tarkov-esp-player-tags', 'marathon-esp-player-tags'],
	['tarkov-wallhack-skeleton', 'marathon-wallhack-skeleton'],
	['tarkov-aimbot-sniper', 'marathon-aimbot-sniper'],
	['tarkov-aimbot-skeleton', 'marathon-aimbot-skeleton'],
	['tarkov-esp-radar', 'marathon-esp-radar'],
	['tarkov-cheats-combat', 'marathon-cheats-combat'],
	['tarkov-cheats-logo', 'marathon-cheats-logo'],
	['tarkov-hero-banner', 'marathon-hero-banner'],
	['tarkov-hero-ghost', 'marathon-hero-ghost'],
	['tarkov-hero-source', 'marathon-hero-source'],
	['tarkov-cheats-esp', 'marathon-cheats-esp'],
	['tarkov-cheats-wallhack', 'marathon-cheats-wallhack'],
	['tarkov-cheats-aimbot', 'marathon-cheats-aimbot'],
	['tarkov-cheats-radar', 'marathon-cheats-radar'],
	['tarkov-cheats-raid', 'marathon-cheats-raid'],
	['tarkov-cheats-hero', 'marathon-cheats-hero'],
	['undetected-tarkov-cheats', 'undetected-marathon-cheats'],
	['best-tarkov-cheats', 'best-marathon-cheats'],
	['tarkov-cheat-download', 'marathon-cheat-download'],
	['tarkov-cheats-2026', 'marathon-cheats-2026'],
	['tarkov-radar-hack', 'marathon-radar-hack'],
	['tarkov-aimbot-hack', 'marathon-aimbot-hack'],
	['tarkov-esp-hack', 'marathon-esp-hack'],
	['tarkov-unlock-all', 'marathon-unlock-all'],
	['tarkov-soft-aim', 'marathon-soft-aim'],
	['tarkov-mod-menu', 'marathon-mod-menu'],
	['tarkov-wallhack', 'marathon-wallhack'],
	['tarkov-cheats', 'marathon-cheats'],
	['tarkov-aimbot', 'marathon-aimbot'],
	['tarkov-esp', 'marathon-esp'],
	['escape-from-tarkov-cheats', 'marathon-extraction-cheats'],
	['Escape from Tarkov', "Bungie Marathon"],
	['Tarkov Cheats', 'Marathon Cheats'],
	['Tarkov cheats', 'Marathon cheats'],
	['Tarkov cheat', 'Marathon cheat'],
	['Tarkov hacks', 'Marathon cheats'],
	['Tarkov hack', 'Marathon cheat'],
	['TarkovCheatsSite', 'MarathonCheatsSite'],
	['Tarkov Intel', 'Marathon Intel'],
	['PMC raids and loot runs', 'extraction raids'],
	['PMC raids', 'extraction raids'],
	['loot runs', 'loot runs'],
	['PMCs and Scavs', 'runners and hostiles'],
	['PMCs', 'runners'],
	['Scavs', 'hostiles'],
	['Customs', 'raids'],
	['Woods', 'maps'],
	['dorms', 'zones'],
	['EFT', 'Marathon'],
	['tarkov cheats', 'marathon cheats'],
	['tarkov esp', 'marathon esp'],
	['tarkov aimbot', 'marathon aimbot'],
	['tarkov wallhack', 'marathon wallhack'],
	['tarkov hacks', 'marathon hacks'],
	['tarkov', 'marathon'],
	['Tarkov', 'Marathon'],
];

const TEXT_EXT = new Set([
	'.astro', '.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.md', '.mdc',
	'.css', '.html', '.txt', '.toml', '.svg', '.py',
]);

async function walk(dir) {
	const out = [];
	for (const name of await readdir(dir)) {
		if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
		const full = path.join(dir, name);
		const st = await stat(full);
		if (st.isDirectory()) out.push(...(await walk(full)));
		else out.push(full);
	}
	return out;
}

function applyReplacements(text) {
	let next = text;
	for (const [from, to] of REPLACEMENTS) {
		if (next.includes(from)) next = next.split(from).join(to);
	}
	return next;
}

async function renamePageDirs() {
	const pagesRoot = path.join(ROOT, 'src/pages');
	for (const [from, to] of RENAME_PAGE_DIRS) {
		const src = path.join(pagesRoot, from);
		const dest = path.join(pagesRoot, to);
		try {
			await stat(src);
			await rename(src, dest);
			console.log(`renamed pages/${from} → pages/${to}`);
		} catch {
			// already renamed or missing
		}
	}
}

async function renameImageFiles() {
	const imagesDir = path.join(ROOT, 'public/images');
	try {
		const files = await readdir(imagesDir);
		for (const file of files) {
			if (!file.includes('tarkov')) continue;
			const next = file.split('tarkov').join('marathon');
			if (next === file) continue;
			await rename(path.join(imagesDir, file), path.join(imagesDir, next));
			console.log(`renamed image ${file} → ${next}`);
		}
	} catch {
		// no images dir
	}
}

async function main() {
	await renamePageDirs();
	await renameImageFiles();

	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		const ext = path.extname(file).toLowerCase();
		if (!TEXT_EXT.has(ext)) continue;
		if (file.endsWith('adapt-marathon.mjs')) continue;
		const before = await readFile(file, 'utf8');
		const after = applyReplacements(before);
		if (after !== before) {
			await writeFile(file, after, 'utf8');
			changed += 1;
		}
	}
	console.log(`Updated ${changed} text files for Marathon Cheats.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
