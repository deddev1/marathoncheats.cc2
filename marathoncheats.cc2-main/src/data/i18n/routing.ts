import { siteConfig } from '../site';
import {
	defaultLocale,
	isLocaleCode,
	localeCodes,
	localeMap,
	type LocaleCode,
	locales,
} from './locales';

/** Canonical page identifiers shared across all locales. */
export type PageId =
	| 'home'
	| 'marathon-esp'
	| 'marathon-aimbot'
	| 'features'
	| 'pricing'
	| 'setup'
	| 'updates'
	| 'faq'
	| 'support'
	| 'undetected'
	| 'wallhack'
	| 'radar'
	| 'battleye'
	| 'cheats-2026'
	| 'hacks'
	| 'cheat-download'
	| 'mod-menu'
	| 'soft-aim'
	| 'best-cheats'
	| 'aimbot-hack'
	| 'esp-hack'
	| 'unlock-all'
	| 'privacy'
	| 'refund'
	| 'terms';

/** English (official) paths — served at site root without /en/ prefix. */
export const englishPaths: Record<PageId, string> = {
	home: '/',
	'marathon-esp': '/marathon-esp/',
	'marathon-aimbot': '/marathon-aimbot/',
	features: '/features/',
	pricing: '/pricing/',
	setup: '/setup/',
	updates: '/updates/',
	faq: '/faq/',
	support: '/support/',
	undetected: '/undetected-marathon-cheats/',
	wallhack: '/marathon-wallhack/',
	radar: '/marathon-radar-hack/',
	'battleye': '/battleye-bypass/',
	'cheats-2026': '/marathon-cheats-2026/',
	hacks: '/marathon-cheats/',
	'cheat-download': '/marathon-cheat-download/',
	'mod-menu': '/marathon-mod-menu/',
	'soft-aim': '/marathon-soft-aim/',
	'best-cheats': '/best-marathon-cheats/',
	'aimbot-hack': '/marathon-aimbot-hack/',
	'esp-hack': '/marathon-esp-hack/',
	'unlock-all': '/marathon-unlock-all/',
	privacy: '/privacy-policy/',
	refund: '/refund-policy/',
	terms: '/terms/',
};

/**
 * Localized URL slugs (path after /{lang}/).
 * English uses englishPaths at root; other locales use these slugs under /{lang}/.
 */
