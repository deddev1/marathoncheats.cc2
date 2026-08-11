import { siteConfig } from './site';

/** Screenshots used across product pages — simple marathon cheats keyword alts. */
export const marathonImages = {
	hero: '/hero.png',
	espWallhack: '/wallhack.webp',
	aimbotCombat: '/aimbot.webp',
	aimbotSkeleton: '/aimbot-view.webp',
	playerEsp: '/radar.webp',
	cheatsCombat: '/combat.webp',
	logo: siteConfig.logo,
	/** @deprecated Blog / legacy aliases — each maps to one of the assets above */
	cover: '/combat.webp',
	loadoutBuilder: '/radar.webp',
	squadFight: '/aimbot-view.webp',
	cheatsPackage: '/esp.webp',
	headerArt: '/softaim.webp',
	battleRoyaleCombat: '/combat.webp',
	extractFight: '/aimbot.webp',
	rebootFight: '/marauders.webp',
	scavRunCombat: '/wallhack.webp',
	scavRunMode: '/esp.webp',
	battleRoyaleIsland: '/esp.webp',
	raidMap: '/esp.webp',
	product: [
		{ src: '/gallery-1.webp', alt: 'marathon cheats in-game ESP' },
		{ src: '/gallery-2.webp', alt: 'marathon cheats in-game aimbot' },
		{ src: '/gallery-3.webp', alt: 'marathon cheats items ESP overlay' },
		{ src: '/gallery-1.webp', alt: 'marathon cheats in-game ESP' },
		{ src: '/gallery-2.webp', alt: 'marathon cheats in-game aimbot' },
		{ src: '/gallery-3.webp', alt: 'marathon cheats items ESP overlay' },
	],
	gallery: [
		{ src: '/gallery-1.webp', alt: 'marathon cheats in-game ESP', featured: true },
		{ src: '/gallery-2.webp', alt: 'marathon cheats in-game aimbot' },
		{ src: '/gallery-3.webp', alt: 'marathon cheats items ESP overlay' },
		{ src: '/gallery-1.webp', alt: 'marathon cheats in-game ESP' },
		{ src: '/gallery-2.webp', alt: 'marathon cheats in-game aimbot' },
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
		{ src: '/combat.webp', title: '', caption: '' },
	],
} as const;
