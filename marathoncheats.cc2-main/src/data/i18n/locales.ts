export type LocaleCode =
	| 'en'
	| 'es'
	| 'fr'
	| 'de'
	| 'pt'
	| 'it'
	| 'nl'
	| 'pl'
	| 'ru'
	| 'tr'
	| 'ar'
	| 'ja'
	| 'ko'
	| 'zh'
	| 'hi'
	| 'id'
	| 'th'
	| 'vi'
	| 'uk'
	| 'cs'
	| 'ro'
	| 'sv';

export type LocaleMeta = {
	code: LocaleCode;
	name: string;
	nativeName: string;
	hreflang: string;
	ogLocale: string;
	dir: 'ltr' | 'rtl';
	region: string;
};

/** 22 locales for global Marathon Cheats blog SEO coverage. */
export const locales: LocaleMeta[] = [
	{ code: 'en', name: 'English', nativeName: 'English', hreflang: 'en', ogLocale: 'en_US', dir: 'ltr', region: 'Worldwide' },
	{ code: 'es', name: 'Spanish', nativeName: 'Español', hreflang: 'es', ogLocale: 'es_ES', dir: 'ltr', region: 'Worldwide' },
	{ code: 'fr', name: 'French', nativeName: 'Français', hreflang: 'fr', ogLocale: 'fr_FR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'de', name: 'German', nativeName: 'Deutsch', hreflang: 'de', ogLocale: 'de_DE', dir: 'ltr', region: 'Worldwide' },
	{ code: 'pt', name: 'Portuguese', nativeName: 'Português', hreflang: 'pt', ogLocale: 'pt_BR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'it', name: 'Italian', nativeName: 'Italiano', hreflang: 'it', ogLocale: 'it_IT', dir: 'ltr', region: 'Worldwide' },
	{ code: 'nl', name: 'Dutch', nativeName: 'Nederlands', hreflang: 'nl', ogLocale: 'nl_NL', dir: 'ltr', region: 'Worldwide' },
	{ code: 'pl', name: 'Polish', nativeName: 'Polski', hreflang: 'pl', ogLocale: 'pl_PL', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ru', name: 'Russian', nativeName: 'Русский', hreflang: 'ru', ogLocale: 'ru_RU', dir: 'ltr', region: 'Worldwide' },
	{ code: 'tr', name: 'Turkish', nativeName: 'Türkçe', hreflang: 'tr', ogLocale: 'tr_TR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ar', name: 'Arabic', nativeName: 'العربية', hreflang: 'ar', ogLocale: 'ar_SA', dir: 'rtl', region: 'Worldwide' },
	{ code: 'ja', name: 'Japanese', nativeName: '日本語', hreflang: 'ja', ogLocale: 'ja_JP', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ko', name: 'Korean', nativeName: '한국어', hreflang: 'ko', ogLocale: 'ko_KR', dir: 'ltr', region: 'Worldwide' },
	{ code: 'zh', name: 'Chinese', nativeName: '中文', hreflang: 'zh', ogLocale: 'zh_CN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', hreflang: 'hi', ogLocale: 'hi_IN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', hreflang: 'id', ogLocale: 'id_ID', dir: 'ltr', region: 'Worldwide' },
	{ code: 'th', name: 'Thai', nativeName: 'ไทย', hreflang: 'th', ogLocale: 'th_TH', dir: 'ltr', region: 'Worldwide' },
	{ code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', hreflang: 'vi', ogLocale: 'vi_VN', dir: 'ltr', region: 'Worldwide' },
	{ code: 'uk', name: 'Ukrainian', nativeName: 'Українська', hreflang: 'uk', ogLocale: 'uk_UA', dir: 'ltr', region: 'Worldwide' },
	{ code: 'cs', name: 'Czech', nativeName: 'Čeština', hreflang: 'cs', ogLocale: 'cs_CZ', dir: 'ltr', region: 'Worldwide' },
	{ code: 'ro', name: 'Romanian', nativeName: 'Română', hreflang: 'ro', ogLocale: 'ro_RO', dir: 'ltr', region: 'Worldwide' },
	{ code: 'sv', name: 'Swedish', nativeName: 'Svenska', hreflang: 'sv', ogLocale: 'sv_SE', dir: 'ltr', region: 'Worldwide' },
];

export const defaultLocale: LocaleCode = 'en';

export const localeCodes = locales.map((l) => l.code);

export const localeMap = Object.fromEntries(locales.map((l) => [l.code, l])) as Record<
	LocaleCode,
	LocaleMeta
>;

export function isLocaleCode(value: string): value is LocaleCode {
	return localeCodes.includes(value as LocaleCode);
}

export function getLocale(code: string): LocaleMeta | undefined {
	return isLocaleCode(code) ? localeMap[code] : undefined;
}

/** UI strings for blog index pages per locale. */
export const blogUi: Record<
	LocaleCode,
	{
		blogTitle: string;
		blogDescription: string;
		blogH1: string;
		blogIntro: string;
		readMore: string;
		published: string;
		updated: string;
		relatedPosts: string;
		allPosts: string;
		home: string;
		language: string;
	}
> = {
	en: {
		blogTitle: 'Marathon Cheats Blog | ESP, Cheats & Meta Tips',
		blogDescription:
			'Marathon cheats and marathon cheats guides — ESP, aimbot, ranked meta, loot routes, and BattlEye updates. Global English blog at marathoncheats.cc/blog/.',
		blogH1: 'Marathon Cheats Intel',
		blogIntro:
			'Actionable Bungie Marathon guides for raid and loot-run — meta breakdowns, loot routes, weapon tiers, and pro warmup routines. Pair these tips with our marathon cheats pages for ESP boxes, soft aim, and cloud DMA when you need in-match tools.',
		readMore: 'Read guide',
		published: 'Published',
		updated: 'Updated',
		relatedPosts: 'Related Bungie Marathon guides',
		allPosts: 'All blog posts',
		home: 'Marathon Cheats home',
		language: 'Language',
	},
	es: {
		blogTitle: 'Blog Marathon Cheats 2026 | Guías en 22 idiomas',
		blogDescription:
			'Blog de Marathon Cheats con guías de trucos indetectables, ESP wallhack, radar y Aimbot para Bungie Marathon en PC Windows.',
		blogH1: 'Blog Marathon Cheats — Guías globales',
		blogIntro:
			'Guías SEO de trucos Bungie Marathon indetectables, ESP wallhack, radar hack, Aimbot y mantenimiento BattlEye anti-cheat en 22 idiomas.',
		readMore: 'Leer guía',
		published: 'Publicado',
		updated: 'Actualizado',
		relatedPosts: 'Guías Bungie Marathon relacionadas',
		allPosts: 'Todos los artículos',
		home: 'Inicio Marathon Cheats',
		language: 'Idioma',
	},
	fr: {
		blogTitle: 'Blog Marathon Cheats 2026 | Guides en 22 langues',
		blogDescription:
			'Blog Marathon Cheats : triches indétectables, ESP wallhack, radar et Aimbot pour Bungie Marathon sur PC Windows.',
		blogH1: 'Blog Marathon Cheats — Guides mondiaux',
		blogIntro:
			'Guides SEO triches Bungie Marathon indétectables, ESP wallhack, radar hack, Aimbot et BattlEye anti-cheat en 22 langues.',
		readMore: 'Lire le guide',
		published: 'Publié',
		updated: 'Mis à jour',
		relatedPosts: 'Guides Bungie Marathon associés',
		allPosts: 'Tous les articles',
		home: 'Accueil Marathon Cheats',
		language: 'Langue',
	},
	de: {
		blogTitle: 'Marathon Cheats Blog 2026 | Guides in 22 Sprachen',
		blogDescription:
			'Marathon Cheats Blog mit undetected ESP, Wallhack, Radar und Aimbot Guides für Bungie Marathon auf Windows PC.',
		blogH1: 'Marathon Cheats Blog — Globale Guides',
		blogIntro:
			'SEO-Guides für undetected Marathon Cheats, ESP Wallhack, Radar Hack, Aimbot und BattlEye anti-cheat in 22 Sprachen.',
		readMore: 'Guide lesen',
		published: 'Veröffentlicht',
		updated: 'Aktualisiert',
		relatedPosts: 'Verwandte Bungie Marathon Guides',
		allPosts: 'Alle Beiträge',
		home: 'Marathon Cheats Start',
		language: 'Sprache',
	},
	pt: {
		blogTitle: 'Blog Marathon Cheats 2026 | Guias em 22 idiomas',
		blogDescription:
			'Blog Marathon Cheats com guias de cheats indetectáveis, ESP wallhack, radar e Aimbot para Bungie Marathon no PC.',
		blogH1: 'Blog Marathon Cheats — Guias globais',
		blogIntro:
			'Guias SEO de cheats Bungie Marathon indetectáveis, ESP wallhack, radar hack, Aimbot e BattlEye anti-cheat em 22 idiomas.',
		readMore: 'Ler guia',
		published: 'Publicado',
		updated: 'Atualizado',
		relatedPosts: 'Guias Bungie Marathon relacionados',
		allPosts: 'Todos os posts',
		home: 'Início Marathon Cheats',
		language: 'Idioma',
	},
	it: {
		blogTitle: 'Blog Marathon Cheats 2026 | Guide in 22 lingue',
		blogDescription:
			'Blog Marathon Cheats con guide cheat indetectable, ESP wallhack, radar e Aimbot per Bungie Marathon su PC Windows.',
		blogH1: 'Blog Marathon Cheats — Guide globali',
		blogIntro:
			'Guide SEO cheat Bungie Marathon indetectable, ESP wallhack, radar hack, Aimbot e BattlEye anti-cheat in 22 lingue.',
		readMore: 'Leggi guida',
		published: 'Pubblicato',
		updated: 'Aggiornato',
		relatedPosts: 'Guide Bungie Marathon correlate',
		allPosts: 'Tutti gli articoli',
		home: 'Home Marathon Cheats',
		language: 'Lingua',
	},
	nl: {
		blogTitle: 'Marathon Cheats Blog 2026 | Gidsen in 22 talen',
		blogDescription:
			'Marathon Cheats blog met undetected ESP, wallhack, radar en Aimbot gidsen voor Bungie Marathon op Windows PC.',
		blogH1: 'Marathon Cheats Blog — Wereldwijde gidsen',
		blogIntro:
			'SEO-gidsen voor undetected Marathon cheats, ESP wallhack, radar hack, Aimbot en BattlEye anti-cheat in 22 talen.',
		readMore: 'Lees gids',
		published: 'Gepubliceerd',
		updated: 'Bijgewerkt',
		relatedPosts: 'Gerelateerde Bungie Marathon gidsen',
		allPosts: 'Alle posts',
		home: 'Marathon Cheats home',
		language: 'Taal',
	},
	pl: {
		blogTitle: 'Blog Marathon Cheats 2026 | Poradniki w 22 językach',
		blogDescription:
			'Blog Marathon Cheats z poradnikami undetected ESP, wallhack, radar i Aimbot dla Bungie Marathon na PC.',
		blogH1: 'Blog Marathon Cheats — Globalne poradniki',
		blogIntro:
			'Poradniki SEO undetected cheatów Bungie Marathon, ESP wallhack, radar hack, Aimbot i BattlEye anti-cheat w 22 językach.',
		readMore: 'Czytaj poradnik',
		published: 'Opublikowano',
		updated: 'Zaktualizowano',
		relatedPosts: 'Powiązane poradniki Bungie Marathon',
		allPosts: 'Wszystkie artykuły',
		home: 'Strona główna Marathon Cheats',
		language: 'Język',
	},
	ru: {
		blogTitle: 'Блог Marathon Cheats 2026 | Гайды на 22 языках',
		blogDescription:
			'Блог Marathon Cheats: undetected ESP, wallhack, radar и Aimbot для Bungie Marathon на Windows PC.',
		blogH1: 'Блог Marathon Cheats — Глобальные гайды',
		blogIntro:
			'SEO-гайды по undetected читам Bungie Marathon, ESP wallhack, radar hack, Aimbot и BattlEye anti-cheat на 22 языках.',
		readMore: 'Читать гайд',
		published: 'Опубликовано',
		updated: 'Обновлено',
		relatedPosts: 'Похожие гайды Bungie Marathon',
		allPosts: 'Все статьи',
		home: 'Главная Marathon Cheats',
		language: 'Язык',
	},
	tr: {
		blogTitle: 'Marathon Cheats Blog 2026 | 22 dilde rehberler',
		blogDescription:
			'Marathon Cheats blog: undetected ESP, wallhack, radar ve Aimbot rehberleri Bungie Marathon Windows PC.',
		blogH1: 'Marathon Cheats Blog — Küresel rehberler',
		blogIntro:
			'Undetected Bungie Marathon hileleri, ESP wallhack, radar hack, Aimbot ve BattlEye anti-cheat SEO rehberleri 22 dilde.',
		readMore: 'Rehberi oku',
		published: 'Yayınlandı',
		updated: 'Güncellendi',
		relatedPosts: 'İlgili Bungie Marathon rehberleri',
		allPosts: 'Tüm yazılar',
		home: 'Marathon Cheats ana sayfa',
		language: 'Dil',
	},
	ar: {
		blogTitle: 'مدونة Marathon Cheats 2026 | أدلة بـ 22 لغة',
		blogDescription:
			'مدونة Marathon Cheats: غش undetected وESP wallhack ورadar وAimbot لـ Bungie Marathon على Windows PC.',
		blogH1: 'مدونة Marathon Cheats — أدلة عالمية',
		blogIntro:
			'أدلة SEO لغش Bungie Marathon undetected وESP wallhack ورadar hack وAimbot وBattlEye anti-cheat بـ 22 لغة.',
		readMore: 'اقرأ الدليل',
		published: 'نُشر',
		updated: 'تم التحديث',
		relatedPosts: 'أدلة Bungie Marathon ذات صلة',
		allPosts: 'جميع المقالات',
		home: 'الرئيسية Marathon Cheats',
		language: 'اللغة',
	},
	ja: {
		blogTitle: 'Marathon Cheats ブログ 2026 | 22言語ガイド',
		blogDescription:
			'Marathon Cheatsブログ：undetected ESP、wallhack、radar、Aimbotガイド。Bungie Marathon Windows PC向け。',
		blogH1: 'Marathon Cheats ブログ — グローバルガイド',
		blogIntro:
			'undetected Bungie Marathonチート、ESP wallhack、radar hack、Aimbot、BattlEye anti-cheatのSEOガイドを22言語で提供。',
		readMore: 'ガイドを読む',
		published: '公開日',
		updated: '更新日',
		relatedPosts: '関連Bungie Marathonガイド',
		allPosts: 'すべての記事',
		home: 'Marathon Cheats ホーム',
		language: '言語',
	},
	ko: {
		blogTitle: 'Marathon Cheats 블로그 2026 | 22개 언어 가이드',
		blogDescription:
			'Marathon Cheats 블로그: undetected ESP, wallhack, radar, Aimbot 가이드. Bungie Marathon Windows PC.',
		blogH1: 'Marathon Cheats 블로그 — 글로벌 가이드',
		blogIntro:
			'undetected Bungie Marathon 치트, ESP wallhack, radar hack, Aimbot, BattlEye anti-cheat SEO 가이드를 22개 언어로 제공.',
		readMore: '가이드 읽기',
		published: '게시일',
		updated: '업데이트',
		relatedPosts: '관련 Bungie Marathon 가이드',
		allPosts: '모든 게시물',
		home: 'Marathon Cheats 홈',
		language: '언어',
	},
	zh: {
		blogTitle: 'Marathon Cheats 博客 2026 | 22种语言指南',
		blogDescription:
			'Marathon Cheats博客：undetected ESP、wallhack、radar和Aimbot指南，适用于Bungie Marathon Windows PC。',
		blogH1: 'Marathon Cheats 博客 — 全球指南',
		blogIntro:
			'undetected Bungie Marathon作弊、ESP wallhack、radar hack、Aimbot和BattlEye anti-cheat的SEO指南，共22种语言。',
		readMore: '阅读指南',
		published: '发布',
		updated: '更新',
		relatedPosts: '相关Bungie Marathon指南',
		allPosts: '所有文章',
		home: 'Marathon Cheats 首页',
		language: '语言',
	},
	hi: {
		blogTitle: 'Marathon Cheats ब्लॉग 2026 | 22 भाषाओं में गाइड',
		blogDescription:
			'Marathon Cheats ब्लॉग: undetected ESP, wallhack, radar और Aimbot गाइड Bungie Marathon Windows PC के लिए।',
		blogH1: 'Marathon Cheats ब्लॉग — वैश्विक गाइड',
		blogIntro:
			'undetected Marathon cheats, ESP wallhack, radar hack, Aimbot और BattlEye anti-cheat SEO गाइड 22 भाषाओं में।',
		readMore: 'गाइड पढ़ें',
		published: 'प्रकाशित',
		updated: 'अपडेट',
		relatedPosts: 'संबंधित Bungie Marathon गाइड',
		allPosts: 'सभी पोस्ट',
		home: 'Marathon Cheats होम',
		language: 'भाषा',
	},
	id: {
		blogTitle: 'Blog Marathon Cheats 2026 | Panduan 22 bahasa',
		blogDescription:
			'Blog Marathon Cheats: panduan undetected ESP, wallhack, radar dan Aimbot untuk Bungie Marathon di PC Windows.',
		blogH1: 'Blog Marathon Cheats — Panduan global',
		blogIntro:
			'Panduan SEO cheat Bungie Marathon undetected, ESP wallhack, radar hack, Aimbot dan BattlEye anti-cheat dalam 22 bahasa.',
		readMore: 'Baca panduan',
		published: 'Dipublikasikan',
		updated: 'Diperbarui',
		relatedPosts: 'Panduan Bungie Marathon terkait',
		allPosts: 'Semua artikel',
		home: 'Beranda Marathon Cheats',
		language: 'Bahasa',
	},
	th: {
		blogTitle: 'บล็อก Marathon Cheats 2026 | คู่มือ 22 ภาษา',
		blogDescription:
			'บล็อก Marathon Cheats: คู่มือ undetected ESP, wallhack, radar และ Aimbot สำหรับ Bungie Marathon บน PC',
		blogH1: 'บล็อก Marathon Cheats — คู่มือทั่วโลก',
		blogIntro:
			'คู่มือ SEO สำหรับ cheat Bungie Marathon undetected, ESP wallhack, radar hack, Aimbot และ BattlEye anti-cheat 22 ภาษา',
		readMore: 'อ่านคู่มือ',
		published: 'เผยแพร่',
		updated: 'อัปเดต',
		relatedPosts: 'คู่มือ Bungie Marathon ที่เกี่ยวข้อง',
		allPosts: 'บทความทั้งหมด',
		home: 'หน้าแรก Marathon Cheats',
		language: 'ภาษา',
	},
	vi: {
		blogTitle: 'Blog Marathon Cheats 2026 | Hướng dẫn 22 ngôn ngữ',
		blogDescription:
			'Blog Marathon Cheats: hướng dẫn undetected ESP, wallhack, radar và Aimbot cho Bungie Marathon trên PC.',
		blogH1: 'Blog Marathon Cheats — Hướng dẫn toàn cầu',
		blogIntro:
			'Hướng dẫn SEO cheat Bungie Marathon undetected, ESP wallhack, radar hack, Aimbot và BattlEye anti-cheat bằng 22 ngôn ngữ.',
		readMore: 'Đọc hướng dẫn',
		published: 'Xuất bản',
		updated: 'Cập nhật',
		relatedPosts: 'Hướng dẫn Bungie Marathon liên quan',
		allPosts: 'Tất cả bài viết',
		home: 'Trang chủ Marathon Cheats',
		language: 'Ngôn ngữ',
	},
	uk: {
		blogTitle: 'Блог Marathon Cheats 2026 | Гайди 22 мовами',
		blogDescription:
			'Блог Marathon Cheats: undetected ESP, wallhack, radar та Aimbot для Bungie Marathon на Windows PC.',
		blogH1: 'Блог Marathon Cheats — Глобальні гайди',
		blogIntro:
			'SEO-гайди з undetected читів Bungie Marathon, ESP wallhack, radar hack, Aimbot та BattlEye anti-cheat 22 мовами.',
		readMore: 'Читати гайд',
		published: 'Опубліковано',
		updated: 'Оновлено',
		relatedPosts: "Пов'язані гайди Bungie Marathon",
		allPosts: 'Усі статті',
		home: 'Головна Marathon Cheats',
		language: 'Мова',
	},
	cs: {
		blogTitle: 'Blog Marathon Cheats 2026 | Průvodce ve 22 jazycích',
		blogDescription:
			'Blog Marathon Cheats: undetected ESP, wallhack, radar a Aimbot pro Bungie Marathon na Windows PC.',
		blogH1: 'Blog Marathon Cheats — Globální průvodce',
		blogIntro:
			'SEO průvodce undetected Marathon cheaty, ESP wallhack, radar hack, Aimbot a BattlEye anti-cheat ve 22 jazycích.',
		readMore: 'Číst průvodce',
		published: 'Publikováno',
		updated: 'Aktualizováno',
		relatedPosts: 'Související Bungie Marathon průvodce',
		allPosts: 'Všechny články',
		home: 'Domů Marathon Cheats',
		language: 'Jazyk',
	},
	ro: {
		blogTitle: 'Blog Marathon Cheats 2026 | Ghiduri în 22 de limbi',
		blogDescription:
			'Blog Marathon Cheats: ghiduri undetected ESP, wallhack, radar și Aimbot pentru Bungie Marathon pe PC.',
		blogH1: 'Blog Marathon Cheats — Ghiduri globale',
		blogIntro:
			'Ghiduri SEO cheat-uri Bungie Marathon undetected, ESP wallhack, radar hack, Aimbot și BattlEye anti-cheat în 22 de limbi.',
		readMore: 'Citește ghidul',
		published: 'Publicat',
		updated: 'Actualizat',
		relatedPosts: 'Ghiduri Bungie Marathon related',
		allPosts: 'Toate articolele',
		home: 'Acasă Marathon Cheats',
		language: 'Limbă',
	},
	sv: {
		blogTitle: 'Marathon Cheats Blogg 2026 | Guider på 22 språk',
		blogDescription:
			'Marathon Cheats blogg med undetected ESP, wallhack, radar och Aimbot guider för Bungie Marathon på PC.',
		blogH1: 'Marathon Cheats Blogg — Globala guider',
		blogIntro:
			'SEO-guider för undetected Marathon cheats, ESP wallhack, radar hack, Aimbot och BattlEye anti-cheat på 22 språk.',
		readMore: 'Läs guide',
		published: 'Publicerad',
		updated: 'Uppdaterad',
		relatedPosts: 'Relaterade Bungie Marathon guider',
		allPosts: 'Alla inlägg',
		home: 'Marathon Cheats hem',
		language: 'Språk',
	},
};