export const localizedSlugs: Record<PageId, Record<LocaleCode, string>> = {
	home: {
		en: '',
		es: '',
		fr: '',
		de: '',
		pt: '',
		it: '',
		nl: '',
		pl: '',
		ru: '',
		tr: '',
		ar: '',
		ja: '',
		ko: '',
		zh: '',
		hi: '',
		id: '',
		th: '',
		vi: '',
		uk: '',
		cs: '',
		ro: '',
		sv: '',
	},
	'marathon-esp': {
		en: 'marathon-esp',
		es: 'trucos-marathon-esp',
		fr: 'triche-marathon-esp',
		de: 'marathon-esp-wallhack',
		pt: 'cheats-marathon-esp',
		it: 'trucchi-marathon-esp',
		nl: 'marathon-esp-wallhack',
		pl: 'cheaty-marathon-esp',
		ru: 'marathon-esp-chity',
		tr: 'marathon-esp-hile',
		ar: 'marathon-esp-wallhack',
		ja: 'marathon-esp-wallhack',
		ko: 'marathon-esp-wallhack',
		zh: 'marathon-esp-wallhack',
		hi: 'marathon-esp-wallhack',
		id: 'marathon-esp-wallhack',
		th: 'marathon-esp-wallhack',
		vi: 'marathon-esp-wallhack',
		uk: 'marathon-esp-chity',
		cs: 'marathon-esp-wallhack',
		ro: 'marathon-esp-wallhack',
		sv: 'marathon-esp-wallhack',
	},
	'marathon-aimbot': {
		en: 'marathon-aimbot',
		es: 'trucos-marathon-aimbot',
		fr: 'triche-marathon-aimbot',
		de: 'marathon-aimbot',
		pt: 'cheats-marathon-aimbot',
		it: 'trucchi-marathon-aimbot',
		nl: 'marathon-aimbot',
		pl: 'cheaty-marathon-aimbot',
		ru: 'marathon-aimbot-chity',
		tr: 'marathon-aimbot-hile',
		ar: 'marathon-aimbot',
		ja: 'marathon-aimbot',
		ko: 'marathon-aimbot',
		zh: 'marathon-aimbot',
		hi: 'marathon-aimbot',
		id: 'marathon-aimbot',
		th: 'marathon-aimbot',
		vi: 'marathon-aimbot',
		uk: 'marathon-aimbot-chity',
		cs: 'marathon-aimbot',
		ro: 'marathon-aimbot',
		sv: 'marathon-aimbot',
	},
	features: {
		en: 'features',
		es: 'caracteristicas-trucos-marathon',
		fr: 'fonctionnalites-triche-marathon',
		de: 'bungie-marathon-cheats-funktionen',
		pt: 'recursos-cheats-marathon',
		it: 'funzioni-trucchi-marathon',
		nl: 'bungie-marathon-cheats-functies',
		pl: 'funkcje-cheatow-marathon',
		ru: 'funkcii-chitov-marathon',
		tr: 'marathon-hile-ozellikleri',
		ar: 'bungie-marathon-cheats-features',
		ja: 'bungie-marathon-cheats-features',
		ko: 'bungie-marathon-cheats-features',
		zh: 'bungie-marathon-cheats-features',
		hi: 'bungie-marathon-cheats-features',
		id: 'bungie-marathon-cheats-features',
		th: 'bungie-marathon-cheats-features',
		vi: 'bungie-marathon-cheats-features',
		uk: 'funkcii-chitiv-marathon',
		cs: 'bungie-marathon-cheats-funkce',
		ro: 'functii-cheats-marathon',
		sv: 'bungie-marathon-cheats-funktioner',
	},
	pricing: {
		en: 'pricing',
		es: 'precios-trucos-marathon',
		fr: 'prix-triche-marathon',
		de: 'bungie-marathon-cheats-preise',
		pt: 'precos-cheats-marathon',
		it: 'prezzi-trucchi-marathon',
		nl: 'bungie-marathon-cheats-prijzen',
		pl: 'ceny-cheatow-marathon',
		ru: 'ceny-chitov-marathon',
		tr: 'marathon-hile-fiyatlari',
		ar: 'bungie-marathon-cheats-pricing',
		ja: 'bungie-marathon-cheats-pricing',
		ko: 'bungie-marathon-cheats-pricing',
		zh: 'bungie-marathon-cheats-pricing',
		hi: 'bungie-marathon-cheats-pricing',
		id: 'bungie-marathon-cheats-pricing',
		th: 'bungie-marathon-cheats-pricing',
		vi: 'bungie-marathon-cheats-pricing',
		uk: 'ciny-chitiv-marathon',
		cs: 'bungie-marathon-cheats-ceny',
		ro: 'preturi-cheats-marathon',
		sv: 'bungie-marathon-cheats-priser',
	},
	setup: {
		en: 'setup',
		es: 'instalacion-trucos-marathon',
		fr: 'installation-triche-marathon',
		de: 'bungie-marathon-cheats-installation',
		pt: 'instalacao-cheats-marathon',
		it: 'installazione-trucchi-marathon',
		nl: 'bungie-marathon-cheats-installatie',
		pl: 'instalacja-cheatow-marathon',
		ru: 'ustanovka-chitov-marathon',
		tr: 'marathon-hile-kurulum',
		ar: 'bungie-marathon-cheats-setup',
		ja: 'bungie-marathon-cheats-setup',
		ko: 'bungie-marathon-cheats-setup',
		zh: 'bungie-marathon-cheats-setup',
		hi: 'bungie-marathon-cheats-setup',
		id: 'bungie-marathon-cheats-setup',
		th: 'bungie-marathon-cheats-setup',
		vi: 'bungie-marathon-cheats-setup',
		uk: 'vstanovka-chitiv-marathon',
		cs: 'bungie-marathon-cheats-instalace',
		ro: 'instalare-cheats-marathon',
		sv: 'bungie-marathon-cheats-installation',
	},
	updates: {
		en: 'updates',
		es: 'actualizaciones-trucos-marathon',
		fr: 'mises-a-jour-triche-marathon',
		de: 'bungie-marathon-cheats-updates',
		pt: 'atualizacoes-cheats-marathon',
		it: 'aggiornamenti-trucchi-marathon',
		nl: 'bungie-marathon-cheats-updates',
		pl: 'aktualizacje-cheatow-marathon',
		ru: 'obnovleniya-chitov-marathon',
		tr: 'marathon-hile-guncellemeleri',
		ar: 'bungie-marathon-cheats-updates',
		ja: 'bungie-marathon-cheats-updates',
		ko: 'bungie-marathon-cheats-updates',
		zh: 'bungie-marathon-cheats-updates',
		hi: 'bungie-marathon-cheats-updates',
		id: 'bungie-marathon-cheats-updates',
		th: 'bungie-marathon-cheats-updates',
		vi: 'bungie-marathon-cheats-updates',
		uk: 'onovlennya-chitiv-marathon',
		cs: 'bungie-marathon-cheats-aktualizace',
		ro: 'actualizari-cheats-marathon',
		sv: 'bungie-marathon-cheats-uppdateringar',
	},
	faq: {
		en: 'faq',
		es: 'preguntas-trucos-marathon',
		fr: 'faq-triche-marathon',
		de: 'bungie-marathon-cheats-faq',
		pt: 'faq-cheats-marathon',
		it: 'faq-trucchi-marathon',
		nl: 'bungie-marathon-cheats-faq',
		pl: 'faq-cheatow-marathon',
		ru: 'faq-chitov-marathon',
		tr: 'marathon-hile-sss',
		ar: 'bungie-marathon-cheats-faq',
		ja: 'bungie-marathon-cheats-faq',
		ko: 'bungie-marathon-cheats-faq',
		zh: 'bungie-marathon-cheats-faq',
		hi: 'bungie-marathon-cheats-faq',
		id: 'bungie-marathon-cheats-faq',
		th: 'bungie-marathon-cheats-faq',
		vi: 'bungie-marathon-cheats-faq',
		uk: 'faq-chitiv-marathon',
		cs: 'bungie-marathon-cheats-faq',
		ro: 'faq-cheats-marathon',
		sv: 'bungie-marathon-cheats-faq',
	},
	support: {
		en: 'support',
		es: 'soporte-trucos-marathon',
		fr: 'support-triche-marathon',
		de: 'bungie-marathon-cheats-support',
		pt: 'suporte-cheats-marathon',
		it: 'supporto-trucchi-marathon',
		nl: 'bungie-marathon-cheats-support',
		pl: 'wsparcie-cheatow-marathon',
		ru: 'podderzhka-chitov-marathon',
		tr: 'marathon-hile-destek',
		ar: 'bungie-marathon-cheats-support',
		ja: 'bungie-marathon-cheats-support',
		ko: 'bungie-marathon-cheats-support',
		zh: 'bungie-marathon-cheats-support',
		hi: 'bungie-marathon-cheats-support',
		id: 'bungie-marathon-cheats-support',
		th: 'bungie-marathon-cheats-support',
		vi: 'bungie-marathon-cheats-support',
		uk: 'pidtrymka-chitiv-marathon',
		cs: 'bungie-marathon-cheats-podpora',
		ro: 'suport-cheats-marathon',
		sv: 'bungie-marathon-cheats-support',
	},
	undetected: {
		en: 'undetected-marathon-cheats',
		es: 'trucos-marathon-indetectables',
		fr: 'triche-marathon-indetectable',
		de: 'unentdeckte-bungie-marathon-cheats',
		pt: 'cheats-marathon-indetectaveis',
		it: 'trucchi-marathon-indetectabili',
		nl: 'undetected-marathon-cheats',
		pl: 'niewykrywalne-cheats-marathon',
		ru: 'nedecektiruemye-chity-marathon',
		tr: 'tespit-edilemeyen-marathon-hileleri',
		ar: 'undetected-marathon-cheats',
		ja: 'undetected-marathon-cheats',
		ko: 'undetected-marathon-cheats',
		zh: 'undetected-marathon-cheats',
		hi: 'undetected-marathon-cheats',
		id: 'undetected-marathon-cheats',
		th: 'undetected-marathon-cheats',
		vi: 'undetected-marathon-cheats',
		uk: 'nedecektovani-chity-marathon',
		cs: 'undetected-marathon-cheats',
		ro: 'cheats-marathon-nedetectabile',
		sv: 'undetected-marathon-cheats',
	},
	wallhack: {
		en: 'marathon-wallhack',
		es: 'wallhack-trucos-marathon',
		fr: 'wallhack-triche-marathon',
		de: 'marathon-wallhack',
		pt: 'wallhack-cheats-marathon',
		it: 'wallhack-trucchi-marathon',
		nl: 'marathon-wallhack',
		pl: 'wallhack-cheatow-marathon',
		ru: 'wallhack-chity-marathon',
		tr: 'marathon-wallhack-hile',
		ar: 'marathon-wallhack',
		ja: 'marathon-wallhack',
		ko: 'marathon-wallhack',
		zh: 'marathon-wallhack',
		hi: 'marathon-wallhack',
		id: 'marathon-wallhack',
		th: 'marathon-wallhack',
		vi: 'marathon-wallhack',
		uk: 'wallhack-chity-marathon',
		cs: 'marathon-wallhack',
		ro: 'wallhack-cheats-marathon',
		sv: 'marathon-wallhack',
	},
	radar: {
		en: 'marathon-radar-hack',
		es: 'radar-hack-trucos-marathon',
		fr: 'radar-hack-triche-marathon',
		de: 'marathon-radar-hack',
		pt: 'radar-hack-cheats-marathon',
		it: 'radar-hack-trucchi-marathon',
		nl: 'marathon-radar-hack',
		pl: 'radar-hack-cheatow-marathon',
		ru: 'radar-hack-chity-marathon',
		tr: 'marathon-radar-hack',
		ar: 'marathon-radar-hack',
		ja: 'marathon-radar-hack',
		ko: 'marathon-radar-hack',
		zh: 'marathon-radar-hack',
		hi: 'marathon-radar-hack',
		id: 'marathon-radar-hack',
		th: 'marathon-radar-hack',
		vi: 'marathon-radar-hack',
		uk: 'radar-hack-chity-marathon',
		cs: 'marathon-radar-hack',
		ro: 'radar-hack-cheats-marathon',
		sv: 'marathon-radar-hack',
	},
	'battleye': {
		en: 'battleye-bypass',
		es: 'battleye-bypass-trucos',
		fr: 'battleye-bypass-triche',
		de: 'battleye-bypass',
		pt: 'battleye-bypass-cheats',
		it: 'battleye-bypass-trucchi',
		nl: 'battleye-bypass',
		pl: 'battleye-bypass-cheatow',
		ru: 'battleye-bypass-chity',
		tr: 'battleye-bypass',
		ar: 'battleye-bypass',
		ja: 'battleye-bypass',
		ko: 'battleye-bypass',
		zh: 'battleye-bypass',
		hi: 'battleye-bypass',
		id: 'battleye-bypass',
		th: 'battleye-bypass',
		vi: 'battleye-bypass',
		uk: 'battleye-bypass-chity',
		cs: 'battleye-bypass',
		ro: 'battleye-bypass-cheats',
		sv: 'battleye-bypass',
	},
	'cheats-2026': {
		en: 'marathon-cheats-2026',
		es: 'trucos-marathon-2026',
		fr: 'triche-marathon-2026',
		de: 'marathon-cheats-2026',
		pt: 'cheats-marathon-2026',
		it: 'trucchi-marathon-2026',
		nl: 'marathon-cheats-2026',
		pl: 'cheaty-marathon-2026',
		ru: 'chity-marathon-2026',
		tr: 'marathon-hileleri-2026',
		ar: 'marathon-cheats-2026',
		ja: 'marathon-cheats-2026',
		ko: 'marathon-cheats-2026',
		zh: 'marathon-cheats-2026',
		hi: 'marathon-cheats-2026',
		id: 'marathon-cheats-2026',
		th: 'marathon-cheats-2026',
		vi: 'marathon-cheats-2026',
		uk: 'chity-marathon-2026',
		cs: 'marathon-cheats-2026',
		ro: 'cheats-marathon-2026',
		sv: 'marathon-cheats-2026',
	},
	hacks: {
		en: 'marathon-cheats',
		es: 'hacks-trucos-marathon',
		fr: 'hacks-triche-marathon',
		de: 'marathon-cheats',
		pt: 'hacks-cheats-marathon',
		it: 'hacks-trucchi-marathon',
		nl: 'marathon-cheats',
		pl: 'hacks-cheatow-marathon',
		ru: 'haksy-chity-marathon',
		tr: 'marathon-hile-hacks',
		ar: 'marathon-cheats',
		ja: 'marathon-cheats',
		ko: 'marathon-cheats',
		zh: 'marathon-cheats',
		hi: 'marathon-cheats',
		id: 'marathon-cheats',
		th: 'marathon-cheats',
		vi: 'marathon-cheats',
		uk: 'haksy-chity-marathon',
		cs: 'marathon-cheats',
		ro: 'hacks-cheats-marathon',
		sv: 'marathon-cheats',
	},
	'cheat-download': {
		en: 'marathon-cheat-download',
		es: 'descarga-trucos-marathon',
		fr: 'telechargement-triche-marathon',
		de: 'marathon-cheat-download',
		pt: 'download-cheats-marathon',
		it: 'download-trucchi-marathon',
		nl: 'marathon-cheat-download',
		pl: 'pobieranie-cheatow-marathon',
		ru: 'skachat-chity-marathon',
		tr: 'marathon-hile-indir',
		ar: 'marathon-cheat-download',
		ja: 'marathon-cheat-download',
		ko: 'marathon-cheat-download',
		zh: 'marathon-cheat-download',
		hi: 'marathon-cheat-download',
		id: 'marathon-cheat-download',
		th: 'marathon-cheat-download',
		vi: 'marathon-cheat-download',
		uk: 'zavantazhennya-chitiv-marathon',
		cs: 'marathon-cheat-download',
		ro: 'descarcare-cheats-marathon',
		sv: 'marathon-cheat-download',
	},
	'mod-menu': {
		en: 'marathon-mod-menu',
		es: 'menu-mod-trucos-marathon',
		fr: 'menu-mod-triche-marathon',
		de: 'marathon-mod-menu',
		pt: 'menu-mod-cheats-marathon',
		it: 'menu-mod-trucchi-marathon',
		nl: 'marathon-mod-menu',
		pl: 'menu-mod-cheatow-marathon',
		ru: 'mod-menu-chity-marathon',
		tr: 'marathon-mod-menu',
		ar: 'marathon-mod-menu',
		ja: 'marathon-mod-menu',
		ko: 'marathon-mod-menu',
		zh: 'marathon-mod-menu',
		hi: 'marathon-mod-menu',
		id: 'marathon-mod-menu',
		th: 'marathon-mod-menu',
		vi: 'marathon-mod-menu',
		uk: 'mod-menu-chity-marathon',
		cs: 'marathon-mod-menu',
		ro: 'meniu-mod-cheats-marathon',
		sv: 'marathon-mod-menu',
	},
	'soft-aim': {
		en: 'marathon-soft-aim',
		es: 'soft-aim-trucos-marathon',
		fr: 'soft-aim-triche-marathon',
		de: 'marathon-soft-aim',
		pt: 'soft-aim-cheats-marathon',
		it: 'soft-aim-trucchi-marathon',
		nl: 'marathon-soft-aim',
		pl: 'soft-aim-cheatow-marathon',
		ru: 'soft-aim-chity-marathon',
		tr: 'marathon-soft-aim',
		ar: 'marathon-soft-aim',
		ja: 'marathon-soft-aim',
		ko: 'marathon-soft-aim',
		zh: 'marathon-soft-aim',
		hi: 'marathon-soft-aim',
		id: 'marathon-soft-aim',
		th: 'marathon-soft-aim',
		vi: 'marathon-soft-aim',
		uk: 'soft-aim-chity-marathon',
		cs: 'marathon-soft-aim',
		ro: 'soft-aim-cheats-marathon',
		sv: 'marathon-soft-aim',
	},
	'best-cheats': {
		en: 'best-marathon-cheats',
		es: 'mejores-trucos-marathon',
		fr: 'meilleures-triches-marathon',
		de: 'beste-bungie-marathon-cheats',
		pt: 'melhores-cheats-marathon',
		it: 'migliori-trucchi-marathon',
		nl: 'beste-bungie-marathon-cheats',
		pl: 'najlepsze-cheats-marathon',
		ru: 'luchshie-chity-marathon',
		tr: 'en-iyi-marathon-hileleri',
		ar: 'best-marathon-cheats',
		ja: 'best-marathon-cheats',
		ko: 'best-marathon-cheats',
		zh: 'best-marathon-cheats',
		hi: 'best-marathon-cheats',
		id: 'best-marathon-cheats',
		th: 'best-marathon-cheats',
		vi: 'best-marathon-cheats',
		uk: 'naykrashchi-chity-marathon',
		cs: 'nejlepsi-bungie-marathon-cheats',
		ro: 'cele-mai-bune-cheats-marathon',
		sv: 'basta-bungie-marathon-cheats',
	},
	'aimbot-hack': {
		en: 'marathon-aimbot-hack',
		es: 'aimbot-hack-trucos-marathon',
		fr: 'aimbot-hack-triche-marathon',
		de: 'marathon-aimbot-hack',
		pt: 'aimbot-hack-cheats-marathon',
		it: 'aimbot-hack-trucchi-marathon',
		nl: 'marathon-aimbot-hack',
		pl: 'aimbot-hack-cheatow-marathon',
		ru: 'aimbot-hack-chity-marathon',
		tr: 'marathon-aimbot-hack',
		ar: 'marathon-aimbot-hack',
		ja: 'marathon-aimbot-hack',
		ko: 'marathon-aimbot-hack',
		zh: 'marathon-aimbot-hack',
		hi: 'marathon-aimbot-hack',
		id: 'marathon-aimbot-hack',
		th: 'marathon-aimbot-hack',
		vi: 'marathon-aimbot-hack',
		uk: 'aimbot-hack-chity-marathon',
		cs: 'marathon-aimbot-hack',
		ro: 'aimbot-hack-cheats-marathon',
		sv: 'marathon-aimbot-hack',
	},
	'esp-hack': {
		en: 'marathon-esp-hack',
		es: 'esp-hack-trucos-marathon',
		fr: 'esp-hack-triche-marathon',
		de: 'marathon-esp-hack',
		pt: 'esp-hack-cheats-marathon',
		it: 'esp-hack-trucchi-marathon',
		nl: 'marathon-esp-hack',
		pl: 'esp-hack-cheatow-marathon',
		ru: 'esp-hack-chity-marathon',
		tr: 'marathon-esp-hack',
		ar: 'marathon-esp-hack',
		ja: 'marathon-esp-hack',
		ko: 'marathon-esp-hack',
		zh: 'marathon-esp-hack',
		hi: 'marathon-esp-hack',
		id: 'marathon-esp-hack',
		th: 'marathon-esp-hack',
		vi: 'marathon-esp-hack',
		uk: 'esp-hack-chity-marathon',
		cs: 'marathon-esp-hack',
		ro: 'esp-hack-cheats-marathon',
		sv: 'marathon-esp-hack',
	},
	'unlock-all': {
		en: 'marathon-unlock-all',
		es: 'unlock-all-trucos-marathon',
		fr: 'unlock-all-triche-marathon',
		de: 'marathon-unlock-all',
		pt: 'unlock-all-cheats-marathon',
		it: 'unlock-all-trucchi-marathon',
		nl: 'marathon-unlock-all',
		pl: 'unlock-all-cheatow-marathon',
		ru: 'unlock-all-chity-marathon',
		tr: 'marathon-unlock-all',
		ar: 'marathon-unlock-all',
		ja: 'marathon-unlock-all',
		ko: 'marathon-unlock-all',
		zh: 'marathon-unlock-all',
		hi: 'marathon-unlock-all',
		id: 'marathon-unlock-all',
		th: 'marathon-unlock-all',
		vi: 'marathon-unlock-all',
		uk: 'unlock-all-chity-marathon',
		cs: 'marathon-unlock-all',
		ro: 'unlock-all-cheats-marathon',
		sv: 'marathon-unlock-all',
	},
	privacy: {
		en: 'privacy-policy',
		es: 'politica-privacidad',
		fr: 'politique-confidentialite',
		de: 'datenschutz',
		pt: 'politica-privacidade',
		it: 'privacy-policy',
		nl: 'privacybeleid',
		pl: 'polityka-prywatnosci',
		ru: 'politika-konfidencialnosti',
		tr: 'gizlilik-politikasi',
		ar: 'privacy-policy',
		ja: 'privacy-policy',
		ko: 'privacy-policy',
		zh: 'privacy-policy',
		hi: 'privacy-policy',
		id: 'privacy-policy',
		th: 'privacy-policy',
		vi: 'privacy-policy',
		uk: 'polityka-konfidentsijnosti',
		cs: 'ochrana-osobnich-udaju',
		ro: 'politica-confidentialitate',
		sv: 'integritetspolicy',
	},
	refund: {
		en: 'refund-policy',
		es: 'politica-reembolso',
		fr: 'politique-remboursement',
		de: 'rueckerstattung',
		pt: 'politica-reembolso',
		it: 'politica-rimborso',
		nl: 'terugbetalingsbeleid',
		pl: 'polityka-zwrotow',
		ru: 'politika-vozvrata',
		tr: 'iade-politikasi',
		ar: 'refund-policy',
		ja: 'refund-policy',
		ko: 'refund-policy',
		zh: 'refund-policy',
		hi: 'refund-policy',
		id: 'refund-policy',
		th: 'refund-policy',
		vi: 'refund-policy',
		uk: 'polityka-povorennya',
		cs: 'refund-policy',
		ro: 'politica-rambursare',
		sv: 'aterbetalningspolicy',
	},
	terms: {
		en: 'terms',
		es: 'terminos-uso',
		fr: 'conditions-utilisation',
		de: 'nutzungsbedingungen',
		pt: 'termos-uso',
		it: 'termini-uso',
		nl: 'gebruiksvoorwaarden',
		pl: 'regulamin',
		ru: 'usloviya-ispolzovaniya',
		tr: 'kullanim-kosullari',
		ar: 'terms',
		ja: 'terms',
		ko: 'terms',
		zh: 'terms',
		hi: 'terms',
		id: 'terms',
		th: 'terms',
		vi: 'terms',
		uk: 'umovy-vykorystannya',
		cs: 'podminky-uziti',
		ro: 'termeni-utilizare',
		sv: 'anvandarvillkor',
	},
};

