import { useState } from 'react';
import {
  DEFAULT_PRICING_PLAN,
  PRICING_META,
  PRICING_PLANS,
  type PricingPlanId,
} from '../content/pricingPlans';

type PricingSelectorProps = {
  showHeader?: boolean;
  className?: string;
};

export function PricingSelector({ showHeader = true, className = '' }: PricingSelectorProps) {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlanId>(DEFAULT_PRICING_PLAN);
  const plan = PRICING_PLANS[selectedPlan];

  return (
    <div className={`pricing-selector${className ? ` ${className}` : ''}`}>
      {showHeader ? (
        <header className="pricing-selector__header">
          <p className="section-label">Pricing</p>
          <h2 className="display-heading pricing-selector__title">Choose Your Duration</h2>
        </header>
      ) : null}

      <div className="pricing-selector__plans" role="radiogroup" aria-label="Choose your duration">
        {(Object.keys(PRICING_PLANS) as PricingPlanId[]).map(planId => {
          const option = PRICING_PLANS[planId];
          const selected = selectedPlan === planId;

          return (
            <button
              key={planId}
              type="button"
              className={`pricing-duration-card${selected ? ' pricing-duration-card--selected' : ''}`}
              onClick={() => setSelectedPlan(planId)}
              aria-pressed={selected}
              role="radio"
              aria-checked={selected}
            >
              <span className="pricing-duration-card__name">{option.name}</span>
              <span className="pricing-duration-card__desc">{option.description}</span>
              <span className="pricing-duration-card__price">{option.priceLabel}</span>
            </button>
          );
        })}
      </div>

      <a
        href={plan.checkoutUrl}
        className="btn-primary pricing-selector__buy btn-buy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Buy Now - {plan.priceLabel}
      </a>

      <div className="pricing-selector__meta" aria-label="Purchase details">
        {PRICING_META.map(item => (
          <div key={item.label} className="pricing-selector__meta-item">
            <span className="pricing-selector__meta-label">{item.label}</span>
            <span className="pricing-selector__meta-value">{item.value}</span>
          </div>
        ))}
        <div className="pricing-selector__meta-item">
          <span className="pricing-selector__meta-label">duration</span>
          <span className="pricing-selector__meta-value">{plan.durationLabel}</span>
        </div>
      </div>

      <p className="pricing-selector__secure">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Secure Payment
      </p>
    </div>
  );
}
