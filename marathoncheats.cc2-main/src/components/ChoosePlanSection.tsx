import { Link } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { PRE_PURCHASE_CHECKLIST } from '../content/licenseIncludes';
import { ZADEYO_CHECKOUT_URL, ZADEYO_MARATHON_GUIDE_URL } from '../content/checkout';

const CHECKOUT_URL = ZADEYO_CHECKOUT_URL;

const PLAN_STEPS = [
  {
    step: 'Step 1',
    title: 'Pick your priority',
    items: [
      {
        label: 'Map awareness',
        desc: 'ESP, player boxes, loot highlights, and distance reads for safer extractions.',
        href: '/blog/marathoncheats-esp',
        linkLabel: 'ESP guide',
      },
      {
        label: 'Combat help',
        desc: 'Aimbot smoothing, bone selector, FOV limits, and recoil control.',
        href: '/blog/marathoncheats-aimbot',
        linkLabel: 'Aimbot guide',
      },
      {
        label: 'HWID protection',
        desc: 'Understand hardware bans and how to transfer your license to a new PC.',
        href: '/blog/marathoncheats-hwid',
        linkLabel: 'HWID guide',
      },
      {
        label: 'Full setup guide',
        desc: 'Broader Marathon cheats overview, raid tips, and setup walkthrough.',
        href: ZADEYO_MARATHON_GUIDE_URL,
        external: true,
        linkLabel: 'Marathon cheats guide',
      },
    ],
  },
  {
    step: 'Step 2',
    title: 'Choose your plan',
    items: [
      {
        label: '$40 monthly or $150 lifetime',
        desc: 'Monthly gives 31 days of access. Lifetime includes unlimited access with every feature included.',
        highlight: true,
      },
      {
        label: 'One subscription',
        desc: 'No tiers or upsells — ESP, aimbot, loot ESP, recoil control, and loader updates are all included.',
      },
    ],
  },
  {
    step: 'Step 3',
    title: 'Buy and set up',
    items: [
      {
        label: 'Checkout on Zadeyo',
        desc: 'Complete purchase and get your loader link plus setup video on your order page instantly.',
        href: CHECKOUT_URL,
        external: true,
        linkLabel: 'Open checkout',
      },
      {
        label: 'Windows 10 & 11',
        desc: 'External loader for Steam. Turn off Core Isolation, launch Marathon, press OK in-match — under two minutes.',
      },
    ],
  },
] as const;

type PlanItem = {
  label: string;
  desc: string;
  href?: string;
  external?: boolean;
  linkLabel?: string;
  highlight?: boolean;
};

function PlanStepCard({
  step,
  title,
  items,
}: {
  step: string;
  title: string;
  items: readonly PlanItem[];
}) {
  return (
    <article className="plan-step-card">
      <p className="plan-step-card__step">{step}</p>
      <h3 className="plan-step-card__title">{title}</h3>
      <ul className="plan-step-card__list">
        {items.map(item => (
          <li key={item.label} className={`plan-step-card__item${item.highlight ? ' plan-step-card__item--highlight' : ''}`}>
            <p className="plan-step-card__item-label">{item.label}</p>
            <p className="plan-step-card__item-desc">
              {item.desc}
              {item.href && item.linkLabel ? (
                <>
                  {' '}
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="feature-preview-card__link">
                      {item.linkLabel} →
                    </a>
                  ) : (
                    <Link to={item.href} className="feature-preview-card__link">
                      {item.linkLabel} →
                    </Link>
                  )}
                </>
              ) : null}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ChoosePlanSection() {
  return (
    <section id="choose-plan" className="nav-anchor-target choose-plan-section" aria-labelledby="choose-plan-heading">
      <div className="section-shell">
        <AnimatedSection>
          <div className="premium-panel choose-plan-shell">
            <header className="choose-plan-header">
              <p className="section-label">Getting started</p>
              <h2 id="choose-plan-heading" className="display-heading choose-plan-header__title">
                How to choose your Marathon cheat plan
              </h2>
              <p className="choose-plan-header__lead">
                Pick what matters most for your raids, confirm the monthly plan fits your setup, then checkout on Zadeyo for instant loader access.
              </p>
            </header>

            <div className="choose-plan-grid">
              {PLAN_STEPS.map(card => (
                <PlanStepCard key={card.step} step={card.step} title={card.title} items={card.items} />
              ))}
            </div>

            <div className="choose-plan-checklist">
              <h3 className="choose-plan-checklist__title">Quick checklist before you buy</h3>
              <ul className="license-includes-list license-includes-list--compact">
                {PRE_PURCHASE_CHECKLIST.map(item => (
                  <li key={item} className="license-includes-list__item">
                    <span className="license-includes-list__dot" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="choose-plan-checklist__actions">
                <a
                  href={ZADEYO_CHECKOUT_URL}
                  className="btn-primary btn-buy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy Now
                </a>
                <Link to="/marathoncheats-buy" className="btn-ghost">
                  View pricing &amp; FAQ
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
