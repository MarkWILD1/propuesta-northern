import { describe, expect, it } from "vitest";

import { parseInstagramUrl, parseVideoUrl, parseYouTubeUrl } from "@/lib/embeds";

describe("parseYouTubeUrl", () => {
  it("parses a standard watch URL", () => {
    const parsed = parseYouTubeUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    expect(parsed?.videoId).toBe("dQw4w9WgXcQ");
    expect(parsed?.embedUrl).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
  });

  it("parses a short youtu.be URL", () => {
    const parsed = parseYouTubeUrl("https://youtu.be/dQw4w9WgXcQ?t=10");
    expect(parsed?.videoId).toBe("dQw4w9WgXcQ");
  });

  it("parses a shorts URL", () => {
    const parsed = parseYouTubeUrl("https://www.youtube.com/shorts/abc123DEF45");
    expect(parsed?.videoId).toBe("abc123DEF45");
  });

  it("returns null for non-YouTube URLs", () => {
    expect(parseYouTubeUrl("https://vimeo.com/12345")).toBeNull();
    expect(parseYouTubeUrl("")).toBeNull();
    expect(parseYouTubeUrl(null)).toBeNull();
  });
});

describe("parseInstagramUrl", () => {
  it("parses a post URL", () => {
    const parsed = parseInstagramUrl("https://www.instagram.com/p/CabcdEF123/");
    expect(parsed?.shortcode).toBe("CabcdEF123");
    expect(parsed?.embedUrl).toBe("https://www.instagram.com/p/CabcdEF123/embed");
    expect(parsed?.postUrl).toBe("https://www.instagram.com/p/CabcdEF123/");
  });

  it("parses a reel URL with a username", () => {
    const parsed = parseInstagramUrl("https://www.instagram.com/northern/reel/XyZ_789/");
    expect(parsed?.shortcode).toBe("XyZ_789");
    expect(parsed?.embedUrl).toBe("https://www.instagram.com/reel/XyZ_789/embed");
  });

  it("returns null for non-Instagram URLs", () => {
    expect(parseInstagramUrl("https://example.com/p/abc")).toBeNull();
    expect(parseInstagramUrl(null)).toBeNull();
  });
});

describe("parseVideoUrl", () => {
  it("prefers YouTube when applicable", () => {
    const parsed = parseVideoUrl("https://youtu.be/dQw4w9WgXcQ");
    expect(parsed?.provider).toBe("youtube");
    expect(parsed?.embedUrl).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
  });

  it("detects Instagram", () => {
    const parsed = parseVideoUrl("https://www.instagram.com/reel/XyZ_789/");
    expect(parsed?.provider).toBe("instagram");
  });

  it("falls back to a plain link", () => {
    const parsed = parseVideoUrl("https://vimeo.com/12345");
    expect(parsed?.provider).toBe("link");
    expect(parsed?.embedUrl).toBeNull();
    expect(parsed?.watchUrl).toBe("https://vimeo.com/12345");
  });

  it("returns null for empty input", () => {
    expect(parseVideoUrl("")).toBeNull();
  });
});
