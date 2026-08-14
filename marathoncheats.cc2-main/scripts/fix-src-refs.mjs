#!/usr/bin/env node
/** Final pass: fix remaining Marathon references in src/. */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const REMOVE_PAGE_IDS = ['hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats', 'aimbot-hack', 'esp-hack', 'unlock-all'];

const REPLACEMENTS = [
	['marathonImages', 'marathonImages'],
	["from '../data/marathon'", "from '../data/marathon'"],
	["from './marathon'", "from './marathon'"],
	['/undetected-marathon-cheats/', '/undetected-marathon-cheats/'],
	['/marathon-wallhack/', '/marathon-wallhack/'],
	['/marathon-radar-hack/', '/marathon-radar-hack/'],
	['/battleye-bypass/', '/battleye-bypass/'],
	['/marathon-cheats-2026/', '/marathon-cheats-2026/'],
	['/marathon-aimbot/', '/marathon-aimbot/'],
	['/marathon-esp/', '/marathon-esp/'],
	['/marathon-cheats/', '/marathon-esp/'],
	['Marathon Cheats', 'Marathon Cheats'],
	['Marathon cheats', 'Marathon cheats'],
	['Marathon wallhack', 'Bungie Marathon wallhack'],
	['Marathon radar', 'Bungie Marathon radar'],
	['Marathon Aimbot', 'Bungie Marathon Aimbot'],
	['Marathon ESP', 'Bungie Marathon ESP'],
	['Bungie Marathon', 'Bungie Marathon'],
	['BattlEye', 'BattlEye anti-cheat'],
	['battleye', 'battleye'],
	['marathoncheats.cc', 'marathoncheats.cc'],
	['operatorEsp', 'playerEsp'],
	['extractFight', 'rebootFight'],
	['alMazrah', 'battleRoyaleIsland'],
];

async function walk(dir, files = []) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else if (/\.(ts|astro|js)$/.test(entry.name)) files.push(full);
	}
	return files;
}

function apply(content) {
	let r = content;
	for (const [a, b] of REPLACEMENTS) r = r.split(a).join(b);
	for (const id of REMOVE_PAGE_IDS) {
		r = r.replace(new RegExp(`\\t'${id}':[^\\n]*\\n`, 'g'), '');
		r = r.replace(new RegExp(`\\{ label:[^}]*href: '/[^']*${id}[^']*/' \\},\\n`, 'g'), '');
	}
	return r;
}

for (const file of await walk(ROOT)) {
	const orig = await readFile(file, 'utf8');
	const updated = apply(orig);
	if (updated !== orig) {
		await writeFile(file, updated);
		console.log('Fixed', path.relative(ROOT, file));
	}
}
