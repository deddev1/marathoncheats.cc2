import { Link } from 'react-router-dom';
import { NOT_FOUND_HEADING } from '../seo/pageHeadings';

export function NotFoundPage() {
  return (
    <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 20,
          padding: '0 20px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: 'var(--text-primary)',
            margin: 0,
          }}
        >
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '1.1rem', maxWidth: 480 }}>
          {NOT_FOUND_HEADING.intro}
        </p>
        <nav aria-label="Helpful links" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" className="btn-primary" style={{ fontSize: '0.875rem' }}>
            Back to Home
          </Link>
          <Link to="/marathoncheats-buy" className="btn-ghost" style={{ fontSize: '0.875rem' }}>
            View Pricing
          </Link>
          <Link to="/blog" className="btn-ghost" style={{ fontSize: '0.875rem' }}>
            Read Guides
          </Link>
        </nav>
      </div>
  );
}
