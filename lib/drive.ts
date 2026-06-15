const DRIVE_FILE_PATTERNS = [
  /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
  /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
  /drive\.google\.com\/uc\?(?:.*&)?id=([a-zA-Z0-9_-]+)/,
  /docs\.google\.com\/uc\?(?:.*&)?id=([a-zA-Z0-9_-]+)/,
];

export type DriveImage = {
  originalUrl: string;
  fileId: string;
  displayUrl: string;
};

export function parseDriveImageUrl(value: string): DriveImage {
  const originalUrl = value.trim();

  if (!originalUrl) {
    throw new Error("Paste a Google Drive share link.");
  }

  let url: URL;

  try {
    url = new URL(originalUrl);
  } catch {
    throw new Error("The photo link must be a valid URL.");
  }

  const isGoogleDriveHost =
    url.hostname === "drive.google.com" || url.hostname === "docs.google.com";

  if (!isGoogleDriveHost) {
    throw new Error("Use a Google Drive image link.");
  }

  const fileId =
    DRIVE_FILE_PATTERNS.map((pattern) => originalUrl.match(pattern)?.[1]).find(Boolean) ??
    url.searchParams.get("id");

  if (!fileId) {
    throw new Error("Could not find a Google Drive file id in this link.");
  }

  return {
    originalUrl,
    fileId,
    displayUrl: getDriveImageDisplayUrl(fileId),
  };
}

export function getDriveImageDisplayUrl(fileId: string) {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}