export const pageIds = Object.keys(englishPaths) as PageId[];

export function getLocalizedPath(pageId: PageId, locale: LocaleCode): string {
	if (locale === defaultLocale) {
		return englishPaths[pageId];
	}
	const slug = localizedSlugs[pageId][locale];
	return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

/** Map English root paths to the correct locale URL (for CTAs and inline links). */
export function localizeInternalHref(href: string, locale: LocaleCode): string {
	if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
		return href;
	}
	const trimmed = href.replace(/\/+$/, '') || '/';
	const withSlash = trimmed === '/' ? '/' : `${trimmed}/`;
	for (const pageId of pageIds) {
		const english = englishPaths[pageId];
		if (english === withSlash || english.replace(/\/+$/, '') === trimmed) {
			return getLocalizedPath(pageId, locale);
		}
	}
	return href;
}

/** Canonical absolute URL — always https apex with trailing slash (matches Layout.astro). */
export function buildCanonicalUrl(path: string): string {
	const normalized =
		!path || path === '/'
			? '/'
			: path.endsWith('/') || path.includes('.')
				? path
				: `${path}/`;
	return new URL(normalized, siteConfig.url).href;
}

export function absoluteLocalizedUrl(pageId: PageId, locale: LocaleCode): string {
	return buildCanonicalUrl(getLocalizedPath(pageId, locale));
}

