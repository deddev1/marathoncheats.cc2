import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { buildLocalizedPath, parseLocalePath } from './localePaths';
import type { SeoLocaleCode } from './locales';
import { seoLocaleToI18n } from './locales';

/** Read the active SEO locale and helpers from the current URL. */
export function useSeoLocale() {
  const { pathname } = useLocation();

  return useMemo(() => {
    const parsed = parseLocalePath(pathname);
    const i18nLang = seoLocaleToI18n(parsed.locale);

    return {
      locale: parsed.locale,
      appPath: parsed.path,
      i18nLang,
      localizedPath: (appPath: string) => buildLocalizedPath(parsed.locale, appPath),
    };
  }, [pathname]);
}

export function useLocalizedPath(appPath: string): string {
  const { localizedPath } = useSeoLocale();
  return localizedPath(appPath);
}

export type { SeoLocaleCode };
