import { Link } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { PricingSelector } from './PricingSelector';

import { SUPPORT_URL } from '../content/support';

const TRUST_POINTS = [
  {
    title: 'Instant delivery',
    description: 'Loader link and setup instructions on your order page right after checkout.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: '24/7 support',
    description: 'Discord team available around the clock for setup, loader issues, and HWID transfers.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Patch updates',
    description: 'New loaders published on your order page after Marathon patches — usually within hours.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <polyline points="21 3 21 9 15 9" />
      </svg>
    ),
  },
  {
    title: 'External loader',
    description: 'Runs outside Marathon on Steam with minimal performance impact on Windows 10 and 11.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
] as const;

export function BuyerConfidenceSection() {
  return (
    <section id="pricing" className="nav-anchor-target buyer-confidence-section" aria-labelledby="pricing-heading">
      <div className="section-shell">
        <AnimatedSection>
          <div className="premium-panel buyer-confidence-shell">
            <div className="buyer-confidence-grid">
              <PricingSelector />

              <div className="buyer-confidence-points">
                <p className="section-label">Buyer Confidence</p>
                <h2 id="pricing-heading" className="display-heading buyer-confidence-header__title">
                  Secure checkout and Marathon-focused support.
                </h2>
                {TRUST_POINTS.map(point => (
                  <article key={point.title} className="buyer-confidence-point">
                    <div className="buyer-confidence-point__icon" aria-hidden>
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="buyer-confidence-point__title">{point.title}</h3>
                      <p className="buyer-confidence-point__desc">{point.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <p className="buyer-confidence-footer">
              Questions before you buy?{' '}
              <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="feature-preview-card__link">
                Support →
              </a>
              {' · '}
              <Link to="/marathoncheats-buy" className="feature-preview-card__link">
                See full feature list →
              </Link>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
