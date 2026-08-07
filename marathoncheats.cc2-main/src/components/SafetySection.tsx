import { Link } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { FeatureShowcaseGallery } from './FeatureShowcaseGallery';
import { CHECKOUT_URL } from '../content/checkout';
import { SUPPORT_URL } from '../content/support';
import { SITE_IMAGES } from '../content/siteImages';
import { SeoImage } from './SeoImage';

const WHY_US_CARDS = [
  {
    title: 'Marathon Radar & Loot ESP',
    description:
      'Player ESP, item ESP, loot highlights, and distance reads with adjustable radar-style ranges.',
  },
  {
    title: 'Marathon No Recoil & Aimbot',
    description:
      'Hotkey toggle, visible-only targeting, bone selection, smoothing, FOV limits, and recoil control.',
  },
  {
    title: 'External Marathon Cheat',
    description:
      'Runs outside Marathon on Steam. Loader updates after patches with setup guide, video, and Discord support.',
  },
  {
    title: 'Play Smart',
    description:
      'Update your loader after every patch and avoid obvious behavior that draws reports.',
  },
] as const;

const FEATURE_PREVIEW_CARDS = [
  {
    tag: 'ESP',
    title: 'Visual awareness for every raid',
    description:
      'Player boxes, skeleton lines, loot highlights, and distance reads — all configurable for Bungie\'s Marathon extraction shooter.',
    image: SITE_IMAGES.esp,
    imageAlt: 'Marathon ESP showing player boxes and loot highlights',
    href: '/blog/marathoncheats-esp',
    linkLabel: 'Read ESP guide',
  },
  {
    tag: 'Aimbot',
    title: 'Smooth aim with full control',
    description:
      'Hotkey toggle, visible-only targeting, bone selection, smoothing, FOV limits, and recoil control built for Marathon.',
    image: SITE_IMAGES.aimbot,
    imageAlt: 'Marathon aimbot settings with FOV circle',
    href: '/blog/marathoncheats-aimbot',
    linkLabel: 'Read aimbot guide',
  },
  {
    tag: 'Loot ESP',
    title: 'Spot valuable pickups early',
    description:
      'Highlight loot containers, resources, and high-value items through walls so you extract with better gear every run.',
    image: SITE_IMAGES.loot,
    imageAlt: 'Marathon loot ESP highlighting valuable items',
    href: CHECKOUT_URL,
    linkLabel: 'View pricing',
    external: true,
  },
  {
    tag: 'Support',
    title: 'Help when you need it',
    description:
      'Discord support for setup, loader issues, HWID transfers, and post-patch updates — fast responses from real staff.',
    image: SITE_IMAGES.support,
    imageAlt: 'Marathon external cheat loader interface',
    href: SUPPORT_URL,
    linkLabel: 'Support',
    external: true,
  },
] as const;

type FeaturePreviewCardData = (typeof FEATURE_PREVIEW_CARDS)[number] & {
  external?: boolean;
};

function WhyUsFeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="why-us-feature-card">
      <h3 className="why-us-feature-card__title">
        <span className="why-us-feature-card__dot" aria-hidden />
        {title}
      </h3>
      <p className="why-us-feature-card__desc">{description}</p>
    </article>
  );
}

function FeaturePreviewCard({
  tag,
  title,
  description,
  image,
  imageAlt,
  href,
  linkLabel,
  external,
}: FeaturePreviewCardData) {
  const isHash = href.startsWith('#');

  const linkContent = (
    <>
      {linkLabel} →
    </>
  );

  return (
    <article className="feature-preview-card">
      <div className="feature-preview-card__media">
        <SeoImage
          src={image}
          alt={imageAlt}
          context={{ title, label: tag }}
          loading="lazy"
        />
        <span className="feature-preview-card__tag">{tag}</span>
      </div>
      <div className="feature-preview-card__body">
        <h3 className="feature-preview-card__title">{title}</h3>
        <p className="feature-preview-card__desc">{description}</p>
        {external ? (
          <a
            href={href}
            className="feature-preview-card__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkContent}
          </a>
        ) : isHash ? (
          <a href={href} className="feature-preview-card__link">
            {linkContent}
          </a>
        ) : (
          <Link to={href} className="feature-preview-card__link">
            {linkContent}
          </Link>
        )}
      </div>
    </article>
  );
}

export function SafetySection() {
  return (
    <section id="why-us" className="nav-anchor-target why-us-section">
      <div className="section-shell">
        <AnimatedSection>
          <div className="premium-panel why-us-shell">
            <header className="why-us-header">
              <p className="section-label">Marathon Cheat Features</p>
              <h2 className="display-heading why-us-header__title">
                ESP, aimbot, loot ESP &amp; radar
              </h2>
              <p className="why-us-header__lead">
                External Marathon cheats for Bungie&apos;s extraction shooter — player ESP, wallhack, item ESP, no-recoil aimbot, and loader updates after every patch.
              </p>
            </header>

            <div className="why-us-grid">
              <div id="demo" className="nav-anchor-target why-us-media store-product-gallery">
                <FeatureShowcaseGallery />
                <p className="why-us-media__caption">
                  Marathon — where awareness wins extractions
                </p>
              </div>

              <div className="why-us-cards">
                {WHY_US_CARDS.map(card => (
                  <WhyUsFeatureCard key={card.title} title={card.title} description={card.description} />
                ))}
              </div>
            </div>

            <div className="feature-preview-grid" aria-label="Marathon cheat features">
              {FEATURE_PREVIEW_CARDS.map(card => (
                <FeaturePreviewCard key={card.tag} {...card} />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
