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

export type DriveFile = {
  originalUrl: string;
  fileId: string;
};

function parseDriveShareLink(
  value: string,
  messages: {
    empty: string;
    invalidUrl: string;
    notDrive: string;
    noFileId: string;
  },
): DriveFile {
  const originalUrl = value.trim();

  if (!originalUrl) {
    throw new Error(messages.empty);
  }

  let url: URL;

  try {
    url = new URL(originalUrl);
  } catch {
    throw new Error(messages.invalidUrl);
  }

  const isGoogleDriveHost =
    url.hostname === "drive.google.com" || url.hostname === "docs.google.com";

  if (!isGoogleDriveHost) {
    throw new Error(messages.notDrive);
  }

  const fileId =
    DRIVE_FILE_PATTERNS.map((pattern) => originalUrl.match(pattern)?.[1]).find(Boolean) ??
    url.searchParams.get("id");

  if (!fileId) {
    throw new Error(messages.noFileId);
  }

  return { originalUrl, fileId };
}

export function parseDriveImageUrl(value: string): DriveImage {
  const parsed = parseDriveShareLink(value, {
    empty: "Paste a Google Drive share link.",
    invalidUrl: "The photo link must be a valid URL.",
    notDrive: "Use a Google Drive image link.",
    noFileId: "Could not find a Google Drive file id in this link.",
  });

  return {
    ...parsed,
    displayUrl: getDriveImageDisplayUrl(parsed.fileId),
  };
}

/** Validates a public Google Drive file link (CV, PDF, etc.). */
export function parseDriveFileUrl(value: string): DriveFile {
  return parseDriveShareLink(value, {
    empty: "Pegá el link público de Google Drive de tu curriculum.",
    invalidUrl: "El link del curriculum debe ser una URL válida.",
    notDrive: "Usá un link de Google Drive para el curriculum.",
    noFileId: "No pudimos leer el archivo de Google Drive en este link.",
  });
}

export function getDriveImageDisplayUrl(fileId: string) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
}
