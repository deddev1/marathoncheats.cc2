import { useEffect, useState } from 'react';

export const NAV_SECTION_IDS = [
  'top',
  'pricing',
  'why-us',
  'demo',
  'features',
  'choose-plan',
  'compatibility',
  'reviews',
  'faq',
  'support',
] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

export const NAV_BAR_SECTION_IDS = [
  'top',
  'features',
  'why-us',
  'pricing',
  'faq',
] as const satisfies readonly NavSectionId[];

function sectionFromHash(hash: string): NavSectionId | null {
  const id = hash.replace(/^#/, '');
  if (!id) return 'top';
  return NAV_SECTION_IDS.includes(id as NavSectionId) ? (id as NavSectionId) : null;
}

export function useScrollSpy(enabled: boolean) {
  const [activeSection, setActiveSection] = useState<NavSectionId>('top');

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const syncFromHash = () => {
      const fromHash = sectionFromHash(window.location.hash);
      if (fromHash) setActiveSection(fromHash);
      else if (window.scrollY < 120) setActiveSection('top');
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    window.addEventListener('popstate', syncFromHash);

    let frame = 0;

    const pickActiveSection = () => {
      frame = 0;

      if (window.scrollY < 80 && !window.location.hash) {
        setActiveSection('top');
        return;
      }

      const navOffset =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 78;
      const scrollLine = window.scrollY + navOffset + 24;

      let nextSection: NavSectionId = 'top';

      NAV_SECTION_IDS.forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;

        if (element.offsetTop <= scrollLine) {
          nextSection = id;
        }
      });

      setActiveSection(nextSection);
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(pickActiveSection);
      }
    };

    pickActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('hashchange', syncFromHash);
      window.removeEventListener('popstate', syncFromHash);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return enabled ? activeSection : 'top';
}
