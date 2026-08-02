import { getImageSeoByPath } from '../content/imageSeo';
import { SeoImage } from './SeoImage';

export const SITE_LOGO_SRC = '/rt-removebg-preview.png';
export const SITE_LOGO_WIDTH = 64;
export const SITE_LOGO_HEIGHT = 77;

const LOGO_META = getImageSeoByPath(SITE_LOGO_SRC);

type SiteLogoProps = {
  className?: string;
  height?: number;
};

export function SiteLogo({ className = '', height = 40 }: SiteLogoProps) {
  const width = Math.round((height * SITE_LOGO_WIDTH) / SITE_LOGO_HEIGHT);

  return (
    <SeoImage
      src={SITE_LOGO_SRC}
      fallbackAlt={LOGO_META?.alt ?? 'Marathon Cheats'}
      className={`site-logo ${className}`.trim()}
      width={width}
      height={height}
      priority
      loading="eager"
    />
  );
}
