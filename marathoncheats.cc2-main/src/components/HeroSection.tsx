import { Link } from 'react-router-dom';
import { ZADEYO_CHECKOUT_URL } from '../content/checkout';
import { getSiteVideo } from '../content/videos';
import { useI18n } from '../i18n/useI18n';
import { HOME_PAGE_HEADING } from '../seo/pageHeadings';
import { VideoPlayer } from './VideoPlayer';

const HERO_VIDEO = getSiteVideo('marathon-hero-demo')!;
const [HOME_H1_TITLE, HOME_H1_SUBTITLE] = HOME_PAGE_HEADING.h1.split(' — ');

const HERO_TAGS = [
  'Player & AI ESP',
  'Loot Highlights',
  'Aimbot + Recoil',
  'External Loader',
  'Discord Support',
];

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="nav-anchor-target hero-section"
      aria-label="Marathon Cheats introduction"
    >
      <div className="hero-section__media" id="hero-video" aria-hidden="true">
        <VideoPlayer video={HERO_VIDEO} autoPlay loop muted className="hero-section__video" />
      </div>

      <div className="hero-section__overlay" aria-hidden="true" />
      <div className="grid-overlay hero-section__grid" aria-hidden="true" />

      <div className="hero-section__glow" aria-hidden="true" />

      <div className="hero-section__content section-shell">
        <div className="hero-section__copy">
          <div className="hero-section__eyebrow" style={{ animation: 'fadeUp 0.7s ease both' }}>
            <p className="section-label">Marathon</p>
          </div>

          <div style={{ animation: 'fadeUp 0.7s ease both', animationDelay: '0.08s' }}>
            <h1 className="display-heading hero-section__title">
              <span className="gradient-text">{HOME_H1_TITLE}</span>
              <span className="hero-section__subtitle">{HOME_H1_SUBTITLE ?? t('hero.subtitle')}</span>
            </h1>
          </div>

          <div style={{ animation: 'fadeUp 0.7s ease both', animationDelay: '0.16s' }}>
            <p className="hero-section__description">{t('hero.description')}</p>
          </div>

          <div
            className="hero-section__tags"
            style={{ animation: 'fadeUp 0.7s ease both', animationDelay: '0.22s' }}
          >
            {HERO_TAGS.map(tag => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <div
            className="hero-section__actions"
            style={{ animation: 'fadeUp 0.7s ease both', animationDelay: '0.28s' }}
          >
            <a
              href={ZADEYO_CHECKOUT_URL}
              className="btn-primary btn-buy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now
            </a>
            <a href="#features" className="btn-ghost">
              {t('hero.features')} ↓
            </a>
          </div>

          <div style={{ animation: 'fadeUp 0.7s ease both', animationDelay: '0.32s' }}>
            <a href="#hero-video" className="hero-section__guides-link">
              Watch gameplay demo →
            </a>
            <Link to="/blog" className="hero-section__guides-link" style={{ marginLeft: 16 }}>
              Read our ESP, Aimbot &amp; Spoofer guides →
            </Link>
          </div>

          <div style={{ animation: 'fadeUp 0.7s ease both', animationDelay: '0.36s' }}>
            <div className="hero-section__status">
              <span className="status-badge status-badge--active">
                <span className="status-badge__dot" aria-hidden />
                {t('hero.status')}
              </span>
              <span className="status-badge">{t('hero.trust')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-section__scroll" aria-hidden="true">
        <svg width="18" height="28" viewBox="0 0 20 32" fill="none">
          <rect x="1" y="1" width="18" height="30" rx="9" stroke="var(--accent)" strokeWidth="1.5" />
          <rect x="9" y="6" width="2" height="8" rx="1" fill="var(--accent)" />
        </svg>
      </div>
    </section>
  );
}
