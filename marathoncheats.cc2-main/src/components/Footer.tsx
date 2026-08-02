import { Link } from 'react-router-dom';
import { ZADEYO_SUPPORT_URL } from '../content/support';
import { SiteLogo } from './SiteLogo';

const EXPLORE_LINKS: Array<
  | { label: string; to: '/' | `/blog/${string}` | '/blog' | '/marathoncheats-buy' }
  | { label: string; href: string; external: true }
> = [
  { label: 'Marathon Cheats overview', to: '/' },
  { label: 'Marathon cheat pricing', to: '/marathoncheats-buy' },
  { label: 'Marathon ESP guide', to: '/blog/marathoncheats-esp' },
  { label: 'Marathon aimbot guide', to: '/blog/marathoncheats-aimbot' },
  { label: 'Marathon anti-cheat & HWID', to: '/blog/marathoncheats-hwid' },
  { label: 'All cheat guides', to: '/blog' },
];

const HELP_LINKS: Array<
  | { label: string; to: '/terms' | '/privacy' | '/refund' }
  | { label: string; href: string; external?: boolean }
> = [
  { label: 'Marathon cheat FAQ', href: '/marathoncheats-buy#faq' },
  { label: 'Support', href: ZADEYO_SUPPORT_URL, external: true },
  { label: 'Terms of service', to: '/terms' },
  { label: 'Privacy policy', to: '/privacy' },
  { label: 'Refund policy', to: '/refund' },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo-link" aria-label="Marathon Cheats home">
              <SiteLogo height={30} className="site-logo--footer" />
            </Link>
            <p className="site-footer__brand-desc">
              Marathon aimbot, ESP, and wallhack for Bungie&apos;s extraction shooter on Steam. External loader with patch updates and Discord support.
            </p>
            <a
              href={ZADEYO_SUPPORT_URL}
              className="site-footer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support
            </a>
          </div>

          <div>
            <p className="site-footer__col-title">Explore</p>
            {EXPLORE_LINKS.map(link =>
              'to' in link ? (
                <Link key={link.label} to={link.to} className="site-footer__link">
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="site-footer__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ),
            )}
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
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
