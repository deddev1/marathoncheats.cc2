import { useEffect, useRef, useState } from 'react';
import {
  getVideoContentPath,
  getVideoThumbnailPath,
  type SiteVideo,
} from '../content/videos';
import { versionImageUrl } from '../content/imageSeo';

type VideoPlayerProps = {
  video: SiteVideo;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  ariaLabel?: string;
  showPlayOverlay?: boolean;
};

export function VideoPlayer({
  video,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = false,
  className,
  ariaLabel,
  showPlayOverlay = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoPlay);

  useEffect(() => {
    return () => {
      videoRef.current?.pause();
    };
  }, []);

  function toggle() {
    const element = videoRef.current;
    if (!element) return;

    if (element.paused) {
      void element.play();
      setPlaying(true);
    } else {
      element.pause();
      setPlaying(false);
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!showPlayOverlay) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  }

  const contentPath = getVideoContentPath(video);
  const posterPath = getVideoThumbnailPath(video);
  const label = ariaLabel ?? video.name;

  const videoElement = (
    <video
      ref={videoRef}
      src={contentPath}
      poster={versionImageUrl(posterPath)}
      preload="metadata"
      playsInline
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      disablePictureInPicture={!controls}
      controlsList={controls ? undefined : 'nodownload nofullscreen noremoteplayback'}
      aria-label={label}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => setPlaying(false)}
    />
  );

  if (!showPlayOverlay) {
    return <div className={className}>{videoElement}</div>;
  }

  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      aria-label={playing ? `Pause ${label}` : `Play ${label}`}
      aria-pressed={playing}
      onClick={toggle}
      onKeyDown={onKeyDown}
    >
      {videoElement}

      {!playing && (
        <div className="feature-gallery__play-overlay" aria-hidden>
          <div className="feature-gallery__play-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)">
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </div>
          <span className="feature-gallery__play-label">Play demo</span>
        </div>
      )}
    </div>
  );
}
