import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const MOBILE_MQ = '(max-width: 900px)';

function PixelAvatar({ seed, size = 52 }: { seed: number; size?: number }) {
  const palettes = [
    ['#e91e8c', '#ff6bbd', '#1a0010'],
    ['#00e5ff', '#0097a7', '#001a1f'],
    ['#76ff03', '#33691e', '#0d1a00'],
    ['#ff6d00', '#ffab40', '#1a0d00'],
    ['#7c4dff', '#b388ff', '#0d0020'],
    ['#f44336', '#ff8a80', '#1a0000'],
    ['#ffd600', '#fff176', '#1a1500'],
    ['#00bcd4', '#80deea', '#001a1f'],
    ['#ff4081', '#ff80ab', '#1a0010'],
    ['#64dd17', '#ccff90', '#0a1a00'],
  ];
  const [bg, fg, dark] = palettes[seed % palettes.length];
  const grid: boolean[][] = Array.from({ length: 8 }, (_, r) =>
    Array.from({ length: 8 }, (_, c) => {
      const mc = c < 4 ? c : 7 - c;
      return (((seed * 17 + r * 11 + mc * 5 + seed * r) ^ (r * mc + seed * 3 + 7)) % 19) > 8;
    })
  );
  const px = size / 10;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', flexShrink: 0, borderRadius: 10 }}>
      <rect width={size} height={size} fill={dark} rx="10" />
      {grid.map((row, r) => row.map((on, c) => {
        if (!on) return null;
        const x = (size - 8 * px) / 2 + c * px;
        const y = (size - 8 * px) / 2 + r * px;
        return <rect key={`${r}-${c}`} x={x} y={y} width={px} height={px} fill={(r + c) % 3 === 0 ? fg : bg} />;
      }))}
    </svg>
  );
}

const reviews = [
  { name: 'Sway', quote: 'Support solved my Marathon loader issue quick and easy. Fast response times every time — never had a hard time getting things fixed.', date: 'May 8, 2026' },
  { name: 'Joey Scalia', quote: 'Answered fast. Most reliable for answers and info on Marathon setup. Great experience overall.', date: 'May 8, 2026' },
  { name: 'Ash', quote: 'Had trouble with first launch so I opened a ticket. Support walked me through it and had it sorted in under five minutes. Cheat runs great in Marathon.', date: 'May 8, 2026' },
  { name: 'Adian Hipsz', quote: 'Fast to respond with solid solutions. They answered every question in detail and did not rush me off the line.', date: 'May 8, 2026' },
  { name: 'Tony WoW', quote: 'Patch dropped and something broke on my side — team pointed me to the right build and it was working again same day. Thanks.', date: 'May 8, 2026' },
  { name: 'taj taj', quote: 'Support and the dev updates are the real deal. Marathon cheat has been stable for me for weeks.', date: 'May 7, 2026' },
  { name: 'Alex Moreno', quote: 'Best support I have used for a game tool. They fixed my HWID question fast and explained what to do next time.', date: 'May 7, 2026' },
  { name: 'Fuzzy JD', quote: 'Very willing to help. Someone stayed with me for well over an hour until BattlEye and my overlay setup were sorted. Really appreciated.', date: 'May 7, 2026' },
  { name: 'CQB_Gamer', quote: 'Very good support — they took their time and stayed until my Marathon issue was fully solved. Would use again.', date: 'May 7, 2026' },
];

function StarRating() {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[0,1,2,3,4].map(i => (
        <svg key={i} width="15" height="15" viewBox="0 0 16 16" fill="#e91e8c">
          <path d="M8 1.5l1.76 3.53 3.9.57-2.83 2.75.67 3.88L8 10.27l-3.5 1.96.67-3.88-2.83-2.75 3.9-.57z"/>
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, idx }: { review: (typeof reviews)[number]; idx: number }) {
  return (
    <div className="why-us-feature-card review-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <PixelAvatar seed={idx} size={48} />
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '0.9375rem',
          color: '#ffffff',
          letterSpacing: '-0.01em',
          wordBreak: 'break-word',
        }}>{review.name}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9375rem', color: '#fff' }}>5.0</span>
        <StarRating />
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.875rem',
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 1.6,
        marginBottom: 10,
        wordBreak: 'break-word',
      }}>&ldquo;{review.quote}&rdquo;</p>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.28)',
      }}>{review.date}</p>
    </div>
  );
}

