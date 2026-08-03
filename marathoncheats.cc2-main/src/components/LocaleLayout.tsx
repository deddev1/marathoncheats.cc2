import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { getSeoLocale, localeUsesUrlPrefix } from '../seo/locales';
import { NotFoundPage } from '../pages/NotFound';

/** Validates :locale param and renders nested routes for non-English locales. */
export function LocaleLayout() {
  const { locale: localeParam } = useParams();
  const localeDef = localeParam ? getSeoLocale(localeParam) : undefined;

  if (!localeDef || !localeUsesUrlPrefix(localeDef.code)) {
    return <NotFoundPage />;
  }

  return <Outlet context={{ locale: localeDef.code }} />;
}

/** Redirect /en and /en/* to unprefixed English URLs. */
export function EnPrefixRedirect() {
  const { pathname, search } = useLocation();
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '') || '/';

  if (normalized === '/en') {
    return <Navigate to={`/${search}`} replace />;
  }

  if (normalized.startsWith('/en/')) {
    const stripped = normalized.slice(3) || '/';
    return <Navigate to={`${stripped}${search}`} replace />;
  }

  return <Navigate to={`/${search}`} replace />;
}
