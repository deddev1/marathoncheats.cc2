import { ROUTE_SEO } from './config';

export type PageHeading = {
  h1: string;
  intro: string;
};

/** Shared H1 + intro copy so headings match visible page text and prerender HTML. */
export const HOME_PAGE_HEADING: PageHeading = {
  h1: 'Marathon Cheats — Aimbot, ESP & Wallhack',
  intro:
    "Marathon Cheats delivers aimbot, ESP, and wallhack for Bungie's Marathon extraction shooter on Steam. Compare external player ESP, loot ESP, radar, pricing, compatibility, reviews, and setup guides.",
};

export const STORE_PAGE_HEADING: PageHeading = {
  h1: 'Marathon Cheat pricing & features',
  intro:
    "Compare Marathon cheat pricing and features, download the external loader, and follow the setup guide for Bungie's extraction shooter on Steam.",
};

export const BLOG_LIST_HEADING: PageHeading = {
  h1: 'Marathon Cheat Guides',
  intro:
    'Marathon cheat guides for ESP, aimbot setup, anti-cheat compatibility, system requirements, HWID protection, and external cheat performance on PC.',
};

export const LEGAL_PAGE_HEADINGS: Record<'terms' | 'privacy' | 'refund', PageHeading> = {
  terms: {
    h1: 'Terms of Service',
    intro:
      'These Terms of Service govern Marathon Cheats subscriptions, eligibility, liability, and support for external Marathon cheat software sold through marathoncheats.cc.',
  },
  privacy: {
    h1: 'Privacy Policy',
    intro:
      'This Privacy Policy explains what data Marathon Cheats collects on marathoncheats.cc, how analytics and checkout partners are used, and how to contact us.',
  },
  refund: {
    h1: 'Refund Policy',
    intro:
      'This Refund Policy covers Marathon Cheats subscription refunds sold through marathoncheats.cc, including eligibility windows and how to contact support.',
  },
};

export const NOT_FOUND_HEADING: PageHeading = {
  h1: 'Page Not Found',
  intro:
    'The Marathon Cheats page you are looking for does not exist. Return to the homepage, compare cheat pricing and features, or read ESP, aimbot, and HWID guides.',
};

export function getLegalHeading(path: string): PageHeading | undefined {
  if (path === ROUTE_SEO.terms.path) return LEGAL_PAGE_HEADINGS.terms;
  if (path === ROUTE_SEO.privacy.path) return LEGAL_PAGE_HEADINGS.privacy;
  if (path === ROUTE_SEO.refund.path) return LEGAL_PAGE_HEADINGS.refund;
  return undefined;
}

/** Returns H1 keywords missing from the supplied body text (for SEO validation). */
export function getMissingH1Words(h1: string, bodyText: string): string[] {
  const normalizedBody = bodyText.toLowerCase().replace(/[^a-z0-9\s&]/g, ' ');
  const stopWords = new Set(['and', 'the', 'for', 'with', 'your', 'our', 'see', 'how']);

  return h1
    .toLowerCase()
    .replace(/[^a-z0-9\s&]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0)
    .filter(word => !stopWords.has(word))
    .filter(word => {
      if (word === '&') return false;
      if (word.length <= 2 && word !== 'esp') return false;
      return !normalizedBody.includes(word);
    });
}
