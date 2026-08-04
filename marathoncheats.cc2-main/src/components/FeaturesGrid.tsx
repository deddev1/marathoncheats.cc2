import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { AimbotSectionBreadcrumb } from './SectionBreadcrumb';
import { ZADEYO_CHECKOUT_URL } from '../content/checkout';
import { SITE_IMAGES } from '../content/siteImages';
import { SeoImage } from './SeoImage';

const FEATURE_IMAGES = {
  esp: SITE_IMAGES.esp,
  loot: SITE_IMAGES.loot,
  aimbot: SITE_IMAGES.aimbot,
  cloudDma: SITE_IMAGES.cloudDma,
  showcase: SITE_IMAGES.showcase,
} as const;

const visualEspFeatures = [
  {
    name: '2D Box',
    desc: 'Outline boxes around nearby players and hostiles.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <rect x="4" y="4" width="18" height="18" rx="2" />
        <rect x="8" y="8" width="10" height="10" rx="1" />
      </svg>
    ),
  },
  {
    name: 'Skeleton Lines',
    desc: 'Bone-structure highlights for clearer target reads.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="13" cy="4" r="2.5" />
        <line x1="13" y1="6.5" x2="13" y2="14" />
        <line x1="8" y1="9" x2="13" y2="11" />
        <line x1="18" y1="9" x2="13" y2="11" />
        <line x1="13" y1="14" x2="9" y2="21" />
        <line x1="13" y1="14" x2="17" y2="21" />
      </svg>
    ),
  },
  {
    name: 'Loot ESP',
    desc: 'Highlights valuable pickups in range.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M4 10h18v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z" />
        <path d="M8 10V7a5 5 0 0 1 10 0v3" />
        <circle cx="13" cy="15" r="2" fill="currentColor" fillOpacity="0.35" />
      </svg>
    ),
  },
  {
    name: 'Distance ESP',
    desc: 'Range to nearby contacts.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="5" cy="13" r="3" />
        <circle cx="21" cy="13" r="3" />
        <line x1="8" y1="13" x2="18" y2="13" strokeDasharray="2.5 2" />
      </svg>
    ),
  },
  {
    name: 'Info Color',
    desc: 'Customize ESP colors to your preference.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="13" cy="13" r="4" fill="currentColor" fillOpacity="0.2" />
        <path d="M13 2v3M13 21v3M2 13h3M21 13h3" />
      </svg>
    ),
  },
  {
    name: 'Player Range',
    desc: 'Set max distance for player and AI ESP.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="13" cy="13" r="10" strokeDasharray="3 2" />
        <circle cx="13" cy="13" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Loot Range',
    desc: 'Control how far pickups appear on ESP.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="13" cy="13" r="6" strokeDasharray="2 2" />
        <path d="M13 7v2M13 17v2M7 13h2M17 13h2" />
      </svg>
    ),
  },
  {
    name: 'Player Alert',
    desc: 'Get notified when enemies enter your vicinity.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M13 2C9 2 6 5 6 9v5l-2 3h18l-2-3V9c0-4-3-7-7-7z" />
        <path d="M11 21a2 2 0 0 0 4 0" />
      </svg>
    ),
  },
  {
    name: 'Show Ore & Plants',
    desc: 'Mark resource nodes for efficient farming and crafting.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M13 3c-3 4-8 6-8 11a8 8 0 0 0 16 0c0-5-5-7-8-11z" />
        <line x1="13" y1="11" x2="13" y2="18" />
      </svg>
    ),
  },
  {
    name: 'Show Chests & Objects',
    desc: 'Identify containers and interactive objects instantly.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <rect x="4" y="9" width="18" height="13" rx="2" />
        <path d="M4 13h18M10 9V6a3 3 0 0 1 6 0v3" />
      </svg>
    ),
  },
];

