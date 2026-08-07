import { Link } from 'react-router-dom';
import { SUPPORT_URL } from '../content/support';
import { SiteLogo } from './SiteLogo';
import { useLocalizedPath } from '../seo/useSeoLocale';

export function Footer() {
  const homePath = useLocalizedPath('/');
  const storePath = useLocalizedPath('/marathoncheats-buy');
  const blogPath = useLocalizedPath('/blog');
  const espGuidePath = useLocalizedPath('/blog/marathoncheats-esp');
  const aimbotGuidePath = useLocalizedPath('/blog/marathoncheats-aimbot');
  const hwidGuidePath = useLocalizedPath('/blog/marathoncheats-hwid');
  const termsPath = useLocalizedPath('/terms');
  const privacyPath = useLocalizedPath('/privacy');
  const refundPath = useLocalizedPath('/refund');

  const EXPLORE_LINKS = [
    { label: 'Marathon Cheats overview', to: homePath },
    { label: 'Marathon cheat pricing', to: storePath },
    { label: 'Marathon ESP guide', to: espGuidePath },
    { label: 'Marathon aimbot guide', to: aimbotGuidePath },
    { label: 'Marathon anti-cheat & HWID', to: hwidGuidePath },
    { label: 'All cheat guides', to: blogPath },
  ] as const;

  const HELP_LINKS: Array<
    | { label: string; to: string }
    | { label: string; href: string; external?: boolean }
  > = [
    { label: 'Marathon cheat FAQ', href: `${storePath}#faq` },
    { label: 'Support', href: SUPPORT_URL, external: true },
    { label: 'Terms of service', to: termsPath },
    { label: 'Privacy policy', to: privacyPath },
    { label: 'Refund policy', to: refundPath },
  ] as const;
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to={homePath} className="site-footer__logo-link" aria-label="Marathon Cheats home">
              <SiteLogo height={30} className="site-logo--footer" />
            </Link>
            <p className="site-footer__brand-desc">
              Marathon aimbot, ESP, and wallhack for Bungie&apos;s extraction shooter on Steam. External loader with patch updates and Discord support.
            </p>
            <a
              href={SUPPORT_URL}
              className="site-footer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support
            </a>
          </div>

          <div>
            <p className="site-footer__col-title">Explore</p>
            {EXPLORE_LINKS.map(link => (
                <Link key={link.label} to={link.to} className="site-footer__link">
                  {link.label}
                </Link>
              ))}
          </div>

          <div>
            <p className="site-footer__col-title">Help</p>
            {HELP_LINKS.map(link =>
              'to' in link ? (
                <Link key={link.label} to={link.to} className="site-footer__link">
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="site-footer__link"
                  {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </a>
              ),
            )}
          </div>
        </div>

        <div className="site-footer__legal">
          <p>
            Marathon Cheats is not affiliated with, endorsed by, or connected to Bungie, Inc. or the Marathon game franchise.
            All game names and trademarks are property of their respective owners.
          </p>
        </div>

        <div className="site-footer__bottom">
          <span>© 2026 Marathon Cheats. All Rights Reserved.</span>
          <span>Not affiliated with Bungie, Inc. or Marathon.</span>
        </div>
      </div>
    </footer>
  );
}
