import type { SeoLocaleCode } from '../locales';

export type PageHeading = {
  h1: string;
  intro: string;
};

export const HOME_PAGE_HEADINGS: Record<SeoLocaleCode, PageHeading> = {
  en: {
    h1: 'Marathon Cheats — Aimbot, ESP & Wallhack',
    intro:
      "Marathon Cheats delivers aimbot, ESP, and wallhack for Bungie's Marathon extraction shooter on Steam. Compare external player ESP, loot ESP, radar, pricing, compatibility, reviews, and setup guides.",
  },
  de: {
    h1: 'Marathon Cheats — Aimbot, ESP & Wallhack',
    intro:
      'Marathon Cheats bietet Aimbot, ESP und Wallhack für Bungies Marathon Extraction-Shooter auf Steam. Vergleichen Sie ESP, Loot-Radar, Preise, Kompatibilität und Setup-Guides.',
  },
  fr: {
    h1: 'Marathon Cheats — Aimbot, ESP et wallhack',
    intro:
      "Marathon Cheats propose aimbot, ESP et wallhack pour le shooter d'extraction Marathon de Bungie sur Steam. Comparez ESP, radar de butin, tarifs et guides.",
  },
  es: {
    h1: 'Marathon Cheats — Aimbot, ESP y wallhack',
    intro:
      'Marathon Cheats ofrece aimbot, ESP y wallhack para el shooter de extracción Marathon de Bungie en Steam. Compara ESP, radar de botín, precios y guías.',
  },
  pt: {
    h1: 'Marathon Cheats — Aimbot, ESP e wallhack',
    intro:
      'Marathon Cheats oferece aimbot, ESP e wallhack para o shooter de extração Marathon da Bungie no Steam. Compare ESP, radar de loot, preços e guias.',
  },
  ja: {
    h1: 'Marathon Cheats — エイムボット、ESP、ウォールハック',
    intro:
      'Marathon CheatsはBungieのMarathon向けエイムボット、ESP、ウォールハックを提供。Steam版の機能、料金、互換性、レビュー、セットアップガイドを比較できます。',
  },
  ko: {
    h1: 'Marathon Cheats — 에임봇, ESP, 월핵',
    intro:
      'Marathon Cheats는 Bungie Marathon용 에임봇, ESP, 월핵을 제공합니다. Steam 버전의 기능, 가격, 호환성, 리뷰, 설치 가이드를 비교하세요.',
  },
  tr: {
    h1: 'Marathon Cheats — Aimbot, ESP ve wallhack',
    intro:
      "Marathon Cheats, Bungie'nin Marathon extraction shooter'ı için aimbot, ESP ve wallhack sunar. Steam özellikleri, fiyatlar, uyumluluk ve rehberleri karşılaştırın.",
  },
  pl: {
    h1: 'Marathon Cheats — Aimbot, ESP i wallhack',
    intro:
      'Marathon Cheats oferuje aimbot, ESP i wallhack do Marathon od Bungie na Steam. Porównaj ESP, radar łupu, ceny, zgodność i poradniki konfiguracji.',
  },
  it: {
    h1: 'Marathon Cheats — Aimbot, ESP e wallhack',
    intro:
      "Marathon Cheats offre aimbot, ESP e wallhack per l'extraction shooter Marathon di Bungie su Steam. Confronta funzioni, prezzi, compatibilità e guide.",
  },
  nl: {
    h1: 'Marathon Cheats — Aimbot, ESP en wallhack',
    intro:
      "Marathon Cheats levert aimbot, ESP en wallhack voor Bungie's Marathon extraction shooter op Steam. Vergelijk functies, prijzen, compatibiliteit en gidsen.",
  },
  'zh-CN': {
    h1: 'Marathon Cheats — 自瞄、ESP 透视与穿墙',
    intro:
      'Marathon Cheats 为 Bungie Marathon 提供自瞄、ESP 透视与穿墙功能。对比 Windows 版 Steam 的功能、价格、兼容性、评价与安装指南。',
  },
  sv: {
    h1: 'Marathon Cheats — Aimbot, ESP och wallhack',
    intro:
      'Marathon Cheats erbjuder aimbot, ESP och wallhack för Bungies Marathon extraction shooter på Steam. Jämför funktioner, priser, kompatibilitet och guider.',
  },
  ru: {
    h1: 'Marathon Cheats — Аимбот, ESP и wallhack',
    intro:
      'Marathon Cheats предлагает аимбот, ESP и wallhack для Marathon от Bungie в Steam. Сравните функции, цены, совместимость, отзывы и гайды по настройке.',
  },
  id: {
    h1: 'Marathon Cheats — Aimbot, ESP & wallhack',
    intro:
      'Marathon Cheats menyediakan aimbot, ESP, dan wallhack untuk extraction shooter Marathon Bungie di Steam. Bandingkan fitur, harga, kompatibilitas, dan panduan.',
  },
};

export function getHomePageHeading(locale: SeoLocaleCode): PageHeading {
  return HOME_PAGE_HEADINGS[locale] ?? HOME_PAGE_HEADINGS.en;
}
