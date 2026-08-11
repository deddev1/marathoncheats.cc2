import { siteConfig } from './site';

/** Screenshots used across product pages — simple marathon cheats keyword alts. */
export const marathonImages = {
	hero: '/hero.png',
	espWallhack: '/wallhack.webp',
	aimbotCombat: '/aimbot.webp',
	aimbotSkeleton: '/aimbot-view.webp',
	playerEsp: '/radar.webp',
	cheatsCombat: '/raid.webp',
	logo: siteConfig.logo,
	/** @deprecated Blog / legacy aliases — each maps to one of the six assets above */
	cover: '/raid.webp',
	loadoutBuilder: '/radar.webp',
	squadFight: '/aimbot-view.webp',
	cheatsPackage: '/radar.webp',
	headerArt: '/aimbot-view.webp',
	battleRoyaleCombat: '/raid.webp',
	extractFight: '/aimbot.webp',
	rebootFight: '/aimbot.webp',
	scavRunCombat: '/wallhack.webp',
	scavRunMode: '/esp.webp',
	battleRoyaleIsland: '/esp.webp',
	raidMap: '/esp.webp',
	product: [
		{ src: '/esp.webp', alt: 'marathon cheats esp' },
		{ src: '/wallhack.webp', alt: 'marathon cheats wallhack' },
		{ src: '/aimbot.webp', alt: 'marathon cheats aimbot' },
		{ src: '/esp.webp', alt: 'marathon cheats esp' },
		{ src: '/wallhack.webp', alt: 'marathon cheats wallhack' },
		{ src: '/aimbot.webp', alt: 'marathon cheats aimbot' },
	],
	gallery: [
		{ src: '/esp.webp', alt: 'marathon cheats esp', featured: true },
		{ src: '/wallhack.webp', alt: 'marathon cheats wallhack' },
		{ src: '/aimbot.webp', alt: 'marathon cheats aimbot' },
		{ src: '/esp.webp', alt: 'marathon cheats esp' },
		{ src: '/wallhack.webp', alt: 'marathon cheats wallhack' },
	],
	/**
	 * @deprecated Prefer brand.sitemap.images via brand-sitemap / page-sitemap.
	 * Kept as path aliases for older imports; titles come from Brand Studio.
	 */
	sitemap: [
		{ src: '/esp.webp', title: '', caption: '' },
		{ src: '/wallhack.webp', title: '', caption: '' },
		{ src: '/aimbot.webp', title: '', caption: '' },
		{ src: '/aimbot-view.webp', title: '', caption: '' },
		{ src: '/radar.webp', title: '', caption: '' },
		{ src: '/raid.webp', title: '', caption: '' },
	],
} as const;
