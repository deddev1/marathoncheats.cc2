export const SITE_URL = 'https://marathoncheats.cc';
export const SITE_NAME = 'Marathon Cheats';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/marathon-cheats-social-preview.png`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT = 'Bungie Marathon extraction shooter gameplay on Tau Ceti IV';
export { DISCORD_INVITE_URL as DISCORD_URL } from '../content/discord';

/**
 * Locale UI copy lives in i18n.tsx; HOME_SEO supplies per-language meta titles/descriptions.
 * All locales share one URL — hreflang alternates are not emitted until dedicated locale URLs exist.
 */

export const LANGUAGE_CODES = [
  'en', 'de', 'fr', 'es', 'pt', 'ru', 'zh', 'ja', 'ko', 'tr', 'pl', 'nl', 'it', 'ar', 'th', 'vi',
] as const;

export type LanguageCode = (typeof LANGUAGE_CODES)[number];

export const HOME_SEO: Record<LanguageCode, { title: string; description: string }> = {
  en: {
    title: 'Marathon Cheats | Aimbot, ESP, Wallhack & PC Pricing',
    description:
      "Marathon Cheats for Bungie's extraction shooter on Steam. Compare external ESP, aimbot, loot ESP, radar, pricing, compatibility, reviews, and setup guides.",
  },
  de: {
    title: 'Marathon Cheats DE | Aimbot, ESP & Preise auf Windows',
    description:
      'Marathon Cheats mit ESP, Aimbot und Wallhack für Steam auf Windows. Funktionen, Preise, Kompatibilität, Bewertungen, FAQ und Patch-Updates im Vergleich.',
  },
  fr: {
    title: 'Marathon Cheats FR | Aimbot, ESP et tarifs Windows',
    description:
      "Découvrez Marathon Cheats : ESP, aimbot et wallhack pour Steam sur Windows. Comparez fonctionnalités, tarifs, compatibilité, avis, FAQ et mises à jour.",
  },
  es: {
    title: 'Marathon Cheats ES | Aimbot, ESP y precios en Steam',
    description:
      'Explora Marathon Cheats con ESP, aimbot y wallhack en Steam para Windows. Compara funciones, precios, compatibilidad, reseñas, FAQ y actualizaciones.',
  },
  pt: {
    title: 'Marathon Cheats PT | Aimbot, ESP e preços no Steam',
    description:
      'Explore Marathon Cheats com ESP, aimbot e wallhack no Steam para Windows. Compare recursos, preços, compatibilidade, avaliações, FAQ e atualizações.',
  },
  ru: {
    title: 'Marathon Cheats Russia | Аимбот, ESP, цены Steam Windows',
    description:
      'Marathon Cheats с ESP, аимботом и wallhack для Steam на Windows. Сравните функции, цены, совместимость, отзывы, FAQ, гайды и обновления после патчей.',
  },
  zh: {
    title: 'Marathon Cheats Official CN | 中文自瞄透视外挂 Steam 价格对比版',
    description:
      '了解 Marathon Cheats 的 ESP 透视、自瞄与穿墙功能，对比 Bungie Marathon 在 Windows 版 Steam 上的功能、价格、兼容性、用户评价、常见问题、安装指南、补丁更新、购买方案、Discord 支持、退款政策、安全保障、售后支持与购买详情说明指南。',
  },
  ja: {
    title: 'Marathon Cheats Official | 日本語 ESP エイムボット Steam 料金',
    description:
      'Bungie Marathon 向け Marathon Cheats の ESP、エイムボット、ウォールハックを確認。Windows 版 Steam の機能、料金、互換性、レビュー、FAQ、セットアップ手順、パッチ更新情報、購入プラン、Discord サポート、返金情報、購入詳細を比較できます。',
  },
  ko: {
    title: 'Marathon Cheats Official | 한국어 ESP 에임봇 Steam 가격 비교',
    description:
      'Bungie Marathon용 Marathon Cheats의 ESP, 에임봇, 월핵 기능을 확인하세요. Windows Steam 버전의 기능, 가격, 호환성, 리뷰, FAQ, 설치 가이드, 패치 업데이트, 구매 옵션, Discord 지원 정보를 비교할 수 있습니다.',
  },
  tr: {
    title: 'Marathon Cheats TR | Aimbot, ESP ve Steam fiyatları',
    description:
      'Marathon Cheats ile ESP, aimbot ve wallhack inceleyin. Windows Steam ozellikleri, fiyatlari, uyumluluk, yorumlar, SSS ve yama guncellemelerini karsilastirin.',
  },
  pl: {
    title: 'Marathon Cheats PL | Aimbot, ESP i ceny Steam Windows',
    description:
      'Poznaj Marathon Cheats: ESP, aimbot i wallhack na Steam dla Windows. Porównaj funkcje, ceny, zgodność, opinie, FAQ, poradniki i aktualizacje po patchach.',
  },
  nl: {
    title: 'Marathon Cheats NL | Aimbot, ESP en Steam Windows prijzen',
    description:
      'Bekijk Marathon Cheats met ESP, aimbot en wallhack voor Steam op Windows. Vergelijk functies, prijzen, compatibiliteit, reviews, FAQ en patch-updates.',
  },
  it: {
    title: 'Marathon Cheats IT | Aimbot, ESP e prezzi su Steam',
    description:
      'Scopri Marathon Cheats con ESP, aimbot e wallhack per Steam su Windows. Confronta funzioni, prezzi, compatibilità, recensioni, FAQ e aggiornamenti patch.',
  },
  ar: {
    title: 'Marathon Cheats AR | ايمبوت وESP وأسعار Steam Windows',
    description:
      'استكشف Marathon Cheats مع ESP وAimbot وwallhack لإصدار Steam على Windows. قارن الميزات والأسعار والتوافق والمراجعات والأسئلة الشائعة وتحديثات التصحيح.',
  },
  th: {
    title: 'Marathon Cheats TH | เอมบอท ESP และราคา Steam Windows',
    description:
      'สำรวจ Marathon Cheats พร้อม ESP, Aimbot และ Wallhack สำหรับ Steam บน Windows เปรียบเทียบฟีเจอร์ ราคา ความเข้ากันได้ รีวิว คำถามที่พบบ่อย และอัปเดตแพตช์',
  },
  vi: {
    title: 'Marathon Cheats VN | Aimbot, ESP và giá Steam Windows',
    description:
      'Khám phá Marathon Cheats với ESP, aimbot và wallhack cho Steam trên Windows. So sánh tính năng, giá, tương thích, đánh giá, FAQ, hướng dẫn và bản vá.',
  },
};

export const ROUTE_SEO = {
  store: {
    title: 'Marathon Cheats from $40/mo | ESP, Aimbot & Wallhack',
    description:
      'Buy Marathon Cheats from $40/mo on Steam Windows. External ESP, aimbot, wallhack, loot ESP, loader download, Discord support, and post-patch loader updates.',
    path: '/marathoncheats-buy',
  },
  blog: {
    title: 'Marathon Cheat Guides: ESP, Aimbot, HWID & Setup Tips',
    description:
      'Learn how Marathon cheats work: ESP and aimbot setup, system requirements, BattlEye anti-cheat risks, performance impact, and post-patch loader status for PC.',
    path: '/blog',
  },
  terms: {
    title: 'Marathon Cheats Terms of Service | Subscription Rules',
    description:
      'Read marathoncheats.cc terms of service for Marathon cheat subscriptions, eligibility rules, liability limits, account policies, and how to contact support.',
    path: '/terms',
  },
  privacy: {
    title: 'Marathon Cheats Privacy Policy | Data & Analytics Use',
    description:
      'Read marathoncheats.cc privacy policy for what data we collect, how analytics and checkout partners are used, cookie practices, and how to contact us.',
    path: '/privacy',
  },
  refund: {
    title: 'Marathon Cheats Refund Policy | Subscriptions & Support',
    description:
      'Read Marathon Cheats refund policy for subscriptions sold through marathoncheats.cc, including eligibility windows, chargeback rules, and support contact steps.',
    path: '/refund',
  },
  notFound: {
    title: 'Page Not Found on Marathon Cheats | 404 Error & Help',
    description:
      'Sorry, this Marathon Cheats page could not be found. Return to the homepage or read ESP, aimbot, and HWID spoofer guides in our Marathon cheat blog.',
    path: '/404',
  },
} as const;

export const BLOG_POST_SEO: Record<string, { title: string; description: string }> = {
  'marathoncheats-esp': {
    title: 'Marathon ESP Guide: Wallhack & Loot | Marathon Cheats',
    description:
      'Marathon ESP guide: player wallhack boxes, skeleton lines, loot highlights, distance reads, and range sliders for external overlays on Steam Windows.',
  },
  'marathoncheats-aimbot': {
    title: 'Marathon Aimbot Setup: FOV & Smoothing | Marathon Cheats',
    description:
      'Marathon aimbot setup guide: bone selector, FOV circle, smoothing, visibility check, no-recoil control, and natural tuning for extraction shooter raids.',
  },
  'marathoncheats-hwid': {
    title: 'Marathon HWID Spoofer Guide: BattlEye Bans | Marathon Cheats',
    description:
      'Marathon anti-cheat and HWID guide: how BattlEye hardware bans work, when a spoofer helps, and how to protect your PC after a Marathon cheat ban.',
  },
  'marathon-extraction-tips-with-esp': {
    title: 'Marathon Extraction Tips: 8 ESP Raid Plays | Marathon Cheats',
    description:
      'Marathon extraction tips for Bungie\'s extraction shooter: ESP awareness, player alerts, loot routing, fight decisions, and radar timing with wallhack overlays.',
  },
};

/** Maps blog H1 headlines to slugs for metadata title lookup. */
const BLOG_HEADLINE_TO_SLUG: Record<string, keyof typeof BLOG_POST_SEO> = {
  'Marathon ESP: See Every Enemy Through Walls': 'marathoncheats-esp',
  'Marathon Aimbot: Bone Selector, FOV & Smoothing Guide': 'marathoncheats-aimbot',
  'Marathon HWID Spoofer: Evade Hardware Bans Explained': 'marathoncheats-hwid',
  'Marathon Extraction Tips: 8 ESP Strategies for Safer Extracts': 'marathon-extraction-tips-with-esp',
};

const BLOG_TITLE_SUFFIX = ' | Marathon Cheats';
const BLOG_TITLE_MAX = 60;

export function buildBlogPostTitle(postTitle: string) {
  const slug = BLOG_HEADLINE_TO_SLUG[postTitle];
  if (slug && BLOG_POST_SEO[slug]?.title) {
    return BLOG_POST_SEO[slug].title;
  }

  const maxBaseLength = BLOG_TITLE_MAX - BLOG_TITLE_SUFFIX.length;
  if (postTitle.length <= maxBaseLength) {
    return `${postTitle}${BLOG_TITLE_SUFFIX}`;
  }

  return `${postTitle.slice(0, maxBaseLength - 1).trimEnd()}…${BLOG_TITLE_SUFFIX}`;
}

export function toOgLocale(lang: string) {
  if (lang === 'en') return 'en_US';
  if (lang === 'zh') return 'zh_CN';
  if (lang === 'pt') return 'pt_BR';
  if (lang === 'ar') return 'ar_SA';
  return `${lang}_${lang.toUpperCase()}`;
}

export function buildCanonicalUrl(path: string) {
  const normalizedPath = path === '/' ? '' : path.replace(/\/$/, '');
  return new URL(normalizedPath || '/', SITE_URL).toString();
}
