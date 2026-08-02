import { AnimatedSection } from './AnimatedSection';
import { FaqItem } from './FaqItem';
import { HOME_FAQS } from '../content/faqs';
import { Link } from 'react-router-dom';

export function HomeFaqSection() {
  return (
    <section id="faq" className="nav-anchor-target store-faq-section">
      <div className="section-shell">
        <AnimatedSection>
          <header className="store-faq-header">
            <p className="section-label">Marathon Cheat FAQ</p>
            <h2 className="display-heading store-faq-header__title">
              How Marathon cheats work
            </h2>
            <p className="why-us-header__lead" style={{ maxWidth: 720, marginTop: 12 }}>
              Answers on compatibility, system requirements, performance impact, and patch update status.
              For pricing and download steps, see our{' '}
              <Link to="/marathoncheats-buy" className="hero-section__guides-link" style={{ marginBottom: 0 }}>
                Marathon cheat pricing page
              </Link>
              .
            </p>
          </header>
        </AnimatedSection>

        <AnimatedSection>
          <div className="faq-stack" role="list">
            {HOME_FAQS.map((faq, index) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} defaultOpen={index === 0} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
