import { SITE_URL } from '../seo/config';

/** Bump when public image bytes change so browsers bypass stale filename caches. */
export const IMAGE_ASSET_VERSION = '2';

export function versionImageUrl(path: string) {
  if (!path || path.startsWith('data:') || path.startsWith('http')) {
    return path;
  }

  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}v=${IMAGE_ASSET_VERSION}`;
}

export type ImageSeoEntry = {
  /** Stable id for lookups from feature keys */
  id: string;
  /** Public path, e.g. `/blog-loot-esp.webp` */
  path: string;
  alt: string;
  title: string;
  caption: string;
  keywords: readonly string[];
  /** Canonical page where the image is primarily shown */
  pagePath: string;
  sourceFiles: readonly string[];
};

export const IMAGE_SEO_REGISTRY: readonly ImageSeoEntry[] = [
  {
    id: 'esp',
    path: '/blog-marathon-world.webp',
    alt: 'Bungie Marathon extraction shooter gameplay screenshot on Tau Ceti IV with Runners in combat',
    title: 'Bungie Marathon Gameplay Screenshot — Tau Ceti IV Extraction Shooter',
    caption: 'Official Bungie Marathon gameplay from IGN press screenshots showing PvPvE extraction combat on PC.',
    keywords: ['marathon esp', 'marathon cheats esp', 'marathon wallhack', 'player esp', 'loot esp', 'marathon overlay'],
    pagePath: '/',
    sourceFiles: ['public/blog-marathon-world.webp', 'src/components/FeatureExplorerSection.tsx'],
  },
  {
    id: 'aimbot',
    path: '/blog-recoil-control.webp',
    alt: 'Bungie Marathon first-person combat screenshot with weapons and Runner abilities',
    title: 'Bungie Marathon Combat Screenshot — Weapons & Runners',
    caption: 'Official Bungie Marathon Server Slam press screenshot showing first-person raid combat on Steam.',
    keywords: ['marathon aimbot', 'marathon cheats aimbot', 'recoil control', 'fov aimbot', 'marathon aim assist'],
    pagePath: '/',
    sourceFiles: ['public/blog-recoil-control.webp', 'src/components/FeaturesGrid.tsx'],
  },
  {
    id: 'loot',
    path: '/blog-loot-esp.webp',
    alt: 'Bungie Marathon loot and extraction gameplay screenshot in a raid environment',
    title: 'Bungie Marathon Loot & Extraction Gameplay Screenshot',
    caption: 'Official Bungie Marathon press image highlighting looting and extraction gameplay on Tau Ceti IV.',
    keywords: ['marathon loot esp', 'marathon item esp', 'loot highlights', 'marathon cheats loot', 'extraction loot esp'],
    pagePath: '/',
    sourceFiles: ['public/blog-loot-esp.webp', 'src/components/SafetySection.tsx'],
  },
  {
    id: 'external',
    path: '/blog-external-cheat.webp',
    alt: 'Bungie Marathon Runner navigating a sci-fi facility on Tau Ceti IV',
    title: 'Bungie Marathon Runner Gameplay Screenshot',
    caption: 'Official Bungie Marathon press screenshot of a Runner moving through a raid zone on PC.',
    keywords: ['marathon external cheat', 'marathon loader', 'external esp', 'marathon cheats download', 'windows cheat'],
    pagePath: '/',
    sourceFiles: ['public/blog-external-cheat.webp'],
  },
  {
    id: 'guide',
    path: '/blog-marathon-guide.webp',
    alt: 'Bungie Marathon raid environment screenshot with industrial sci-fi architecture',
    title: 'Bungie Marathon Raid Environment Screenshot',
    caption: 'Official Bungie Marathon press image of a raid map environment used for extraction missions.',
    keywords: ['marathon cheat guide', 'marathon setup', 'marathon esp guide', 'marathon cheats tutorial'],
    pagePath: '/',
    sourceFiles: ['public/blog-marathon-guide.webp'],
  },
  {
    id: 'showcase',
    path: '/marathon-safety-characters-purple.webp',
    alt: 'Bungie Marathon Runner characters in cinematic key art with purple lighting',
    title: 'Bungie Marathon Runner Character Key Art',
    caption: 'Official Bungie Marathon cinematic still featuring Runner operatives from IGN press materials.',
    keywords: ['marathon cheats', 'marathon characters', 'marathon pc cheat', 'marathon extraction shooter'],
    pagePath: '/',
    sourceFiles: ['public/marathon-safety-characters-purple.webp', 'src/components/FeaturesGrid.tsx'],
  },
  {
    id: 'cloud-dma',
    path: '/marathon-safety-characters.webp',
    alt: 'Bungie Marathon Runners in cinematic combat still from official press kit',
    title: 'Bungie Marathon Runners Cinematic Screenshot',
    caption: 'Official Bungie Marathon cinematic still showing Runners in a firefight on Tau Ceti IV.',
    keywords: ['marathon cloud dma', 'marathon dma cheat', 'hardware spoofer', 'marathon cheats dma'],
    pagePath: '/',
    sourceFiles: ['public/marathon-safety-characters.webp', 'src/components/FeatureExplorerSection.tsx'],
  },
  {
    id: 'patch-updates',
    path: '/blog-patch-updates.webp',
    alt: 'Bungie Marathon Season 2 Nightfall gameplay screenshot with updated raid visuals',
    title: 'Bungie Marathon Season 2 Gameplay Screenshot',
    caption: 'Official Bungie Marathon Server Slam press screenshot from the Season 2 update on PC.',
    keywords: ['marathon patch update', 'marathon loader update', 'battleye update', 'marathon cheats patch'],
    pagePath: '/marathoncheats-buy',
    sourceFiles: ['public/blog-patch-updates.webp', 'src/components/FeatureShowcaseGallery.tsx'],
  },
  {
    id: 'hwid-spoofer',
    path: '/blog-hwid-spoofer.webp',
    alt: 'Bungie Marathon HWID and account safety themed cinematic screenshot from press kit',
    title: 'Bungie Marathon Account Safety Press Screenshot',
    caption: 'Official Bungie Marathon cinematic still used for HWID ban and account safety guides.',
    keywords: ['marathon hwid spoofer', 'marathon hardware ban', 'battleye hwid', 'marathon spoofer guide'],
    pagePath: '/blog/marathoncheats-hwid',
    sourceFiles: ['public/blog-hwid-spoofer.webp', 'src/pages/Blog.tsx'],
  },
  {
    id: 'hero-video-thumb',
    path: '/images/marathon-hero-demo-thumbnail.webp',
    alt: 'Bungie Marathon hero gameplay cinematic still from official IGN press screenshots',
    title: 'Bungie Marathon Hero Gameplay Thumbnail',
    caption: 'Official Bungie Marathon cinematic still used as the hero demo video thumbnail.',
    keywords: ['marathon gameplay demo', 'marathon cheats video', 'marathon esp demo', 'marathon hero demo'],
    pagePath: '/',
    sourceFiles: ['public/images/marathon-hero-demo-thumbnail.webp', 'src/content/videos.ts'],
  },
  {
    id: 'feature-video-thumb',
    path: '/images/marathon-feature-demo-thumbnail.webp',
    alt: 'Bungie Marathon feature showcase cinematic still with Runners and weapons',
    title: 'Bungie Marathon Feature Showcase Thumbnail',
    caption: 'Official Bungie Marathon press still used as the store feature demo video thumbnail.',
    keywords: ['marathon feature demo', 'marathon aimbot demo', 'marathon esp demo', 'marathon cheats preview'],
    pagePath: '/marathoncheats-buy',
    sourceFiles: ['public/images/marathon-feature-demo-thumbnail.webp', 'src/content/videos.ts'],
  },
  {
    id: 'social-preview',
    path: '/marathon-cheats-social-preview.png',
    alt: 'Bungie Marathon extraction shooter social preview with Tau Ceti IV gameplay',
    title: 'Bungie Marathon Official Social Preview Image',
    caption: 'Open Graph preview using official Bungie Marathon gameplay from IGN press screenshots.',
    keywords: ['marathon cheats', 'marathon esp', 'marathon aimbot', 'marathon pricing', 'marathon wallhack'],
    pagePath: '/',
    sourceFiles: ['public/marathon-cheats-social-preview.png', 'index.html'],
  },
  {
    id: 'org-logo',
    path: '/og-google-preview.png',
    alt: 'Marathon Cheats logo for Google Search and organization branding',
    title: 'Marathon Cheats Logo',
    caption: 'Official Marathon Cheats brand logo used in search results and structured data.',
    keywords: ['marathon cheats logo', 'marathon cheats brand', 'marathoncheats.cc'],
    pagePath: '/',
    sourceFiles: ['public/og-google-preview.png', 'index.html'],
  },
  {
    id: 'site-logo',
    path: '/rt-removebg-preview.png',
    alt: 'Marathon Cheats site logo in navigation and footer',
    title: 'Marathon Cheats Navigation Logo',
    caption: 'Marathon Cheats wordmark logo displayed in the site header and footer.',
    keywords: ['marathon cheats logo', 'marathoncheats', 'marathon cheat site'],
    pagePath: '/',
    sourceFiles: ['public/rt-removebg-preview.png', 'src/components/SiteLogo.tsx'],
  },
  {
    id: 'blog-esp-guide',
    path: '/blog-esp-guide.webp',
    alt: 'Bungie Marathon ESP guide cover with official gameplay screenshot from press kit',
    title: 'Bungie Marathon ESP Guide Cover Image',
    caption: 'Cover art for Marathon ESP guides using official Bungie Marathon press screenshots.',
    keywords: ['marathon esp guide', 'marathon wallhack guide', 'marathon cheats esp tutorial'],
    pagePath: '/blog/marathoncheats-esp',
    sourceFiles: ['public/blog-esp-guide.webp'],
  },
  {
    id: 'blog-aimbot-guide',
    path: '/blog-aimbot-guide.webp',
    alt: 'Bungie Marathon aimbot guide cover with official combat gameplay screenshot',
    title: 'Bungie Marathon Aimbot Guide Cover Image',
    caption: 'Cover art for Marathon aimbot guides using official Bungie Marathon press imagery.',
    keywords: ['marathon aimbot guide', 'marathon aimbot tutorial', 'marathon cheats aimbot setup'],
    pagePath: '/blog/marathoncheats-aimbot',
    sourceFiles: ['public/blog-aimbot-guide.webp'],
  },
  {
    id: 'blog-bungie-anticheat',
    path: '/blog-bungie-anticheat.webp',
    alt: 'Bungie Marathon anti-cheat and BattlEye themed official press screenshot',
    title: 'Bungie Marathon BattlEye Anti-Cheat Press Image',
    caption: 'Official Bungie Marathon press screenshot for BattlEye and anti-cheat compatibility guides.',
    keywords: ['marathon battleye', 'bungie anticheat', 'marathon cheat compatibility', 'steam marathon cheat'],
    pagePath: '/blog/marathoncheats-hwid',
    sourceFiles: ['public/blog-bungie-anticheat.webp'],
  },
  {
    id: 'blog-marathon-cheats-comparison',
    path: '/blog-marathon-cheats-comparison.webp',
    alt: 'Bungie Marathon cheat provider comparison cover with official gameplay screenshot',
    title: 'Bungie Marathon Cheat Provider Comparison Cover',
    caption: 'Comparison guide cover using official Bungie Marathon press screenshots from IGN.',
    keywords: ['marathon cheats comparison', 'marathon cheat providers', 'marathon esp comparison'],
    pagePath: '/',
    sourceFiles: ['public/blog-marathon-cheats-comparison.webp'],
  },
  {
    id: 'blog-makima-comparison',
    path: '/blog-makima-comparison.webp',
    alt: 'Bungie Marathon Makima comparison cover with official Runner cinematic still',
    title: 'Bungie Marathon vs Makima Comparison Cover',
    caption: 'Provider comparison cover image using official Bungie Marathon press materials.',
    keywords: ['makima marathon cheat', 'marathon cheats comparison', 'makima vs marathoncheats'],
    pagePath: '/',
    sourceFiles: ['public/blog-makima-comparison.webp'],
  },
  {
    id: 'blog-novaxware-comparison',
    path: '/blog-novaxware-comparison.webp',
    alt: 'Bungie Marathon Novaxware comparison cover with official raid screenshot',
    title: 'Bungie Marathon vs Novaxware Comparison Cover',
    caption: 'Provider comparison cover using official Bungie Marathon Server Slam press imagery.',
    keywords: ['novaxware marathon', 'marathon cheats comparison', 'novaxware vs marathoncheats'],
    pagePath: '/',
    sourceFiles: ['public/blog-novaxware-comparison.webp'],
  },
  {
    id: 'blog-sternclient-comparison',
    path: '/blog-sternclient-comparison.webp',
    alt: 'Bungie Marathon SternClient comparison cover with official combat screenshot',
    title: 'Bungie Marathon vs SternClient Comparison Cover',
    caption: 'Provider comparison cover using official Bungie Marathon cinematic press stills.',
    keywords: ['sternclient marathon', 'marathon cheats comparison', 'sternclient vs marathoncheats'],
    pagePath: '/',
    sourceFiles: ['public/blog-sternclient-comparison.webp'],
  },
  {
    id: 'blog-zadeyo-comparison',
    path: '/blog-zadeyo-comparison.webp',
    alt: 'Bungie Marathon Zadeyo checkout guide cover with official gameplay screenshot',
    title: 'Bungie Marathon Zadeyo Checkout Guide Cover',
    caption: 'Checkout guide cover using official Bungie Marathon press screenshots from IGN.',
    keywords: ['zadeyo marathon cheats', 'marathon cheats buy', 'zadeyo checkout marathon'],
    pagePath: '/marathoncheats-buy',
    sourceFiles: ['public/blog-zadeyo-comparison.webp'],
  },
  {
    id: 'blog-sony-bans',
    path: '/blog-sony-bans.webp',
    alt: 'Bungie Marathon ban wave and account safety guide cover with cinematic still',
    title: 'Bungie Marathon Ban Wave & Safety Guide Cover',
    caption: 'Account safety guide cover using official Bungie Marathon cinematic press imagery.',
    keywords: ['marathon ban wave', 'marathon hwid ban', 'marathon account ban', 'marathon cheat safety'],
    pagePath: '/blog/marathoncheats-hwid',
    sourceFiles: ['public/blog-sony-bans.webp'],
  },
  {
    id: 'hero-screenshot',
    path: '/image-44fb6aa2-4123-47aa-ba38-e2a9f0bdaee6.png',
    alt: 'Bungie Marathon full gameplay screenshot on Tau Ceti IV from official press kit',
    title: 'Bungie Marathon Full Gameplay Screenshot',
    caption: 'Full-resolution official Bungie Marathon gameplay screenshot from IGN press materials.',
    keywords: ['marathon cheats screenshot', 'marathon esp screenshot', 'marathon gameplay cheat'],
    pagePath: '/',
    sourceFiles: ['public/image-44fb6aa2-4123-47aa-ba38-e2a9f0bdaee6.png'],
  },
] as const;

const imageByPath = new Map(IMAGE_SEO_REGISTRY.map(entry => [entry.path, entry]));
const imageById = new Map(IMAGE_SEO_REGISTRY.map(entry => [entry.id, entry]));

export function getImageSeoByPath(path: string): ImageSeoEntry | undefined {
  return imageByPath.get(path);
}

export function getImageSeoById(id: string): ImageSeoEntry | undefined {
  return imageById.get(id);
}

export function getImageSeoOrFallback(path: string, fallbackAlt: string): Pick<ImageSeoEntry, 'alt' | 'title' | 'caption' | 'keywords'> {
  const entry = getImageSeoByPath(path);
  if (entry) {
    return {
      alt: entry.alt,
      title: entry.title,
      caption: entry.caption,
      keywords: entry.keywords,
    };
  }

  return {
    alt: fallbackAlt,
    title: fallbackAlt,
    caption: fallbackAlt,
    keywords: [],
  };
}

export function getImageAbsoluteUrl(path: string) {
  return `${SITE_URL}${path}`;
}

export function groupImagesByPage() {
  const groups = new Map<string, ImageSeoEntry[]>();

  IMAGE_SEO_REGISTRY.forEach(entry => {
    const list = groups.get(entry.pagePath) ?? [];
    list.push(entry);
    groups.set(entry.pagePath, list);
  });

  return groups;
}