export type HreflangAlternate = { hreflang: string; href: string };

/** Self-referential hreflang for single-locale pages (reviews, 404). */
export function getSelfHreflangAlternates(
	path: string,
	locale: LocaleCode = defaultLocale,
): HreflangAlternate[] {
	const href = buildCanonicalUrl(path);
	return [
		{ hreflang: localeMap[locale].hreflang, href },
		{ hreflang: 'x-default', href },
	];
}

export function getHreflangAlternates(pageId: PageId, currentLocale: LocaleCode = defaultLocale) {
	const byLocale = localeCodes.map((code) => ({
		hreflang: localeMap[code].hreflang,
		href: absoluteLocalizedUrl(pageId, code),
		code,
	}));
	const self = byLocale.find((alt) => alt.code === currentLocale)!;
	const others = byLocale.filter((alt) => alt.code !== currentLocale);
	const xDefault = {
		hreflang: 'x-default' as const,
		href: absoluteLocalizedUrl(pageId, defaultLocale),
	};
	// Self-referential hreflang first — required by Google/Seobility for the active locale.
	return [
		{ hreflang: self.hreflang, href: self.href },
		...others.map(({ hreflang, href }) => ({ hreflang, href })),
		xDefault,
	];
}

export function resolvePageIdFromPath(path: string): PageId | undefined {
	const normalized = path.endsWith('/') ? path : `${path}/`;
	for (const id of pageIds) {
		if (englishPaths[id] === normalized) return id;
	}
	return undefined;
}

