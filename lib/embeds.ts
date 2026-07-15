export type YouTubeEmbed = {
  videoId: string;
  embedUrl: string;
  watchUrl: string;
};

const YOUTUBE_ID_PATTERNS = [
  /youtu\.be\/([a-zA-Z0-9_-]{6,})/,
  /youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]{6,})/,
  /youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/,
  /youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/,
  /youtube\.com\/live\/([a-zA-Z0-9_-]{6,})/,
];

export function parseYouTubeUrl(value?: string | null): YouTubeEmbed | null {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }

  const videoId =
    YOUTUBE_ID_PATTERNS.map((pattern) => trimmed.match(pattern)?.[1]).find(Boolean) ?? null;

  if (!videoId) {
    return null;
  }

  return {
    videoId,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

export type InstagramEmbed = {
  shortcode: string;
  embedUrl: string;
  postUrl: string;
};

const INSTAGRAM_PATTERN = /instagram\.com\/(?:[^/]+\/)?(p|reel|reels|tv)\/([a-zA-Z0-9_-]+)/;

export function parseInstagramUrl(value?: string | null): InstagramEmbed | null {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }

  const match = trimmed.match(INSTAGRAM_PATTERN);
  if (!match) {
    return null;
  }

  const kind = match[1] === "reels" ? "reel" : match[1];
  const shortcode = match[2];

  return {
    shortcode,
    embedUrl: `https://www.instagram.com/${kind}/${shortcode}/embed`,
    postUrl: `https://www.instagram.com/${kind}/${shortcode}/`,
  };
}

export type VideoEmbed =
  | { provider: "youtube"; embedUrl: string; watchUrl: string }
  | { provider: "instagram"; embedUrl: string; watchUrl: string }
  | { provider: "link"; embedUrl: null; watchUrl: string };

export function parseVideoUrl(value?: string | null): VideoEmbed | null {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }

  const youtube = parseYouTubeUrl(trimmed);
  if (youtube) {
    return { provider: "youtube", embedUrl: youtube.embedUrl, watchUrl: youtube.watchUrl };
  }

  const instagram = parseInstagramUrl(trimmed);
  if (instagram) {
    return { provider: "instagram", embedUrl: instagram.embedUrl, watchUrl: instagram.postUrl };
  }

  return { provider: "link", embedUrl: null, watchUrl: trimmed };
}
