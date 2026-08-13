export const STAFF_FIELD_TYPES = [
  "TEXT",
  "EMAIL",
  "PHONE",
  "TEXTAREA",
  "SELECT",
  "DRIVE_URL",
  "PDF_FILE",
] as const;

export type StaffFieldType = (typeof STAFF_FIELD_TYPES)[number];

export const STAFF_PDF_MAX_BYTES = 5 * 1024 * 1024;

export type StaffFileAnswer = {
  url: string;
  name: string;
  pathname: string;
};

export function parseSelectOptions(options: string | null | undefined) {
  return (options ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseStaffFileAnswer(
  value: string | null | undefined,
): StaffFileAnswer | null {
  if (!value?.trim()) return null;

  try {
    const parsed = JSON.parse(value) as Partial<StaffFileAnswer>;
    if (
      typeof parsed.url === "string" &&
      typeof parsed.name === "string" &&
      typeof parsed.pathname === "string"
    ) {
      return {
        url: parsed.url,
        name: parsed.name,
        pathname: parsed.pathname,
      };
    }
  } catch {
    // Legacy plain URL
  }

  if (/^https?:\/\//i.test(value)) {
    return { url: value, name: "curriculum.pdf", pathname: value };
  }

  return null;
}

export function serializeStaffFileAnswer(answer: StaffFileAnswer) {
  return JSON.stringify(answer);
}

export function sanitizePdfFileName(name: string) {
  const base = name
    .trim()
    .replace(/\.pdf$/i, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  return `${base || "curriculum"}.pdf`;
}
