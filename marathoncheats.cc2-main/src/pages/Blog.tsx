import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import { NotFoundPage } from './NotFound';
import { SeoImage } from '../components/SeoImage';
import { BLOG_LIST_HEADING } from '../seo/pageHeadings';
import { BLOG_POSTS, type BlogPost } from '../content/blogPosts';

const CATEGORIES = ['All', 'ESP', 'Aimbot', 'Spoofer', 'Guides'];

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <article
        className="feature-card glass-card"
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: featured ? '16/7' : '16/9' }}>
          <SeoImage
            src={post.image}
            fallbackAlt={post.title}
            loading="lazy"
            width={featured ? 1280 : 720}
            height={featured ? 560 : 405}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(.25,.1,.25,1)',
              display: 'block',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)')}
            onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(6,4,9,0.85) 0%, rgba(6,4,9,0.1) 60%, transparent 100%)',
          }} />
          <span style={{
            position: 'absolute',
            top: 14,
            left: 14,
            background: 'var(--accent)',
            color: '#fff',
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
          }}>
            {post.category}
          </span>
        </div>
        <div style={{ padding: featured ? '28px 32px 32px' : '22px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.date}</span>
            <span style={{ color: 'var(--border-bright)', fontSize: '0.6rem' }} aria-hidden="true">●</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.readTime}</span>
          </div>
          {/* h3 — correct hierarchy under the page h1 "Marathon Cheat Blog" */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: featured ? 'clamp(1.4rem, 2.5vw, 1.9rem)' : 'clamp(1.1rem, 1.8vw, 1.35rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            {post.title}
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            margin: 0,
            flex: 1,
          }}>
            {post.excerpt}
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 8,
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--accent-bright)',
            letterSpacing: '0.02em',
          }}>
            Read Article
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <div style={{
        position: 'relative',
        paddingTop: 'clamp(100px, 14vw, 160px)',
        paddingBottom: 'clamp(40px, 6vw, 80px)',
        paddingLeft: 'clamp(20px, 6vw, 80px)',
        paddingRight: 'clamp(20px, 6vw, 80px)',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 300,
          background: 'radial-gradient(ellipse, rgba(168,85,247,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} aria-hidden="true" />
        <AnimatedSection>
          <p className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>Setup &amp; Compatibility Guides</p>
          {/* Single H1 on this page */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            lineHeight: 1,
            margin: '0 auto 16px',
          }}>
            {BLOG_LIST_HEADING.h1}
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)',
            color: 'var(--text-secondary)',
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            {BLOG_LIST_HEADING.intro}
          </p>
        </AnimatedSection>
      </div>

      <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 'clamp(32px, 5vw, 56px)',
        paddingLeft: 'clamp(20px, 6vw, 80px)',
        paddingRight: 'clamp(20px, 6vw, 80px)',
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '8px 18px',
              borderRadius: 'var(--radius-md)',
              border: activeCategory === cat ? '1px solid var(--accent)' : '1px solid var(--border-dim)',
              background: activeCategory === cat ? 'var(--accent-dim)' : 'transparent',
              color: activeCategory === cat ? 'var(--accent-bright)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={e => {
              if (activeCategory !== cat) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-bright)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
              }
            }}
            onMouseLeave={e => {
              if (activeCategory !== cat) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-dim)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(20px, 6vw, 80px) clamp(80px, 10vw, 140px)',
      }}>
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '80px 0' }}>No posts in this category yet.</p>
        ) : (
          <>
            {featured && (
              <AnimatedSection>
                <div style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
                  <BlogCard post={featured} featured />
                </div>
              </AnimatedSection>
            )}
            {rest.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
                gap: 'clamp(20px, 3vw, 32px)',
              }}>
                {rest.map((post) => (
                  <AnimatedSection key={post.slug}>
                    <BlogCard post={post} />
                  </AnimatedSection>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(20px, 6vw, 80px) clamp(80px, 10vw, 140px)',
      }}>
        <AnimatedSection>
          <nav aria-label="Related pages" style={{ paddingTop: 8 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 16,
            }}>
              More on Marathon Cheats
            </h2>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 24px',
            }}>
              <li><Link to="/" className="hero-section__guides-link" style={{ marginBottom: 0 }}>Homepage</Link></li>
              <li><Link to="/marathoncheats-buy" className="hero-section__guides-link" style={{ marginBottom: 0 }}>Pricing &amp; features</Link></li>
              <li><Link to="/blog/marathoncheats-esp" className="hero-section__guides-link" style={{ marginBottom: 0 }}>ESP guide</Link></li>
              <li><Link to="/blog/marathoncheats-aimbot" className="hero-section__guides-link" style={{ marginBottom: 0 }}>Aimbot guide</Link></li>
              <li><Link to="/blog/marathoncheats-hwid" className="hero-section__guides-link" style={{ marginBottom: 0 }}>HWID guide</Link></li>
            </ul>
          </nav>
        </AnimatedSection>
      </div>
    </div>
  );
}

