import { useState } from 'react';
import { SITE_IMAGES } from '../content/siteImages';
import { getImageSeoByPath } from '../content/imageSeo';
import {
  getSiteVideo,
  getVideoThumbnailPath,
  type SiteVideoSlug,
} from '../content/videos';
import { VideoPlayer } from './VideoPlayer';
import { SeoImage } from './SeoImage';

type GalleryItem =
  | {
      id: string;
      label: string;
      type: 'video';
      videoSlug: SiteVideoSlug;
    }
  | {
      id: string;
      label: string;
      type: 'image';
      src: string;
      alt: string;
    };

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'video',
    label: 'Video',
    type: 'video',
    videoSlug: 'marathon-feature-demo',
  },
  {
    id: 'esp',
    label: 'ESP',
    type: 'image',
    src: SITE_IMAGES.esp,
    alt: getImageSeoByPath(SITE_IMAGES.esp)!.alt,
  },
  {
    id: 'aimbot',
    label: 'Aimbot',
    type: 'image',
    src: SITE_IMAGES.aimbot,
    alt: getImageSeoByPath(SITE_IMAGES.aimbot)!.alt,
  },
  {
    id: 'radar',
    label: 'Radar',
    type: 'image',
    src: SITE_IMAGES.radar,
    alt: getImageSeoByPath(SITE_IMAGES.radar)!.alt,
  },
  {
    id: 'wallhack',
    label: 'Wallhack',
    type: 'image',
    src: SITE_IMAGES.guide,
    alt: getImageSeoByPath(SITE_IMAGES.guide)!.alt,
  },
  {
    id: 'loot-esp',
    label: 'Loot ESP',
    type: 'image',
    src: SITE_IMAGES.loot,
    alt: getImageSeoByPath(SITE_IMAGES.loot)!.alt,
  },
];

function ThumbnailButton({
  item,
  active,
  onSelect,
}: {
  item: GalleryItem;
  active: boolean;
  onSelect: () => void;
}) {
  const thumbSrc =
    item.type === 'video'
      ? getVideoThumbnailPath(getSiteVideo(item.videoSlug)!)
      : item.src;

  return (
    <button
      type="button"
      className={`feature-gallery__thumb${active ? ' feature-gallery__thumb--active' : ''}`}
      aria-label={`Show ${item.label} preview`}
      aria-pressed={active}
      onClick={onSelect}
    >
      <SeoImage
        src={thumbSrc}
        decorative
        className="feature-gallery__thumb-image"
        draggable={false}
      />
      {item.type === 'video' && (
        <span className="feature-gallery__thumb-badge" aria-hidden>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        </span>
      )}
      <span className="feature-gallery__thumb-label">{item.label}</span>
    </button>
  );
}

export function FeatureShowcaseGallery() {
  const [activeId, setActiveId] = useState('video');
  const activeItem = GALLERY_ITEMS.find(item => item.id === activeId) ?? GALLERY_ITEMS[0];
  const activeVideo =
    activeItem.type === 'video' ? getSiteVideo(activeItem.videoSlug)! : null;

  return (
    <div className="feature-gallery" id="feature-demo">
      <div className="feature-gallery__preview" aria-live="polite">
        <span className="feature-gallery__preview-badge">Preview</span>
        <div key={activeId} className="feature-gallery__preview-inner">
          {activeItem.type === 'video' ? (
            <VideoPlayer
              video={activeVideo!}
              className="feature-gallery__video"
              showPlayOverlay
              ariaLabel={activeVideo!.name}
            />
          ) : (
            <SeoImage
              src={activeItem.src}
              fallbackAlt={activeItem.alt}
              className="feature-gallery__preview-image"
              loading="eager"
            />
          )}
        </div>
      </div>

      <div className="feature-gallery__thumbs" role="tablist" aria-label="Feature previews">
        {GALLERY_ITEMS.map(item => (
          <ThumbnailButton
            key={item.id}
            item={item}
            active={item.id === activeId}
            onSelect={() => setActiveId(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
