import { siteConfig } from './site';

/** Screenshots used across product pages — simple marathon cheats keyword alts. */
export const marathonImages = {
	hero: '/images/marathon-cheats-hero-full.png',
	espWallhack: '/images/marathon-cheats-wallhack.webp',
	aimbotCombat: '/images/marathon-cheats-aimbot.webp',
	aimbotSkeleton: '/images/marathon-cheats-aimbot-view.webp',
	playerEsp: '/images/marathon-cheats-radar.webp',
	cheatsCombat: '/images/marathon-cheats-raid.webp',
	logo: siteConfig.logo,
	/** @deprecated Blog / legacy aliases — each maps to one of the six assets above */
	cover: '/images/marathon-cheats-raid.webp',
	loadoutBuilder: '/images/marathon-cheats-radar.webp',
	squadFight: '/images/marathon-cheats-aimbot-view.webp',
	cheatsPackage: '/images/marathon-cheats-radar.webp',
	headerArt: '/images/marathon-cheats-aimbot-view.webp',
	battleRoyaleCombat: '/images/marathon-cheats-raid.webp',
	extractFight: '/images/marathon-cheats-aimbot.webp',
	rebootFight: '/images/marathon-cheats-aimbot.webp',
	scavRunCombat: '/images/marathon-cheats-wallhack.webp',
	scavRunMode: '/images/marathon-cheats-esp.webp',
	battleRoyaleIsland: '/images/marathon-cheats-esp.webp',
	raidMap: '/images/marathon-cheats-esp.webp',
	product: [
		{ src: '/images/marathon-cheats-esp.webp', alt: 'marathon cheats esp' },
		{ src: '/images/marathon-cheats-wallhack.webp', alt: 'marathon cheats wallhack' },
		{ src: '/images/marathon-cheats-aimbot.webp', alt: 'marathon cheats aimbot' },
		{ src: '/images/marathon-cheats-esp.webp', alt: 'marathon cheats esp' },
		{ src: '/images/marathon-cheats-wallhack.webp', alt: 'marathon cheats wallhack' },
		{ src: '/images/marathon-cheats-aimbot.webp', alt: 'marathon cheats aimbot' },
	],
	gallery: [
		{ src: '/images/marathon-cheats-esp.webp', alt: 'marathon cheats esp', featured: true },
		{ src: '/images/marathon-cheats-wallhack.webp', alt: 'marathon cheats wallhack' },
		{ src: '/images/marathon-cheats-aimbot.webp', alt: 'marathon cheats aimbot' },
		{ src: '/images/marathon-cheats-esp.webp', alt: 'marathon cheats esp' },
		{ src: '/images/marathon-cheats-wallhack.webp', alt: 'marathon cheats wallhack' },
	],
	/**
	 * @deprecated Prefer brand.sitemap.images via brand-sitemap / page-sitemap.
	 * Kept as path aliases for older imports; titles come from Brand Studio.
	 */
	sitemap: [
		{ src: '/images/marathon-cheats-esp.webp', title: '', caption: '' },
		{ src: '/images/marathon-cheats-wallhack.webp', title: '', caption: '' },
		{ src: '/images/marathon-cheats-aimbot.webp', title: '', caption: '' },
		{ src: '/images/marathon-cheats-aimbot-view.webp', title: '', caption: '' },
		{ src: '/images/marathon-cheats-radar.webp', title: '', caption: '' },
		{ src: '/images/marathon-cheats-raid.webp', title: '', caption: '' },
	],
} as const;
