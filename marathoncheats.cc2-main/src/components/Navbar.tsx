import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { LANGUAGES } from '../i18n/languages';
import { useI18n } from '../i18n/useI18n';
import { useScrollSpy, type NavSectionId } from '../hooks/useScrollSpy';
import { scrollToSectionById } from '../utils/scrollToSection';
import { ZADEYO_CHECKOUT_URL } from '../content/checkout';
import { SiteLogo } from './SiteLogo';
import { LanguageFlag } from './LanguageFlag';

const MOBILE_MQ = '(max-width: 1024px)';
const BUY_URL = ZADEYO_CHECKOUT_URL;

type NavLink = {
  label: string;
  sectionId: NavSectionId;
};

const NAV_LINKS: NavLink[] = [
  { label: 'Home', sectionId: 'top' },
  { label: 'Features', sectionId: 'features' },
  { label: 'Why Us', sectionId: 'why-us' },
  { label: 'Pricing', sectionId: 'pricing' },
  { label: 'FAQ', sectionId: 'faq' },
];

function getSectionHref(sectionId: NavSectionId, isHome: boolean) {
  if (sectionId === 'top') return '/';
  return isHome ? `#${sectionId}` : `/#${sectionId}`;
}

export function Navbar() {
  const location = useLocation();
  const { lang, setLang } = useI18n();
  const isHome = location.pathname === '/';
  const activeSection = useScrollSpy(isHome);

  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(location.pathname);

  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setMenuOpen(false);
    setLangOpen(false);
  }

  const langRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(language => language.code === lang) ?? LANGUAGES[0];

  const closeMobileMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const onChange = () => {
      if (!mq.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeMobileMenu();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMobileMenu]);

  const handleSectionClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>, sectionId: NavSectionId) => {
      if (!isHome) return;

      event.preventDefault();
      closeMobileMenu();

      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        return;
      }

      if (!scrollToSectionById(sectionId)) return;

      window.history.pushState(null, '', `#${sectionId}`);
    },
    [closeMobileMenu, isHome],
  );

  const isLinkActive = (item: NavLink) => isHome && activeSection === item.sectionId;

  const renderNavLink = (item: NavLink, className: string) => {
    const active = isLinkActive(item);

    return (
      <a
        key={item.label}
        href={getSectionHref(item.sectionId, isHome)}
        className={className}
        aria-current={active ? 'page' : undefined}
        onClick={event => handleSectionClick(event, item.sectionId)}
      >
        {item.label}
      </a>
    );
  };

  return (
    <>
      <header className="site-header" data-scrolled={scrolled ? 'true' : 'false'}>
        <nav className="site-nav" aria-label="Main navigation">
          <a
            href="/"
            className="site-nav__brand"
            aria-label="Marathon Cheats home"
            onClick={event => handleSectionClick(event, 'top')}
          >
            <SiteLogo height={26} className="site-logo--nav" />
          </a>

          <ul className="site-nav__menu" role="list">
            {NAV_LINKS.map(item => (
              <li key={item.label}>{renderNavLink(item, 'site-nav__link')}</li>
            ))}
          </ul>

          <div className="site-nav__actions">
            <div className="site-nav__tools">
              <div ref={langRef} className="site-nav__lang site-nav__lang--desktop">
                <button
                  type="button"
                  className="site-nav__lang-trigger"
                  onClick={() => setLangOpen(open => !open)}
                  aria-label={`Select language (${currentLang.label})`}
                  aria-expanded={langOpen}
                  aria-haspopup="listbox"
                >
                  <LanguageFlag emoji={currentLang.flag} className="site-nav__lang-flag" />
                </button>

                {langOpen && (
                  <div className="site-nav__lang-menu" role="listbox" aria-label="Languages">
                    {LANGUAGES.map(language => (
                      <button
                        key={language.code}
                        type="button"
                        className="site-nav__lang-item"
                        data-active={lang === language.code ? 'true' : 'false'}
                        aria-label={language.label}
                        aria-selected={lang === language.code}
                        onClick={() => {
                          setLang(language.code);
                          setLangOpen(false);
                        }}
                      >
                        <LanguageFlag emoji={language.flag} className="site-nav__lang-flag" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <a href={BUY_URL} className="site-nav__buy btn-buy" target="_blank" rel="noopener noreferrer">
              Buy Now
            </a>

            <button
              type="button"
              className="site-nav__icon-btn site-nav__hamburger"
              onClick={() => setMenuOpen(open => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      <div
        className="mobile-nav-backdrop"
        data-open={menuOpen ? 'true' : 'false'}
        onClick={closeMobileMenu}
        aria-hidden={!menuOpen}
      />

      <div
        id="mobile-navigation"
        className="mobile-nav-panel"
        data-open={menuOpen ? 'true' : 'false'}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav-panel__header">
          <SiteLogo height={24} className="site-logo--nav" />
          <button type="button" className="site-nav__icon-btn" onClick={closeMobileMenu} aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <ul className="mobile-nav-panel__menu" role="list">
          {NAV_LINKS.map(item => (
            <li key={item.label}>{renderNavLink(item, 'mobile-nav-panel__link')}</li>
          ))}
        </ul>

        <div className="mobile-nav-panel__footer">
          <p className="mobile-nav-panel__lang-label">Language</p>
          <div className="mobile-nav-panel__lang-flags" role="listbox" aria-label="Languages">
            {LANGUAGES.map(language => (
              <button
                key={language.code}
                type="button"
                className="mobile-nav-panel__lang-flag-btn"
                data-active={lang === language.code ? 'true' : 'false'}
                aria-label={language.label}
                aria-selected={lang === language.code}
                onClick={() => setLang(language.code)}
              >
                <LanguageFlag emoji={language.flag} className="mobile-nav-panel__lang-flag" />
              </button>
            ))}
          </div>

          <a
            href={BUY_URL}
            className="mobile-nav-panel__buy btn-buy"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
          >
            Buy Now
          </a>
        </div>
      </div>
    </>
  );
}
