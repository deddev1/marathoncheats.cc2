import type { FaqEntry } from '../../content/faqs';
import type { SeoLocaleCode } from '../locales';

const HOME_FAQS_EN: FaqEntry[] = [
  {
    q: 'How do Marathon cheats work?',
    a: 'Marathon Cheats is external software that reads game data from outside the Marathon process and draws an overlay for ESP, aimbot, and loot highlights. Nothing is injected into the game executable, and the loader is updated after Bungie patches.',
  },
  {
    q: 'What are the Marathon cheat system requirements?',
    a: 'You need Windows 10 or 11, Steam, a compatible CPU, HVCI/core isolation configured correctly, TPM, and Secure Boot settings that match our compatibility list. Cloud DMA is optional for hardware-separated setups.',
  },
  {
    q: 'Is Marathon Cheats compatible with Steam and BattlEye?',
    a: "Yes. Marathon Cheats is built for the Steam release of Bungie's Marathon extraction shooter and is designed to work alongside BattlEye as an external loader. Always download the latest build after game updates.",
  },
  {
    q: 'Will Marathon Cheats affect performance?',
    a: 'Because the cheat runs as a separate external process, most players report little to no FPS loss during raids. Performance impact depends on your PC specs and overlay settings.',
  },
  {
    q: 'How do Marathon cheat patch updates work?',
    a: 'After Bungie releases a Marathon update, download the newest loader from your order page. Updated builds are usually posted within hours, and Discord support can help if your overlay stops working.',
  },
];

/** Localized homepage FAQ schema copy per SEO locale. */
export const LOCALIZED_HOME_FAQS: Record<SeoLocaleCode, FaqEntry[]> = {
  en: HOME_FAQS_EN,
  de: [
    {
      q: 'Wie funktionieren Marathon Cheats?',
      a: 'Marathon Cheats ist externe Software, die Spieldaten außerhalb des Marathon-Prozesses liest und ein Overlay für ESP, Aimbot und Loot-Highlights zeichnet. Nichts wird in die Spielexe injiziert, und der Loader wird nach Bungie-Patches aktualisiert.',
    },
    {
      q: 'Welche Systemanforderungen gelten für Marathon Cheats?',
      a: 'Sie benötigen Windows 10 oder 11, Steam, eine kompatible CPU, korrekt konfigurierte HVCI/Core-Isolation, TPM und Secure-Boot-Einstellungen gemäß unserer Kompatibilitätsliste. Cloud DMA ist optional.',
    },
    {
      q: 'Ist Marathon Cheats mit Steam und BattlEye kompatibel?',
      a: 'Ja. Marathon Cheats ist für die Steam-Version von Bungies Marathon Extraction-Shooter entwickelt und arbeitet als externer Loader mit BattlEye. Laden Sie nach Spielupdates immer den neuesten Build herunter.',
    },
    {
      q: 'Beeinträchtigt Marathon Cheats die Performance?',
      a: 'Da der Cheat als separater externer Prozess läuft, berichten die meisten Spieler von kaum FPS-Verlust in Raids. Die Auswirkung hängt von Ihrer Hardware und den Overlay-Einstellungen ab.',
    },
    {
      q: 'Wie funktionieren Patch-Updates für Marathon Cheats?',
      a: 'Nach einem Marathon-Update von Bungie laden Sie den neuesten Loader von Ihrer Bestellseite herunter. Aktualisierte Builds erscheinen meist innerhalb weniger Stunden; Discord-Support hilft bei Problemen.',
    },
  ],
  fr: HOME_FAQS_EN,
  es: HOME_FAQS_EN,
  pt: HOME_FAQS_EN,
  ja: HOME_FAQS_EN,
  ko: HOME_FAQS_EN,
  tr: HOME_FAQS_EN,
  pl: HOME_FAQS_EN,
  it: HOME_FAQS_EN,
  nl: HOME_FAQS_EN,
  'zh-CN': HOME_FAQS_EN,
  sv: HOME_FAQS_EN,
  ru: HOME_FAQS_EN,
  id: HOME_FAQS_EN,
};

export function getLocalizedHomeFaqs(locale: SeoLocaleCode): FaqEntry[] {
  return LOCALIZED_HOME_FAQS[locale] ?? HOME_FAQS_EN;
}
