export interface Language {
  code: string;
  label: string;
  flag: string;
  countryCode: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', flag: '🇺🇸', countryCode: 'us' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', countryCode: 'de' },
  { code: 'fr', label: 'Francais', flag: '🇫🇷', countryCode: 'fr' },
  { code: 'es', label: 'Espanol', flag: '🇪🇸', countryCode: 'es' },
  { code: 'pt', label: 'Portugues', flag: '🇧🇷', countryCode: 'br' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺', countryCode: 'ru' },
  { code: 'zh', label: '中文', flag: '🇨🇳', countryCode: 'cn' },
  { code: 'ja', label: '日本語', flag: '🇯🇵', countryCode: 'jp' },
  { code: 'ko', label: '한국어', flag: '🇰🇷', countryCode: 'kr' },
  { code: 'tr', label: 'Turkce', flag: '🇹🇷', countryCode: 'tr' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱', countryCode: 'pl' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱', countryCode: 'nl' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹', countryCode: 'it' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', countryCode: 'sa' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭', countryCode: 'th' },
  { code: 'vi', label: 'Tieng Viet', flag: '🇻🇳', countryCode: 'vn' },
];