function ReviewsIntro() {
  return (
    <>
      <p className="section-label" style={{ marginBottom: 20 }}>Marathon Cheat Reviews</p>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: 'clamp(1.75rem, 6vw, 3.5rem)',
        letterSpacing: '-0.02em',
        lineHeight: 1.05,
        color: 'var(--text-primary)',
        textTransform: 'uppercase',
        marginBottom: 20,
      }}>
        What Marathon<br />
        <span className="gradient-text">Players Say</span>
      </h2>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.9375rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.75,
        maxWidth: 420,
        marginBottom: 28,
      }}>
        Marathon cheat reviews from Discord support and checkout — setup help, patch updates, and loader troubleshooting.
      </p>
    </>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progresses, setProgresses] = useState<number[]>(reviews.map(() => 0));
  const [stackOffset, setStackOffset] = useState(38);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_MQ).matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const fn = () => setIsMobile(mq.matches);
    fn();
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    function computeOffset() {
      const vh = window.innerHeight;
      const cardH = 200;
      const padding = 80;
      const available = vh - cardH - padding;
      const offset = Math.min(38, Math.max(26, Math.floor(available / (reviews.length - 1))));
      setStackOffset(offset);
    }
    computeOffset();
    window.addEventListener('resize', computeOffset);
    return () => window.removeEventListener('resize', computeOffset);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId: number;
    function raf(time: number) { lenis.raf(time); rafId = requestAnimationFrame(raf); }
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;
    function onScroll() {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const totalScrollable = section.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolledIn = Math.max(0, -rect.top);
      const sliceSize = totalScrollable / (reviews.length + 1);
      setProgresses(reviews.map((_, idx) => {
        const start = idx * sliceSize;
        return Math.min(1, Math.max(0, (scrolledIn - start) / sliceSize));
      }));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  const CARD_H = 190;
  const padX = {
    paddingLeft: 'max(var(--layout-gutter), env(safe-area-inset-left))',
    paddingRight: 'max(var(--layout-gutter), env(safe-area-inset-right))',
  } as const;

  if (isMobile) {
    return (
      <section
        id="reviews"
        className="nav-anchor-target"
        style={{
          background: 'var(--bg-deep)',
          position: 'relative',
          paddingTop: 'clamp(48px, 10vw, 72px)',
          paddingBottom: 'clamp(48px, 10vw, 72px)',
          ...padX,
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <ReviewsIntro />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {reviews.map((review, idx) => (
              <ReviewCard key={review.name} review={review} idx={idx} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <style>{`
        #reviews-right::-webkit-scrollbar { display: none; }
        #reviews-right { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <section
        ref={sectionRef}
        id="reviews"
        className="nav-anchor-target"
        style={{
          background: 'var(--bg-deep)',
          position: 'relative',
          minHeight: `${(reviews.length + 2) * 30}vh`,
        }}
      >
        <div style={{
          position: 'sticky',
          top: 0,
          height: 'min(100dvh, 100vh)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(24px, 4vw, 64px)',
          maxWidth: 'var(--layout-max)',
          margin: '0 auto',
          paddingTop: 0,
          paddingBottom: 0,
          ...padX,
          alignItems: 'stretch',
          overflow: 'clip',
        }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', minWidth: 0 }}>
            <ReviewsIntro />
          </div>

          <div
            id="reviews-right"
            style={{
              position: 'relative',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              minWidth: 0,
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              height: `${(reviews.length - 1) * stackOffset + CARD_H}px`,
              flexShrink: 0,
            }}>
              {reviews.map((review, idx) => {
                const progress = progresses[idx];
                const translateY = (1 - progress) * 160;
                const opacity = Math.min(1, progress * 3);
                const stackTop = idx * stackOffset;

                return (
                  <div
                    key={review.name}
                    style={{
                      position: 'absolute',
                      top: stackTop,
                      left: 0,
                      right: 0,
                      transform: `translateY(${translateY}px)`,
                      opacity,
                      zIndex: idx + 1,
                      willChange: 'transform, opacity',
                    }}
                  >
                    <ReviewCard review={review} idx={idx} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
