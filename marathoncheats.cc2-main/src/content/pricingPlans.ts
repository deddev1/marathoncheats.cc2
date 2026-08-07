import { CHECKOUT_URL } from './checkout';

export type PricingPlanId = 'monthly' | 'lifetime';

export type PricingPlan = {
  id: PricingPlanId;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  durationLabel: string;
  checkoutUrl: string;
};

export const PRICING_PLANS: Record<PricingPlanId, PricingPlan> = {
  monthly: {
    id: 'monthly',
    name: 'Monthly',
    description: '31 days of access',
    price: 40,
    priceLabel: '$40',
    durationLabel: '31 days',
    checkoutUrl: CHECKOUT_URL,
  },
  lifetime: {
    id: 'lifetime',
    name: 'Lifetime',
    description: 'Unlimited access',
    price: 150,
    priceLabel: '$150',
    durationLabel: 'Lifetime',
    checkoutUrl: CHECKOUT_URL,
  },
};

export const DEFAULT_PRICING_PLAN: PricingPlanId = 'lifetime';

export const PRICING_META = [
  { label: 'delivery', value: 'instant' },
  { label: 'support', value: '24/7' },
] as const;
