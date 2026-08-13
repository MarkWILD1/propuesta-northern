import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

import {
  sanitizePdfFileName,
  serializeStaffFileAnswer,
  STAFF_PDF_MAX_BYTES,
  type StaffFileAnswer,
} from "@/lib/staff-fields";

type PdfValidation =
  | { ok: true; value: { file: File; buffer: Buffer } | null }
  | { ok: false; error: string };

export async function validateStaffPdfFile(
  value: FormDataEntryValue | null,
  label: string,
  required: boolean,
): Promise<PdfValidation> {
  if (!(value instanceof File) || value.size === 0) {
    if (required) return { ok: false, error: `${label} es obligatorio.` };
    return { ok: true, value: null };
  }

  const name = value.name || "curriculum.pdf";
  const isPdfMime =
    value.type === "application/pdf" || value.type === "application/x-pdf";
  const isPdfName = /\.pdf$/i.test(name);

  if (!isPdfMime && !isPdfName) {
    return { ok: false, error: `${label} debe ser un archivo PDF.` };
  }

  if (value.size > STAFF_PDF_MAX_BYTES) {
    return {
      ok: false,
      error: `${label} no puede superar los 5 MB.`,
    };
  }

  const buffer = Buffer.from(await value.arrayBuffer());
  const header = buffer.subarray(0, 4).toString("utf8");
  if (header !== "%PDF") {
    return { ok: false, error: `${label} no es un PDF válido.` };
  }

  return { ok: true, value: { file: value, buffer } };
}

export async function uploadStaffPdf(
  file: File,
  buffer: Buffer,
): Promise<StaffFileAnswer> {
  if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    throw new Error(
      "Falta BLOB_READ_WRITE_TOKEN. Creá un Blob store privado en Vercel (Storage → Blob) y pegá el token en .env.",
    );
  }

  const safeName = sanitizePdfFileName(file.name);
  const pathname = `staff-cvs/${randomUUID()}/${safeName}`;

  const blob = await put(pathname, buffer, {
    access: "private",
    contentType: "application/pdf",
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return {
    url: blob.url,
    name: safeName,
    pathname: blob.pathname || pathname,
  };
}

export function staffFileAnswerToStoredValue(answer: StaffFileAnswer) {
  return serializeStaffFileAnswer(answer);
}
