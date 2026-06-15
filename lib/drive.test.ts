import { describe, expect, it } from "vitest";

import { getDriveImageDisplayUrl, parseDriveImageUrl } from "@/lib/drive";

describe("parseDriveImageUrl", () => {
  it("extracts a file id from a standard Drive share URL", () => {
    const parsed = parseDriveImageUrl(
      "https://drive.google.com/file/d/abc_123-XYZ/view?usp=sharing",
    );

    expect(parsed.fileId).toBe("abc_123-XYZ");
    expect(parsed.displayUrl).toBe(getDriveImageDisplayUrl("abc_123-XYZ"));
  });

  it("extracts a file id from an open URL", () => {
    const parsed = parseDriveImageUrl("https://drive.google.com/open?id=file-id-123");

    expect(parsed.fileId).toBe("file-id-123");
  });

  it("extracts a file id from a uc URL", () => {
    const parsed = parseDriveImageUrl(
      "https://drive.google.com/uc?export=view&id=file-id-456",
    );

    expect(parsed.fileId).toBe("file-id-456");
  });

  it("rejects non-Google Drive URLs", () => {
    expect(() => parseDriveImageUrl("https://example.com/image.jpg")).toThrow(
      "Use a Google Drive image link.",
    );
  });

  it("rejects Drive URLs without a file id", () => {
    expect(() => parseDriveImageUrl("https://drive.google.com/drive/my-drive")).toThrow(
      "Could not find a Google Drive file id in this link.",
    );
  });
});
