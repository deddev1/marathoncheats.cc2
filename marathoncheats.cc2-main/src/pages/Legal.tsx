import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import { ZADEYO_CHECKOUT_URL } from '../content/checkout';
import { LEGAL_PAGE_HEADINGS } from '../seo/pageHeadings';

type LegalPageKey = 'terms' | 'privacy' | 'refund';

const LEGAL_CONTENT: Record<
  LegalPageKey,
  { title: string; sections: { heading: string; body: string }[] }
> = {
  terms: {
    title: 'Terms of Service',
    sections: [
      {
        heading: 'Service',
        body:
          'Marathon Cheats provides information, setup guidance, and support for external Marathon game software sold through our authorized checkout partner. By using marathoncheats.cc you agree to these terms.',
      },
      {
        heading: 'Eligibility',
        body:
          'You must be of legal age in your jurisdiction to purchase software subscriptions. You are responsible for compliance with the game publisher terms and local laws.',
      },
      {
        heading: 'Subscriptions',
        body:
          'Marathon Cheats access is sold as a monthly subscription (currently $40/month unless stated otherwise on the purchase page). Billing and delivery are handled at checkout. Access details are provided after payment.',
      },
      {
        heading: 'No affiliation',
        body:
          'Marathon Cheats is not affiliated with Bungie, Inc., Sony, or the Marathon game. All trademarks belong to their respective owners.',
      },
      {
        heading: 'Limitation of liability',
        body:
          'Software use may carry account or hardware risks. Marathon Cheats is provided as-is. We do not guarantee uninterrupted access, specific game outcomes, or compatibility with every system configuration.',
      },
      {
        heading: 'Contact',
        body:
          'Questions about these terms: support@marathoncheats.cc',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'What we collect',
        body:
          'We may collect basic analytics data (pages visited, device type, referral source) through standard website analytics tools, and information you send us by email or Discord support.',
      },
      {
        heading: 'How we use data',
        body:
          'Data is used to operate marathoncheats.cc, respond to support requests, improve site performance, and measure marketing effectiveness. We do not sell personal information.',
      },
      {
        heading: 'Third parties',
        body:
          'Checkout, hosting, analytics, and Discord are provided by third-party services with their own privacy policies. Payment information is processed by the checkout provider, not stored on this site.',
      },
      {
        heading: 'Cookies',
        body:
          'We use cookies and similar technologies for analytics and basic site functionality. You can control cookies through your browser settings.',
      },
      {
        heading: 'Contact',
        body:
          'Privacy questions: support@marathoncheats.cc',
      },
    ],
  },
  refund: {
    title: 'Refund Policy',
    sections: [
      {
        heading: 'Digital delivery',
        body:
          'Marathon Cheats is a digital subscription product. After checkout you receive loader access and setup instructions. Because access is delivered digitally, refunds are limited.',
      },
      {
        heading: 'Eligible refunds',
        body:
          'Contact support@marathoncheats.cc within 24 hours of purchase if you did not receive access, received a defective loader, or were charged incorrectly. Include your order reference from checkout.',
      },
      {
        heading: 'Non-refundable cases',
        body:
          'We generally cannot refund subscriptions after successful delivery and activation, account bans, compatibility issues caused by unsupported system configurations, or purchases made in error after access was used.',
      },
      {
        heading: 'Chargebacks',
        body:
          'Unauthorized chargebacks may result in access revocation. Contact support first so we can resolve billing issues directly.',
      },
      {
        heading: 'Contact',
        body:
          'Refund requests: support@marathoncheats.cc',
      },
    ],
  },
};

export function TermsPage() {
  return <LegalDocument page="terms" />;
}

export function PrivacyPage() {
  return <LegalDocument page="privacy" />;
}

export function RefundPage() {
  return <LegalDocument page="refund" />;
}

function LegalDocument({ page }: { page: LegalPageKey }) {
  const content = LEGAL_CONTENT[page];

  return (
    <>
      <div
        style={{
          background: 'var(--bg-base)',
          padding: 'clamp(96px, 14vw, 140px) max(16px, env(safe-area-inset-right), 4vw) clamp(80px, 10vw, 120px) max(16px, env(safe-area-inset-left), 4vw)',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <AnimatedSection>
            <p className="section-label" style={{ marginBottom: 16 }}>
              Marathon Cheats
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                marginBottom: 12,
              }}
            >
              {LEGAL_PAGE_HEADINGS[page].h1}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                marginBottom: 16,
                lineHeight: 1.7,
              }}
            >
              {LEGAL_PAGE_HEADINGS[page].intro}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                marginBottom: 36,
              }}
            >
              Last updated: July 21, 2026 ·{' '}
              <Link to="/" style={{ color: 'var(--accent-bright)' }}>
                marathoncheats.cc
              </Link>
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {content.sections.map(section => (
                <section key={section.heading}>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1.125rem',
                      color: 'var(--text-primary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: 10,
                    }}
                  >
                    {section.heading}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a
                href={ZADEYO_CHECKOUT_URL}
                className="btn-primary"
                style={{ fontSize: '0.875rem' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Now
              </a>
              <Link to="/blog" className="btn-ghost" style={{ fontSize: '0.875rem' }}>
                Read guides
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <nav
              aria-label="Related pages"
              style={{
                marginTop: 48,
                paddingTop: 28,
                borderTop: '1px solid var(--border-dim)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 16,
                }}
              >
                Related pages
              </h2>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <li>
                  <Link to="/" className="hero-section__guides-link" style={{ marginBottom: 0 }}>
                    Marathon Cheats homepage
                  </Link>
                </li>
                <li>
                  <Link to="/marathoncheats-buy" className="hero-section__guides-link" style={{ marginBottom: 0 }}>
                    Marathon cheat pricing &amp; features
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hero-section__guides-link" style={{ marginBottom: 0 }}>
                    ESP, aimbot &amp; HWID guides
                  </Link>
                </li>
                {page !== 'terms' ? (
                  <li>
                    <Link to="/terms" className="hero-section__guides-link" style={{ marginBottom: 0 }}>
                      Terms of service
                    </Link>
                  </li>
                ) : null}
                {page !== 'privacy' ? (
                  <li>
                    <Link to="/privacy" className="hero-section__guides-link" style={{ marginBottom: 0 }}>
                      Privacy policy
                    </Link>
                  </li>
                ) : null}
                {page !== 'refund' ? (
                  <li>
                    <Link to="/refund" className="hero-section__guides-link" style={{ marginBottom: 0 }}>
                      Refund policy
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
