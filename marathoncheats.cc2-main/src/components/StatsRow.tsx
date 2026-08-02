import { useEffect, useRef, useState } from 'react';
import { AnimatedSection } from './AnimatedSection';

interface Stat {
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  sublabel?: string;
}

const STATS: Stat[] = [
  { prefix: '', value: 99, suffix: '.9%', decimals: 0, label: 'Undetection Rate', sublabel: 'Continuously tested' },
  { prefix: '', value: 24, suffix: '/7', decimals: 0, label: 'Support Available', sublabel: 'Discord response' },
  { prefix: '<', value: 1, suffix: ' min', decimals: 0, label: 'Setup Time', sublabel: 'With video guide' },
  { prefix: '', value: 4.9, suffix: '/5', decimals: 1, label: 'Customer Rating', sublabel: 'Verified buyers' },
];

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function CountUp({ value, suffix, prefix, decimals }: Stat) {
  const [display, setDisplay] = useState('0');
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const duration = 1600;

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = eased * value;
      setDisplay(decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toString());
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, decimals]);

  return <>{prefix}{display}{suffix}</>;
}

export function StatsRow() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatedSection>
      <div ref={ref} style={{
        padding: `0 max(16px, env(safe-area-inset-right), 4vw) 0 max(16px, env(safe-area-inset-left), 4vw)`,
        maxWidth: 1280,
        margin: '0 auto',
      }}
      >
        <div className="glass-card stats-row-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Subtle top accent line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            opacity: 0.4,
          }} aria-hidden="true" />

          {STATS.map((stat, i) => (
            <div key={stat.label} style={{
              padding: 'clamp(24px, 4vw, 40px) clamp(16px, 2vw, 28px)',
              textAlign: 'center',
              borderRight: i < STATS.length - 1 ? '1px solid var(--border-ghost)' : 'none',
              position: 'relative',
            }}>
              {/* Stat number */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '6px',
                background: 'linear-gradient(135deg, var(--accent-bright) 0%, var(--accent) 60%, var(--accent-deep) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                {visible ? <CountUp {...stat} /> : `0${stat.suffix}`}
              </div>

              {/* Label */}
              <div style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '3px',
              }}>{stat.label}</div>

              {/* Sublabel */}
              {stat.sublabel && (
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6875rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.04em',
                }}>{stat.sublabel}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
