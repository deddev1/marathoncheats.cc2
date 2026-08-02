import { getImageSeoById } from './imageSeo';

/** Verified Marathon-relevant images (complete files in /public). */
export const SITE_IMAGES = {
  esp: getImageSeoById('esp')!.path,
  aimbot: getImageSeoById('aimbot')!.path,
  loot: getImageSeoById('loot')!.path,
  external: getImageSeoById('external')!.path,
  guide: getImageSeoById('guide')!.path,
  showcase: getImageSeoById('showcase')!.path,
  galleryPoster: getImageSeoById('showcase')!.path,
  radar: getImageSeoById('patch-updates')!.path,
  support: getImageSeoById('patch-updates')!.path,
  playerAlert: getImageSeoById('guide')!.path,
  visibleCheck: getImageSeoById('external')!.path,
  cloudDma: getImageSeoById('cloud-dma')!.path,
} as const;
