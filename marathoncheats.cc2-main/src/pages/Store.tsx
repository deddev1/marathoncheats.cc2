import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import { FeatureShowcaseGallery } from '../components/FeatureShowcaseGallery';
import { PricingSelector } from '../components/PricingSelector';
import { StoreFaqSection } from '../components/StoreFaqSection';
import { SystemRequirementsList } from '../components/SystemRequirementsList';
import { STORE_PAGE_HEADING } from '../seo/pageHeadings';
import { STORE_FAQS } from '../content/faqs';

const checklist = [
  { label: '2D Box', desc: 'outline boxes around players and hostiles' },
  { label: 'Skeleton Lines', desc: 'bone-structure highlights for target reads' },
  { label: 'Loot ESP', desc: 'highlights valuable pickups in range' },
  { label: 'Distance ESP', desc: 'range to nearby contacts' },
  { label: 'Info Color', desc: 'customize ESP colors to your preference' },
  { label: 'Player Range', desc: 'max distance for player and AI ESP' },
  { label: 'Loot Range', desc: 'control how far pickups appear on ESP' },
  { label: 'Player Alert', desc: 'notified when enemies enter your vicinity' },
  { label: 'Show Ore & Plants', desc: 'mark resource nodes for farming' },
  { label: 'Show Chests & Objects', desc: 'identify containers and objects instantly' },
  { label: 'Aimbot Key', desc: 'hotkey to toggle aimbot' },
  { label: 'Visible Check', desc: 'aimbot only engages visible targets' },
  { label: 'Bone Selector', desc: 'head, chest, or neck aim point' },
  { label: 'Aimbot Smoothing', desc: 'tune aim movement for natural tracking' },
  { label: 'Aimbot FOV', desc: 'set the active aimbot radius' },
  { label: 'Recoil Control', desc: 'reduces weapon recoil while firing' },
  { label: 'FOV Circle', desc: 'optional on-screen aimbot radius' },
  { label: 'Cloud-DMA Option', desc: 'hardware-separated setup available' },
  { label: 'Auto-updated loader', desc: 'from your Zadeyo order page' },
  { label: 'Discord community + 24/7 support', desc: 'always online' },
];

function CheckIcon() {
  return (
    <span
      aria-hidden
      style={{
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: 'rgba(168, 85, 247, 0.12)',
        border: '1px solid rgba(168, 85, 247, 0.28)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: 2,
      }}
    >
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
        <polyline points="2,5.5 4,7.5 8,3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function StorePage() {
  return (
    <>
      <div className="section-shell" style={{ paddingTop: 16, paddingBottom: 0 }}>
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
          }}
        >
          <Link to="/" className="hero-section__guides-link" style={{ marginBottom: 0 }}>
            Home
          </Link>
          <span aria-hidden="true">›</span>
          <span style={{ color: 'var(--text-secondary)' }}>Buy Marathon Cheats</span>
          <span style={{ marginLeft: 'auto' }}>
            <Link to="/blog" className="hero-section__guides-link" style={{ marginBottom: 0 }}>
              Read guides →
            </Link>
          </span>
        </nav>
      </div>

      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg-void)',
          padding: 'clamp(72px, 10vw, 110px) 0 clamp(48px, 6vw, 72px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 800,
            height: 400,
            background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.14) 0%, transparent 70%)',
            filter: 'blur(70px)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        <div className="section-shell" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 4vw, 48px)' }}>
              <p className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>
                Marathon Cheats
              </p>
              <h1 className="display-heading" style={{ fontSize: 'clamp(2rem, 6vw, 4.2rem)', marginBottom: 14 }}>
                {STORE_PAGE_HEADING.h1}
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                  color: 'var(--text-secondary)',
                  maxWidth: 640,
                  margin: '0 auto',
                  lineHeight: 1.65,
                }}
              >
                {STORE_PAGE_HEADING.intro}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="premium-panel store-product-shell">
              <div className="store-product-grid">
                <div className="store-product-gallery">
                  <FeatureShowcaseGallery />
                </div>

                <div className="store-product-info">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    <span className="status-badge">Marathon</span>
                    <span className="status-badge">Digital delivery</span>
                    <span className="status-badge status-badge--active">
                      <span className="status-badge__dot" aria-hidden />
                      Active
                    </span>
                  </div>

                  <h2 className="store-product-title">
                    Marathon Cheats — Aimbot, ESP &amp; Wallhack
                  </h2>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    One subscription covers every feature — ESP, aimbot, loot highlights, recoil control, and loader updates after patches.
                  </p>

                  <PricingSelector showHeader={false} />

                  <div className="glass-card" style={{ borderRadius: 'var(--radius-lg)', padding: '18px 20px' }}>
                    <SystemRequirementsList compact />
                  </div>

                  <div className="glass-card" style={{ borderRadius: 'var(--radius-lg)', padding: '16px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                        <path d="M9 1 L16 4 L16 9 C16 13 9 17 9 17 C9 17 2 13 2 9 L2 4 Z" />
                        <polyline points="6,9 8,11 12,7" />
                      </svg>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                        Keep your cheat updated after every game patch. Use a HWID Spoofer to protect against hardware bans. Play responsibly to avoid manual reports.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section style={{ background: 'var(--bg-base)', padding: 'clamp(64px, 8vw, 96px) 0' }}>
        <div className="section-shell">
          <AnimatedSection>
            <div className="premium-panel" style={{ padding: 'clamp(28px, 4vw, 40px)' }}>
              <h2 className="display-heading" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: 8 }}>
                Everything included.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                One subscription covers every feature — no upsells, no tiers.
              </p>

              <div className="store-checklist-grid">
                {checklist.map(item => (
                  <div key={item.label} className="store-checklist-item">
                    <CheckIcon />
                    <span>
                      <strong>{item.label}</strong>
                      {item.desc ? <span style={{ color: 'var(--text-muted)' }}> — {item.desc}</span> : null}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <StoreFaqSection faqs={STORE_FAQS} />
    </>
  );
}
