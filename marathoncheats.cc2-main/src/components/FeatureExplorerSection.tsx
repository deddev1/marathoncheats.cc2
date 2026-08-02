import { useMemo, useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { SITE_IMAGES } from '../content/siteImages';
import { getImageSeoByPath } from '../content/imageSeo';
import { SeoImage } from './SeoImage';

type ExplorerFeature = {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  imageAlt: string;
};

const EXPLORER_FEATURES: ExplorerFeature[] = [
  {
    id: 'player-esp',
    category: 'Marathon ESP',
    title: 'Player & AI ESP',
    shortDesc: 'Outline boxes and skeleton lines for hostiles.',
    fullDesc:
      'Track nearby players and AI with 2D boxes, skeleton lines, distance reads, and adjustable player range — built for Marathon raids on Steam.',
    image: SITE_IMAGES.esp,
    imageAlt: getImageSeoByPath(SITE_IMAGES.esp)!.alt,
  },
  {
    id: 'loot-esp',
    category: 'Marathon ESP',
    title: 'Loot ESP',
    shortDesc: 'Highlight valuable pickups and containers.',
    fullDesc:
      'See loot containers, chests, resources, and high-value items through walls with configurable loot range and color settings.',
    image: SITE_IMAGES.loot,
    imageAlt: getImageSeoByPath(SITE_IMAGES.loot)!.alt,
  },
  {
    id: 'player-alert',
    category: 'Marathon ESP',
    title: 'Player Alert',
    shortDesc: 'Get warned when enemies enter your area.',
    fullDesc:
      'Receive alerts when hostiles enter your vicinity so you can reposition before a fight starts.',
    image: SITE_IMAGES.playerAlert,
    imageAlt: getImageSeoByPath(SITE_IMAGES.playerAlert)!.alt,
  },
  {
    id: 'aimbot',
    category: 'Marathon Aimbot',
    title: 'Aimbot & Recoil',
    shortDesc: 'Smooth aim with FOV limits and recoil control.',
    fullDesc:
      'Toggle aimbot with a hotkey, use visible-only checks, pick aim bones, set smoothing and FOV radius, and reduce recoil while firing.',
    image: SITE_IMAGES.aimbot,
    imageAlt: getImageSeoByPath(SITE_IMAGES.aimbot)!.alt,
  },
  {
    id: 'visible-check',
    category: 'Marathon Aimbot',
    title: 'Visible Check',
    shortDesc: 'Only engage targets you can actually see.',
    fullDesc:
      'Keep aim assistance believable by limiting lock-on to visible targets with optional on-screen FOV circle overlay.',
    image: SITE_IMAGES.visibleCheck,
    imageAlt: getImageSeoByPath(SITE_IMAGES.visibleCheck)!.alt,
  },
  {
    id: 'external-loader',
    category: 'Marathon Utility',
    title: 'External Loader',
    shortDesc: 'Runs outside Marathon — not injected.',
    fullDesc:
      'The cheat runs as a separate external process on Windows 10 and 11 with minimal FPS impact. Download updates from your Zadeyo order page.',
    image: SITE_IMAGES.external,
    imageAlt: getImageSeoByPath(SITE_IMAGES.external)!.alt,
  },
  {
    id: 'cloud-dma',
    category: 'Marathon Utility',
    title: 'Cloud-DMA Option',
    shortDesc: 'Hardware-separated setup on request.',
    fullDesc:
      'Need DMA-style separation? Ask about our Cloud-DMA option for Marathon Cheats with remote configuration support.',
    image: SITE_IMAGES.cloudDma,
    imageAlt: getImageSeoByPath(SITE_IMAGES.cloudDma)!.alt,
  },
];

function groupFeatures(features: ExplorerFeature[]) {
  const groups: { category: string; items: { feature: ExplorerFeature; index: number }[] }[] = [];
  const map = new Map<string, { feature: ExplorerFeature; index: number }[]>();

  features.forEach((feature, index) => {
    const list = map.get(feature.category) ?? [];
    list.push({ feature, index: index + 1 });
    map.set(feature.category, list);
  });

  map.forEach((items, category) => {
    groups.push({ category, items });
  });

  return groups;
}

export function FeatureExplorerSection() {
  const [activeId, setActiveId] = useState(EXPLORER_FEATURES[0].id);
  const activeFeature = EXPLORER_FEATURES.find(feature => feature.id === activeId) ?? EXPLORER_FEATURES[0];
  const groups = useMemo(() => groupFeatures(EXPLORER_FEATURES), []);

  return (
    <section className="feature-explorer-section" aria-labelledby="feature-explorer-heading">
      <div className="section-shell">
        <AnimatedSection>
          <header className="feature-explorer-header">
            <p className="section-label" style={{ justifyContent: 'center' }}>Feature gallery</p>
            <h2 id="feature-explorer-heading" className="display-heading feature-explorer-header__title">
              Marathon cheat demo gallery
            </h2>
            <p className="feature-explorer-header__lead">
              Browse ESP, aimbot, and utility tools included in your license. Select a feature to preview how it works in Marathon.
            </p>
          </header>
        </AnimatedSection>

        <AnimatedSection>
          <div className="premium-panel feature-explorer-shell">
            <div className="feature-explorer-grid">
              <div className="feature-explorer-list" role="tablist" aria-label="Marathon cheat features">
                {groups.map(group => (
                  <div key={group.category} className="feature-explorer-group">
                    <p className="feature-explorer-group__label">{group.category}</p>
                    {group.items.map(({ feature, index }) => {
                      const active = feature.id === activeId;
                      return (
                        <button
                          key={feature.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          className={`feature-explorer-item${active ? ' feature-explorer-item--active' : ''}`}
                          onClick={() => setActiveId(feature.id)}
                        >
                          <span className="feature-explorer-item__badge" aria-hidden>
                            {index}
                          </span>
                          <span className="feature-explorer-item__copy">
                            <span className="feature-explorer-item__title">{feature.title}</span>
                            <span className="feature-explorer-item__desc">{feature.shortDesc}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="feature-explorer-preview" role="tabpanel" aria-live="polite">
                <div className="feature-explorer-preview__media">
                  <SeoImage
                    key={activeFeature.id}
                    src={activeFeature.image}
                    fallbackAlt={activeFeature.imageAlt}
                    context={{
                      heading: activeFeature.title,
                      caption: activeFeature.fullDesc,
                    }}
                    priority
                    loading="eager"
                  />
                </div>
                <div className="feature-explorer-preview__body">
                  <h3 className="feature-explorer-preview__title">{activeFeature.title}</h3>
                  <p className="feature-explorer-preview__desc">{activeFeature.fullDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
