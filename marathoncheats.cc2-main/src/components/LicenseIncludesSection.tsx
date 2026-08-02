import { Link } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { LICENSE_INCLUDES } from '../content/licenseIncludes';

export function LicenseIncludesSection() {
  return (
    <section className="license-includes-section" aria-labelledby="license-includes-heading">
      <div className="section-shell">
        <AnimatedSection>
          <div className="premium-panel license-includes-shell">
            <h2 id="license-includes-heading" className="display-heading license-includes-shell__title">
              Included in every license
            </h2>
            <ul className="license-includes-list">
              {LICENSE_INCLUDES.map(item => (
                <li key={item.label} className="license-includes-list__item">
                  <span className="license-includes-list__dot" aria-hidden />
                  <span>
                    <strong>{item.label}</strong>
                    <span className="license-includes-list__sep"> — </span>
                    <span className="license-includes-list__desc">{item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="license-includes-footer">
              Full checklist with every toggle and range setting on the{' '}
              <Link to="/marathoncheats-buy" className="feature-preview-card__link">
                buy page →
              </Link>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