function renderBody(body: string) {
  const lines = body.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let tableRows: string[] = [];
  let inTable = false;

  const flushTable = () => {
    if (tableRows.length < 2) { tableRows = []; inTable = false; return; }
    const [header, , ...rows] = tableRows;
    elements.push(
      <div key={`table-${i}`} style={{ overflowX: 'auto', margin: '24px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              {header.split('|').filter(Boolean).map((h, j) => (
                <th key={j} style={{
                  padding: '10px 16px',
                  textAlign: 'left',
                  color: 'var(--accent-bright)',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  borderBottom: '1px solid var(--border-dim)',
                  whiteSpace: 'nowrap',
                }}>{h.trim()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: '1px solid var(--border-ghost)' }}>
                {row.split('|').filter(Boolean).map((cell, ci) => (
                  <td key={ci} style={{
                    padding: '10px 16px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}>{cell.trim()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    inTable = false;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('|')) {
      inTable = true;
      tableRows.push(line);
      i++;
      continue;
    }

    if (inTable) flushTable();

    if (!line.trim()) { i++; continue; }

    if (line.startsWith('## ')) {
      /* h2 — correct under the article h1 */
      elements.push(
        <h2 key={i} style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          marginTop: 40,
          marginBottom: 12,
          paddingTop: 8,
          borderTop: '1px solid var(--border-ghost)',
        }}>{line.replace('## ', '')}</h2>
      );
    } else if (line.startsWith('### ')) {
      /* h3 — correct under h2 */
      elements.push(
        <h3 key={i} style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
          color: 'var(--accent-bright)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginTop: 28,
          marginBottom: 8,
        }}>{line.replace('### ', '')}</h3>
      );
    } else if (line.startsWith('- **')) {
      const match = line.match(/^- \*\*(.+?)\*\*:(.*)/);
      if (match) {
        elements.push(
          <li key={i} style={{
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            marginLeft: 20,
            marginBottom: 6,
          }}>
            <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{match[1]}</strong>:{match[2]}
          </li>
        );
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          marginLeft: 20,
          marginBottom: 6,
        }}>{line.replace(/^- /, '')}</li>
      );
    } else if (/^\d+\./.test(line)) {
      elements.push(
        <li key={i} style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          marginLeft: 24,
          marginBottom: 6,
          listStyleType: 'decimal',
        }}>{line.replace(/^\d+\.\s/, '')}</li>
      );
    } else {
      const parts = line.split(/(\*\*.+?\*\*)/g);
      elements.push(
        <p key={i} style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
          lineHeight: 1.75,
          margin: '0 0 14px',
        }}>
          {parts.map((part, pi) =>
            part.startsWith('**') ? (
              <strong key={pi} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                {part.replace(/\*\*/g, '')}
              </strong>
            ) : part
          )}
        </p>
      );
    }
    i++;
  }

  if (inTable) flushTable();
  return elements;
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <NotFoundPage />;
  }

  const related = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <article style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      {/* Hero image */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '21/7', overflow: 'hidden', maxHeight: 480 }}>
        <SeoImage
          src={post.image}
          fallbackAlt={post.title}
          loading="eager"
          width={1280}
          height={427}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(6,4,9,0.2) 0%, rgba(6,4,9,0.7) 70%, var(--bg-void) 100%)',
        }} />
        <span style={{
          position: 'absolute',
          bottom: 32,
          left: 'clamp(20px, 6vw, 80px)',
          background: 'var(--accent)',
          color: '#fff',
          fontFamily: 'var(--font-body)',
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '5px 12px',
          borderRadius: 'var(--radius-sm)',
        }}>
          {post.category}
        </span>
      </div>

      {/* Article content */}
      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: 'clamp(32px, 5vw, 64px) clamp(20px, 6vw, 80px) clamp(64px, 10vw, 120px)',
      }}>
        <Link
          to="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            marginBottom: 28,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Blog
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{post.date}</span>
          <span style={{ color: 'var(--border-bright)', fontSize: '0.5rem' }} aria-hidden="true">●</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{post.readTime}</span>
        </div>

        {/* Single H1 for this page */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          lineHeight: 1.15,
          marginBottom: 24,
        }}>
          {post.title}
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.05rem',
          color: 'var(--accent-bright)',
          lineHeight: 1.7,
          marginBottom: 36,
          paddingBottom: 32,
          borderBottom: '1px solid var(--border-dim)',
        }}>
          <strong>{post.title}.</strong> {post.excerpt}
        </p>

        <div>{renderBody(post.body)}</div>

        {/* Internal CTA linking to /marathoncheats-buy */}
        <div style={{
          marginTop: 56,
          padding: '32px 36px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(124,58,237,0.06) 100%)',
          border: '1px solid var(--border-bright)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
              Compare Marathon Cheat Pricing
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Full ESP, aimbot, loot ESP, and loader download — from $40/month on the official buy page.
            </p>
          </div>
          <Link
            to="/marathoncheats-buy"
            className="btn-primary"
            style={{ flexShrink: 0 }}
          >
            View Pricing &amp; Features
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(20px, 6vw, 80px) clamp(80px, 10vw, 140px)',
        }}>
          <AnimatedSection>
            <p className="section-label" style={{ marginBottom: 24 }}>Related Articles</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
              gap: 28,
            }}>
              {related.map(p => <BlogCard key={p.slug} post={p} />)}
            </div>
          </AnimatedSection>
        </div>
      )}
    </article>
  );
}
