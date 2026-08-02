import { createContext } from 'react';

export interface I18nContextType {
  lang: string;
  setLang: (lang: string) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});
