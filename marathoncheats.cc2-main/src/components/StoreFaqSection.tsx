import { AnimatedSection } from './AnimatedSection';
import { FaqItem } from './FaqItem';
import { ShareCard } from './ShareCard';

type StoreFaq = { q: string; a: string };

type StoreFaqSectionProps = {
  faqs: readonly StoreFaq[];
};

export function StoreFaqSection({ faqs }: StoreFaqSectionProps) {
  return (
    <section id="faq" className="nav-anchor-target store-faq-section">
      <div className="section-shell">
        <AnimatedSection>
          <div className="premium-panel compatibility-info-card">
            <h2 className="compatibility-info-card__title">Marathon anti-cheat compatibility</h2>
            <p className="compatibility-info-card__body">
              Marathon on Steam uses <strong>BattlEye (BE)</strong> anti-cheat. Marathon Cheats is an{' '}
              <strong>external cheat loader</strong> — it runs outside the game process rather than injecting into memory.
              You must <strong>update your loader</strong> from your order page after every Marathon patch.
              Ban risk always exists; we recommend playing responsibly and avoiding behavior that draws manual reports.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <header className="store-faq-header">
            <p className="section-label">FAQ</p>
            <h2 className="display-heading store-faq-header__title">
              Frequently Asked Questions
            </h2>
          </header>
        </AnimatedSection>

        <AnimatedSection>
          <div className="faq-stack" role="list">
            {faqs.map((faq, index) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} defaultOpen={index === 0} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <ShareCard />
        </AnimatedSection>
      </div>
    </section>
  );
}
