import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE_VIDEOS, type SiteVideo } from '../src/content/videos';

type VideoMetadataDefaults = {
  durationsSeconds?: Record<string, number>;
};

const STATIC_METADATA_PATH = join(process.cwd(), 'src', 'content', 'video-metadata.json');

let ffprobeAvailable: boolean | undefined;

export function isFfprobeAvailable() {
  if (ffprobeAvailable !== undefined) return ffprobeAvailable;

  try {
    execSync('ffprobe -version', { stdio: 'ignore' });
    ffprobeAvailable = true;
  } catch {
    ffprobeAvailable = false;
  }

  return ffprobeAvailable;
}

export function loadStaticDurations(): Record<string, number> {
  try {
    const raw = readFileSync(STATIC_METADATA_PATH, 'utf8');
    const parsed = JSON.parse(raw) as VideoMetadataDefaults;
    return parsed.durationsSeconds ?? {};
  } catch {
    return {};
  }
}

export function probeDurationSeconds(relativePath: string): number | undefined {
  const filePath = join(process.cwd(), relativePath);
  if (!existsSync(filePath)) return undefined;

  try {
    const output = execSync(
      `ffprobe -v error -show_entries format=duration -of csv=p=0 ${JSON.stringify(filePath)}`,
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();

    const duration = Number.parseFloat(output);
    if (!Number.isFinite(duration) || duration <= 0) return undefined;

    return Math.max(1, Math.round(duration));
  } catch {
    return undefined;
  }
}

function getRegistryFallbackDuration(video: SiteVideo) {
  if ('durationSeconds' in video && typeof video.durationSeconds === 'number') {
    return Math.max(1, Math.round(video.durationSeconds));
  }

  return 1;
}

export function resolveVideoDurations() {
  const staticDurations = loadStaticDurations();
  const useFfprobe = isFfprobeAvailable();

  if (!useFfprobe) {
    console.log('ffprobe not found — using static video-metadata.json durations for the build.');
  }

  return Object.fromEntries(
    SITE_VIDEOS.map(video => {
      const relativePath = `public/videos/${video.filename}`;
      let duration: number | undefined;
      let source = 'default';

      if (useFfprobe) {
        duration = probeDurationSeconds(relativePath);
        if (duration !== undefined) source = 'ffprobe';
      }

      if (duration === undefined && staticDurations[video.slug] !== undefined) {
        duration = Math.max(1, Math.round(staticDurations[video.slug]));
        source = 'video-metadata.json';
      }

      if (duration === undefined) {
        duration = getRegistryFallbackDuration(video);
        source = 'registry fallback';
      }

      if (source !== 'ffprobe') {
        console.log(`Duration for ${video.slug}: ${duration}s (${source})`);
      }

      return [video.slug, duration];
    }),
  ) as Record<string, number>;
}
