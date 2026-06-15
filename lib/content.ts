import { revalidatePath } from "next/cache";
import { z } from "zod";

import { defaultLandingPageCreateData, HOME_SLUG } from "@/lib/default-content";
import { parseDriveImageUrl } from "@/lib/drive";
import { prisma } from "@/lib/prisma";

const checkboxBoolean = z.preprocess(
  (value) => value === "true" || value === "on" || value === "1" || value === true,
  z.boolean(),
);

export const landingPageSchema = z.object({
  title: z.string().min(2, "Title is required."),
  eyebrow: z.string().min(2, "Eyebrow is required."),
  heroTitle: z.string().min(2, "Hero title is required."),
  heroSubtitle: z.string().min(2, "Hero subtitle is required."),
  ctaLabel: z.string().min(2, "CTA label is required."),
  ctaHref: z.string().min(1, "CTA link is required."),
  contactTitle: z.string().min(2, "Contact title is required."),
  contactBody: z.string().min(2, "Contact body is required."),
  contactEmail: z.string().email("Use a valid email address."),
  contactPhone: z.string().optional(),
  published: checkboxBoolean.default(true),
});

export const sectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Section title is required."),
  body: z.string().min(2, "Section body is required."),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export const photoSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Photo title is required."),
  altText: z.string().min(8, "Alt text should describe the photo."),
  caption: z.string().optional(),
  driveUrl: z.string().min(1, "Google Drive link is required."),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export async function getLandingPageForAdmin() {
  return prisma.landingPage.upsert({
    where: { slug: HOME_SLUG },
    update: {},
    create: defaultLandingPageCreateData(),
    include: {
      sections: { orderBy: { sortOrder: "asc" } },
      photos: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getPublishedLandingPage() {
  return prisma.landingPage.findFirst({
    where: { slug: HOME_SLUG, published: true },
    include: {
      sections: {
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      },
      photos: {
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });
}

export async function updateLandingPage(formData: FormData) {
  const parsed = landingPageSchema.parse(Object.fromEntries(formData));

  await prisma.landingPage.update({
    where: { slug: HOME_SLUG },
    data: parsed,
  });

  revalidatePath("/");
  revalidatePath("/admin/content");
}

export async function upsertSection(formData: FormData) {
  const parsed = sectionSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();

  if (parsed.id) {
    await prisma.landingSection.update({
      where: { id: parsed.id },
      data: {
        title: parsed.title,
        body: parsed.body,
        sortOrder: parsed.sortOrder,
        published: parsed.published,
      },
    });
  } else {
    await prisma.landingSection.create({
      data: {
        landingPageId: landingPage.id,
        title: parsed.title,
        body: parsed.body,
        sortOrder: parsed.sortOrder,
        published: parsed.published,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/content");
}

export async function deleteSection(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.landingSection.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/content");
}

export async function upsertPhoto(formData: FormData) {
  const parsed = photoSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();
  const driveImage = parseDriveImageUrl(parsed.driveUrl);

  const data = {
    title: parsed.title,
    altText: parsed.altText,
    caption: parsed.caption || null,
    driveUrl: driveImage.originalUrl,
    driveFileId: driveImage.fileId,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
  };

  if (parsed.id) {
    await prisma.photo.update({
      where: { id: parsed.id },
      data,
    });
  } else {
    await prisma.photo.create({
      data: {
        landingPageId: landingPage.id,
        ...data,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/photos");
}

export async function deletePhoto(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.photo.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/photos");
}

