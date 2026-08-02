import { AnimatedSection } from './AnimatedSection';
import { SystemRequirementsList } from './SystemRequirementsList';

export function Integrations() {
  return (
    <section id="compatibility" className="nav-anchor-target compatibility-section">
      <div className="section-shell">
        <AnimatedSection>
          <header className="compatibility-section__header">
            <p className="section-label">Compatibility</p>
            <h2 className="display-heading compatibility-section__title">Marathon Cheat Compatibility</h2>
            <p className="compatibility-section__lead">
              Confirm your PC meets Marathon cheat system requirements before purchase. Marathon Cheats runs on Steam for Windows 10 and 11 with BattlEye.
            </p>
          </header>
        </AnimatedSection>

        <AnimatedSection>
          <div className="premium-panel compatibility-section__panel">
            <SystemRequirementsList />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
