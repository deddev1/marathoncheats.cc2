import { Navigate, Outlet, useParams } from 'react-router-dom';
import { getSeoLocale, DEFAULT_SEO_LOCALE } from '../seo/locales';
import { NotFoundPage } from '../pages/NotFound';

/** Validates :locale param and renders nested routes. */
export function LocaleLayout() {
  const { locale: localeParam } = useParams();
  const localeDef = localeParam ? getSeoLocale(localeParam) : undefined;

  if (!localeDef) {
    return <NotFoundPage />;
  }

  return <Outlet context={{ locale: localeDef.code }} />;
}

export function RootRedirect() {
  return <Navigate to={`/${getSeoLocale(DEFAULT_SEO_LOCALE)!.segment}/`} replace />;
}
