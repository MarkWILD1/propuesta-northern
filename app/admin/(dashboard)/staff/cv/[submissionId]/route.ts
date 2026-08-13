import { get } from "@vercel/blob";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseStaffFileAnswer } from "@/lib/staff-fields";

type RouteContext = {
  params: Promise<{ submissionId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { submissionId } = await context.params;
  const fieldId = new URL(request.url).searchParams.get("fieldId");

  const submission = await prisma.staffApplicationSubmission.findUnique({
    where: { id: submissionId },
    include: {
      section: {
        include: {
          fields: true,
        },
      },
    },
  });

  if (!submission) {
    return new NextResponse("Postulación no encontrada.", { status: 404 });
  }

  let answers: Record<string, string> = {};
  try {
    answers = JSON.parse(submission.answersJson) as Record<string, string>;
  } catch {
    return new NextResponse("Respuestas inválidas.", { status: 400 });
  }

  const pdfFieldIds = submission.section.fields
    .filter((field) => field.type === "PDF_FILE")
    .map((field) => field.id);

  const resolvedFieldId =
    fieldId && answers[fieldId]
      ? fieldId
      : pdfFieldIds.find((id) => answers[id]) ??
        Object.keys(answers).find((id) => parseStaffFileAnswer(answers[id]));

  if (!resolvedFieldId || !answers[resolvedFieldId]) {
    return new NextResponse("Curriculum no encontrado.", { status: 404 });
  }

  const fileAnswer = parseStaffFileAnswer(answers[resolvedFieldId]);
  if (!fileAnswer) {
    return new NextResponse("Curriculum no encontrado.", { status: 404 });
  }

  const blobRef = fileAnswer.pathname || fileAnswer.url;
  const result = await get(blobRef, { access: "private" });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return new NextResponse("No se pudo abrir el curriculum.", { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", result.blob.contentType || "application/pdf");
  headers.set(
    "Content-Disposition",
    `inline; filename="${fileAnswer.name.replace(/"/g, "")}"`,
  );
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Cache-Control", "private, no-store");

  return new NextResponse(result.stream, { headers });
}
