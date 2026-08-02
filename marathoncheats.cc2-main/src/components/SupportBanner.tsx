import { AnimatedSection } from './AnimatedSection';

import { ZADEYO_SUPPORT_URL } from '../content/support';

const SUPPORT_URL = ZADEYO_SUPPORT_URL;

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path
        d="M12 2l1.2 4.2L17 7l-3.8 1.8L12 13l-1.2-4.2L7 7l3.8-1.8L12 2z"
        fill="var(--accent-bright)"
        opacity={0.95}
      />
      <path
        d="M18 14l.7 2.4L21 17l-2.3 1.1L18 20.5l-.7-2.4L15 17l2.3-1.1L18 14z"
        fill="var(--accent)"
        opacity={0.75}
      />
    </svg>
  );
}

/** Official Discord mark (same path as Navbar) — blurple on light CTA */
function DiscordIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#5865F2" aria-hidden>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

export function SupportBanner() {
  return (
    <section
      id="support"
      className="nav-anchor-target"
      aria-labelledby="support-heading"
      style={{
        background: 'var(--bg-deep)',
        padding: 'clamp(40px, 5vw, 64px) 0 clamp(72px, 9vw, 120px)',
      }}
    >
      <style>{`
        @keyframes support-edge-pulse {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px rgba(192,132,252,0.45)); }
          50% { opacity: 0.82; filter: drop-shadow(0 0 22px rgba(192,132,252,0.75)); }
        }
        @keyframes support-corner-breathe {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.06); }
        }
        .support-banner-card {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-2xl);
          background: linear-gradient(145deg, rgba(22, 18, 32, 0.98) 0%, #0a0812 55%, #08060e 100%);
          border: 1px solid var(--border-ghost);
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
        }
        .support-banner-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10%;
          bottom: 10%;
          width: 3px;
          border-radius: 0 4px 4px 0;
          background: linear-gradient(180deg, var(--accent-bright), var(--accent), var(--accent-deep));
          animation: support-edge-pulse 4.5s ease-in-out infinite;
          pointer-events: none;
        }
        .support-banner-glow {
          position: absolute;
          top: -48px;
          left: -32px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, transparent 68%);
          filter: blur(18px);
          pointer-events: none;
          animation: support-corner-breathe 5.5s ease-in-out infinite;
        }
        .support-banner-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: clamp(28px, 4vw, 48px);
          align-items: center;
          padding: clamp(28px, 4vw, 44px) clamp(24px, 4vw, 48px) clamp(28px, 4vw, 44px) clamp(28px, 5vw, 52px);
        }
        .support-banner-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--text-secondary);
          margin-bottom: 14px;
        }
        .support-banner-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
        }
        .support-banner-btn-discord svg {
          flex-shrink: 0;
          display: block;
        }
        .support-banner-btn-discord {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px 28px;
          border-radius: var(--radius-md);
          background: #f5f2ff;
          color: #0a0a0c;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.01em;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        .support-banner-btn-discord:hover {
          transform: translateY(-1px);
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.24);
        }
        .support-banner-btn-discord:active {
          transform: translateY(0) scale(0.99);
        }
        .support-banner-desc {
          margin: 0;
        }
        .support-banner-heading {
          margin: 0 0 14px 0;
        }
        @media (max-width: 720px) {
          .support-banner-inner {
            grid-template-columns: 1fr;
            text-align: center;
            padding-left: clamp(20px, 5vw, 32px);
            padding-right: clamp(20px, 5vw, 32px);
          }
          .support-banner-kicker {
            justify-content: center;
          }
          .support-banner-desc {
            margin-left: auto;
            margin-right: auto;
          }
          .support-banner-heading {
            margin-left: auto;
            margin-right: auto;
          }
          .support-banner-actions {
            justify-content: center;
            width: 100%;
          }
          .support-banner-btn-discord {
            width: 100%;
            max-width: min(100%, 320px);
          }
        }
      `}</style>

      <div className="section-shell">
        <AnimatedSection>
          <div className="support-banner-card">
            <div className="support-banner-glow" aria-hidden />
            <div className="support-banner-inner">
              <div>
                <p className="support-banner-kicker">
                  <SparkleIcon />
                  Need help or have questions?
                </p>
                <h2
                  id="support-heading"
                  className="support-banner-heading"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.35rem, 3.2vw, 2rem)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                    color: 'var(--text-primary)',
                    maxWidth: '34ch',
                  }}
                >
                  Talk to our support team — fast, friendly, and always online.
                </h2>
                <p
                  className="support-banner-desc"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    maxWidth: '48ch',
                  }}
                >
                  Whether it&apos;s about your order, payments, or anything else — we&apos;re here to help you
                  instantly.
                </p>
              </div>
              <div className="support-banner-actions">
                <a
                  className="support-banner-btn-discord"
                  href={SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DiscordIcon />
                  Support
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
