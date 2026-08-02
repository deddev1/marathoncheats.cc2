import { useState } from 'react';

type FaqItemProps = {
  q: string;
  a: string;
  defaultOpen?: boolean;
};

export function FaqItem({ q, a, defaultOpen = false }: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button
        type="button"
        className="faq-item__trigger"
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
      >
        <span className="faq-item__question">{q}</span>
        <span className="faq-item__icon" aria-hidden>+</span>
      </button>
      <div className="faq-item__panel" style={{ maxHeight: open ? '500px' : '0' }}>
        <p className="faq-item__answer">{a}</p>
      </div>
    </div>
  );
}