/** Parsed locale + page from any site URL (English root or /{lang}/…). */
export type PageContext = {
	locale: LocaleCode;
	pageId?: PageId;
	isBlogIndex?: boolean;
	blogSlug?: string;
};

function normalizePathname(pathname: string): string {
	if (!pathname || pathname === '/') return '/';
	if (pathname.includes('.') || pathname.endsWith('/')) return pathname;
	return `${pathname}/`;
}

/** Resolve locale and page/blog context from the current URL path. */
export function resolvePageContextFromPath(pathname: string): PageContext {
	const path = normalizePathname(pathname);

	if (path === '/') {
		return { locale: defaultLocale, pageId: 'home' };
	}

	const segments = path.split('/').filter(Boolean);
	let locale: LocaleCode = defaultLocale;
	let offset = 0;

	if (segments.length > 0 && isLocaleCode(segments[0]) && segments[0] !== defaultLocale) {
		locale = segments[0];
		offset = 1;
	}

	const rest = segments.slice(offset);

	if (rest.length === 0) {
		return { locale, pageId: 'home' };
	}

	if (rest[0] === 'blog') {
		if (rest.length === 1) {
			return { locale, isBlogIndex: true };
		}
		return { locale, blogSlug: rest[1] };
	}

	if (locale === defaultLocale) {
		return { locale, pageId: resolvePageIdFromPath(path) };
	}

	return { locale, pageId: resolvePageFromLocalizedPath(locale, rest[0]) };
}

