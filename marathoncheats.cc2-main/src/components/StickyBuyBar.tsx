import { useEffect, useState } from 'react';
import { ZADEYO_CHECKOUT_URL } from '../content/checkout';

export function StickyBuyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="sticky-buy-bar" data-visible={visible ? 'true' : 'false'} aria-hidden={!visible}>
      <a
        href={ZADEYO_CHECKOUT_URL}
        className="sticky-buy-bar__button btn-buy"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Buy Now</span>
        <span className="sticky-buy-bar__price">from $40/mo</span>
      </a>
    </div>
  );
}
