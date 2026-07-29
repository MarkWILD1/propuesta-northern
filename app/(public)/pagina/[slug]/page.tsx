import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentPageDetail } from "@/components/landing/content-page-detail";
import { getPublishedContentPage } from "@/lib/content";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedContentPage(slug);

  if (!page) {
    return { title: "Pagina no encontrada" };
  }

  return {
    title: `${page.title} | Colegio Northern`,
    description: page.body.slice(0, 160),
  };
}

export default async function ContentPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPublishedContentPage(slug);

  if (!page) {
    notFound();
  }

  return <ContentPageDetail page={page} />;
}