/** Target URL for the same page in another locale (non-blog pages). */
export function getPageLocaleSwitchHref(context: PageContext, targetLocale: LocaleCode): string {
	if (context.pageId) {
		return getLocalizedPath(context.pageId, targetLocale);
	}
	return getLocalizedPath('home', targetLocale);
}

export function hreflangLinksXml(pageId: PageId, escapeXml: (v: string) => string): string {
	return getHreflangAlternates(pageId)
		.map(
			(alt) =>
				`    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}"/>`,
		)
		.join('\n');
}

export function resolvePageFromLocalizedPath(
	locale: LocaleCode,
	slug: string | undefined,
): PageId | undefined {
	if (!slug) return 'home';
	for (const pageId of pageIds) {
		if (localizedSlugs[pageId][locale] === slug) return pageId;
	}
	return undefined;
}

/** Map Accept-Language header to preferred locale (region-aware). */
export function localeFromAcceptLanguage(header: string | null): LocaleCode {
	if (!header) return defaultLocale;
	const prefs = header
		.split(',')
		.map((part) => {
			const [tag, qPart] = part.trim().split(';');
			const q = qPart?.startsWith('q=') ? Number.parseFloat(qPart.slice(2)) : 1;
			return { tag: tag.toLowerCase(), q };
		})
		.sort((a, b) => b.q - a.q);

	for (const { tag } of prefs) {
		const primary = tag.split('-')[0];
		if (localeCodes.includes(primary as LocaleCode)) return primary as LocaleCode;
	}
	return defaultLocale;
}

export function getNavForLocale(locale: LocaleCode, labels: Record<string, string>) {
	const items: { label: string; href: string; pageId?: PageId }[] = [
		{ label: labels.home, href: getLocalizedPath('home', locale), pageId: 'home' },
	{ label: labels.hacks ?? 'Hacks', href: getLocalizedPath('hacks', locale), pageId: 'hacks' },
		{ label: labels.aimbot, href: getLocalizedPath('marathon-aimbot', locale), pageId: 'marathon-aimbot' },
		{ label: labels.esp, href: getLocalizedPath('marathon-esp', locale), pageId: 'marathon-esp' },
		{ label: 'Blog', href: locale === defaultLocale ? '/blog/' : `/${locale}/blog/` },
		{ label: labels.features, href: getLocalizedPath('features', locale), pageId: 'features' },
		{ label: labels.pricing, href: getLocalizedPath('pricing', locale), pageId: 'pricing' },
		{ label: labels.setup, href: getLocalizedPath('setup', locale), pageId: 'setup' },
		{ label: labels.updates, href: getLocalizedPath('updates', locale), pageId: 'updates' },
		{ label: labels.faq, href: getLocalizedPath('faq', locale), pageId: 'faq' },
	];
	return items;
}
