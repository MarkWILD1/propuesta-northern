export const STAFF_FIELD_TYPES = [
  "TEXT",
  "EMAIL",
  "PHONE",
  "TEXTAREA",
  "SELECT",
  "DRIVE_URL",
] as const;

export type StaffFieldType = (typeof STAFF_FIELD_TYPES)[number];

export function parseSelectOptions(options: string | null | undefined) {
  return (options ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
