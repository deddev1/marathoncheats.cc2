import { useEffect, type CSSProperties } from 'react';
import {
  AIMBOT_BREADCRUMB,
  FEATURES_BREADCRUMB,
  buildBreadcrumbJsonLd,
  buildBreadcrumbUrl,
  getBreadcrumbScriptId,
  type BreadcrumbItem,
} from '../seo/breadcrumbSchema';

type SectionBreadcrumbProps = {
  items: readonly BreadcrumbItem[];
};

const visuallyHiddenStyle: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

function breadcrumbHref(path: string) {
  if (path.startsWith('/#')) return path.slice(1);
  if (path === '/') return '/';
  return path;
}

/**
 * Invisible breadcrumb markup for section anchors — JSON-LD + RDFa microdata.
 * No visual layout impact; improves crawl context for Features and Aimbot sections.
 */
export function SectionBreadcrumb({ items }: SectionBreadcrumbProps) {
  const jsonLd = buildBreadcrumbJsonLd(items);
  const scriptId = getBreadcrumbScriptId(items);

  useEffect(() => {
    if (document.getElementById(scriptId)) return undefined;

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.dataset.sectionBreadcrumb = 'true';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [jsonLd, scriptId]);

  return (
    <nav aria-label="Breadcrumb" style={visuallyHiddenStyle} typeof="BreadcrumbList">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.path}-${item.name}`} property="itemListElement" typeof="ListItem">
            <a property="item" typeof="WebPage" href={breadcrumbHref(item.path)}>
              <span property="name">{item.name}</span>
            </a>
            <meta property="position" content={String(index + 1)} />
            <link property="item" href={buildBreadcrumbUrl(item.path)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function FeaturesSectionBreadcrumb() {
  return <SectionBreadcrumb items={FEATURES_BREADCRUMB} />;
}

export function AimbotSectionBreadcrumb() {
  return <SectionBreadcrumb items={AIMBOT_BREADCRUMB} />;
}
