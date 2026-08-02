import { useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { BuyerConfidenceSection } from '../components/BuyerConfidenceSection';
import { SafetySection } from '../components/SafetySection';
import { FeaturesGrid } from '../components/FeaturesGrid';
import { FeatureExplorerSection } from '../components/FeatureExplorerSection';
import { FeaturesSectionBreadcrumb } from '../components/SectionBreadcrumb';
import { LicenseIncludesSection } from '../components/LicenseIncludesSection';
import { ChoosePlanSection } from '../components/ChoosePlanSection';
import { RaidPlaybookSection } from '../components/RaidPlaybookSection';
import { Integrations } from '../components/Integrations';
import { Testimonials } from '../components/Testimonials';
import { SupportBanner } from '../components/SupportBanner';
import { HomeFaqSection } from '../components/HomeFaqSection';
import { scrollToSectionById } from '../utils/scrollToSection';

export function HomePage() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) return;

    const frame = window.requestAnimationFrame(() => {
      scrollToSectionById(hash, 'auto');
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <HeroSection />
      <BuyerConfidenceSection />
      <SafetySection />
      <div id="features" className="nav-anchor-target">
        <FeaturesSectionBreadcrumb />
        <FeatureExplorerSection />
        <FeaturesGrid />
      </div>
      <LicenseIncludesSection />
      <ChoosePlanSection />
      <RaidPlaybookSection />
      <Integrations />
      <Testimonials />
      <HomeFaqSection />
      <SupportBanner />
    </>
  );
}
