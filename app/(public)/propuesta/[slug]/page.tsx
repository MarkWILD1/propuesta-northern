import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProgramLevelDetail } from "@/components/landing/program-level-detail";
import { getPublishedProgramLevel } from "@/lib/content";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const level = await getPublishedProgramLevel(slug);

  if (!level) {
    return { title: "Propuesta no encontrada" };
  }

  return {
    title: `${level.title} | Colegio Northern`,
    description: level.body,
  };
}

export default async function ProgramLevelPage({ params }: PageProps) {
  const { slug } = await params;
  const level = await getPublishedProgramLevel(slug);

  if (!level) {
    notFound();
  }

  return <ProgramLevelDetail level={level} />;
}