const aimbotFeatures = [
  {
    name: 'Aimbot Key',
    desc: 'Hotkey to toggle aimbot.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <rect x="4" y="8" width="7" height="10" rx="2" />
        <rect x="15" y="4" width="7" height="10" rx="2" />
        <line x1="11" y1="13" x2="15" y2="9" />
      </svg>
    ),
  },
  {
    name: 'Visible Check',
    desc: 'Aimbot only engages visible targets.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M3 13c4-7 16-7 20 0-4 7-16 7-20 0z" />
        <circle cx="13" cy="13" r="4" />
      </svg>
    ),
  },
  {
    name: 'Bone Selector',
    desc: 'Choose preferred aim point (head, chest, neck).',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="13" cy="5" r="3" />
        <circle cx="13" cy="13" r="2.5" />
        <circle cx="13" cy="21" r="3" />
        <line x1="13" y1="8" x2="13" y2="10.5" />
        <line x1="13" y1="15.5" x2="13" y2="18" />
      </svg>
    ),
  },
  {
    name: 'Aimbot Smoothing',
    desc: 'Tune aim movement for natural tracking.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M3 18Q8 8 13 12q5 4 10-6" />
        <circle cx="13" cy="12" r="2.5" fill="currentColor" fillOpacity="0.25" />
      </svg>
    ),
  },
  {
    name: 'Aimbot FOV',
    desc: 'Set the active aimbot radius.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="13" cy="13" r="10" strokeDasharray="3 2" />
        <line x1="13" y1="13" x2="20" y2="8" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    name: 'Recoil Control',
    desc: 'Eliminates weapon recoil while firing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <rect x="4" y="14" width="14" height="7" rx="2" />
        <line x1="9" y1="14" x2="9" y2="10" />
        <line x1="9" y1="10" x2="18" y2="5" />
      </svg>
    ),
  },
  {
    name: 'FOV Circle',
    desc: 'Optional on-screen aimbot radius.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="13" cy="13" r="9" />
        <circle cx="13" cy="13" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

interface FeatureCardProps {
  name: string;
  desc: string;
  icon: React.ReactNode;
  accentColor?: string;
}

function FeatureCard({ name, desc, icon, accentColor = 'var(--accent)' }: FeatureCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="glass-card feature-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(18px, 2.2vw, 24px)',
        position: 'relative',
        overflow: 'hidden',
        borderColor: hovered ? 'var(--border-bright)' : 'var(--border-ghost)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? 'radial-gradient(circle at top left, rgba(168,85,247,0.14), transparent 65%)'
            : 'radial-gradient(circle at top left, rgba(168,85,247,0.05), transparent 65%)',
          pointerEvents: 'none',
          transition: 'background 0.3s ease',
        }}
        aria-hidden="true"
      />

      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 'var(--radius-md)',
          background: hovered ? 'rgba(168,85,247,0.16)' : 'rgba(168,85,247,0.08)',
          border: `1px solid ${hovered ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.15)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 14,
          color: accentColor,
          transition: 'background 0.25s ease, border-color 0.25s ease',
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1rem',
          letterSpacing: '0.03em',
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        {name}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.84rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

function FeatureShowcase({
  src,
  alt,
  label,
  reverse = false,
}: {
  src: string;
  alt: string;
  label: string;
  reverse?: boolean;
}) {
  return (
    <div
      className="feature-showcase"
      style={{
        display: 'grid',
        gridTemplateColumns: reverse ? 'minmax(0, 1.1fr) minmax(0, 0.9fr)' : 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
        gap: 'clamp(20px, 3vw, 32px)',
        alignItems: 'stretch',
        marginBottom: 'clamp(32px, 5vw, 48px)',
      }}
    >
      <div
        style={{
          order: reverse ? 2 : 1,
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          border: '1px solid var(--border-dim)',
          background: 'var(--bg-surface)',
          minHeight: 220,
          aspectRatio: '16 / 10',
        }}
      >
        <SeoImage
          src={src}
          alt={alt}
          loading="lazy"
          width={1280}
          height={800}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(6,4,9,0.75) 0%, rgba(6,4,9,0.05) 55%)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
        <span
          style={{
            position: 'absolute',
            left: 16,
            bottom: 16,
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent-bright)',
            background: 'rgba(6,4,9,0.72)',
            border: '1px solid var(--border-dim)',
            borderRadius: '999px',
            padding: '6px 12px',
          }}
        >
          {label}
        </span>
      </div>

      <div
        className="glass-card"
        style={{
          order: reverse ? 1 : 2,
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(20px, 3vw, 28px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <p className="section-label" style={{ marginBottom: 0 }}>
          Marathon Cheats Preview
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          See how Marathon Cheats overlays look in-game — clean ESP reads, configurable ranges, and aimbot tools built for Bungie&apos;s extraction shooter.
        </p>
      </div>
    </div>
  );
}

export function FeaturesGrid() {  return (
    <>
      <section
        id="esp"
        style={{
          background: 'var(--bg-deep)',
          padding: 'clamp(80px, 10vw, 120px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        <div className="section-shell" style={{ position: 'relative' }}>
          <AnimatedSection>
            <div style={{ marginBottom: 'clamp(36px, 5vw, 52px)' }}>
              <p className="section-label" style={{ marginBottom: 18 }}>
                Features
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  lineHeight: 1.05,
                  marginBottom: 16,
                }}
              >
                Visual <span className="gradient-text">ESP</span>
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                  color: 'var(--text-secondary)',
                  maxWidth: 760,
                  lineHeight: 1.75,
                  marginBottom: 12,
                }}
              >
                Full visual awareness for Marathon raids — player boxes, skeleton lines, loot highlights, distance reads, and world ESP with adjustable ranges and colors.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', marginBottom: 16 }}>
                <Link to="/blog/marathoncheats-esp" style={{ color: 'var(--accent-bright)', textDecoration: 'none' }}>
                  Read the Marathon ESP guide →
                </Link>
                {' · '}
                <a
                  href={ZADEYO_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                >
                  View pricing
                </a>
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <FeatureShowcase
              src={FEATURE_IMAGES.esp}
              alt="Marathon ESP showing player boxes and loot highlights"
              label="Visual ESP"
            />
          </AnimatedSection>

          <AnimatedSection>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
                gap: 'clamp(12px, 1.8vw, 18px)',
                marginBottom: 'clamp(40px, 6vw, 64px)',
              }}
            >
              {visualEspFeatures.map(feature => (
                <FeatureCard key={feature.name} {...feature} />
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <FeatureShowcase
              src={FEATURE_IMAGES.loot}
              alt="Marathon loot ESP highlighting valuable pickups through walls"
              label="Loot ESP"
              reverse
            />
          </AnimatedSection>
        </div>
      </section>

      <section
        id="aimbot"
        className="nav-anchor-target"
        style={{
          background: 'var(--bg-base)',
          padding: 'clamp(80px, 10vw, 120px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-8%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192,132,252,0.07) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        <div className="section-shell" style={{ position: 'relative' }}>
          <AimbotSectionBreadcrumb />
          <AnimatedSection>
            <div style={{ marginBottom: 'clamp(36px, 5vw, 52px)' }}>
              <p className="section-label" style={{ marginBottom: 18 }}>
                Aimbot
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  lineHeight: 1.05,
                  marginBottom: 16,
                }}
              >
                Marathon <span className="gradient-text">Aimbot</span> Tools
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                  color: 'var(--text-secondary)',
                  maxWidth: 760,
                  lineHeight: 1.75,
                  marginBottom: 12,
                }}
              >
                Configurable aim assistance with hotkey toggle, visible-only targeting, bone selection, smoothing, FOV limits, recoil control, and an optional on-screen radius.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', marginBottom: 16 }}>
                <Link to="/blog/marathoncheats-aimbot" style={{ color: 'var(--accent-bright)', textDecoration: 'none' }}>
                  Read the Marathon aimbot guide →
                </Link>
                {' · '}
                <Link to="/marathoncheats-buy#faq" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Purchase FAQ
                </Link>
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <FeatureShowcase
              src={FEATURE_IMAGES.aimbot}
              alt="Marathon aimbot settings with FOV circle and bone selector"
              label="Aimbot"
            />
          </AnimatedSection>

          <AnimatedSection>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
                gap: 'clamp(12px, 1.8vw, 18px)',
              }}
            >
              {aimbotFeatures.map(feature => (
                <FeatureCard key={feature.name} {...feature} accentColor="var(--accent-bright)" />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section
        style={{
          background: 'var(--bg-deep)',
          padding: '0 0 clamp(80px, 10vw, 120px)',
          position: 'relative',
        }}
      >
        <div className="section-shell">
          <AnimatedSection>
            <div
              className="glass-card features-dma-panel"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)',
                gap: 'clamp(24px, 4vw, 40px)',
                alignItems: 'center',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--border-bright)',
                background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(124,58,237,0.04) 100%)',
              }}
            >
              <div style={{ position: 'relative', minHeight: 240, height: '100%' }}>
                <SeoImage
                  src={FEATURE_IMAGES.cloudDma}
                  fallbackAlt="Marathon Cheats cloud DMA setup option"
                  loading="lazy"
                  width={1280}
                  height={800}
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 240,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, rgba(6,4,9,0.15) 0%, rgba(6,4,9,0.55) 100%)',
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                />
              </div>

              <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
                <p className="section-label" style={{ marginBottom: 14 }}>
                  Cloud-DMA Option
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                    color: 'var(--text-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    lineHeight: 1.1,
                    marginBottom: 14,
                  }}
                >
                  Cloud-DMA <span className="gradient-text">Option</span>
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.75,
                    marginBottom: 24,
                    maxWidth: 520,
                  }}
                >
                  Need a hardware-separated setup? Ask about our Cloud-DMA option for Marathon Cheats — designed for players who want DMA-style separation with remote configuration support.
                </p>
                <Link to="/marathoncheats-buy" className="btn-primary" style={{ fontSize: '0.875rem' }}>
                  Ask About Cloud-DMA
                </Link>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div style={{ marginTop: 'clamp(32px, 5vw, 48px)' }}>
              <SeoImage
                src={FEATURE_IMAGES.showcase}
                fallbackAlt="Marathon Cheats character showcase"
                loading="lazy"
                width={1280}
                height={427}
                style={{
                  width: '100%',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-dim)',
                  display: 'block',
                  aspectRatio: '21 / 9',
                  objectFit: 'cover',
                }}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
