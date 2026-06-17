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
  levelsTitle: z.string().min(2, "Levels title is required."),
  statsTitle: z.string().min(2, "Stats title is required."),
  featuredTitle: z.string().min(2, "Featured title is required."),
  activitiesTitle: z.string().min(2, "Activities title is required."),
  galleryTitle: z.string().min(2, "Gallery title is required."),
  newsTitle: z.string().min(2, "News title is required."),
  instagramTitle: z.string().min(2, "Instagram title is required."),
  instagramUrl: z.string().optional().default(""),
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
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export const navLinkSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, "Label is required."),
  href: z.string().min(1, "Link is required."),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export const programLevelSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Title is required."),
  body: z.string().min(2, "Description is required."),
  altText: z.string().optional(),
  driveUrl: z.string().min(1, "Google Drive link is required."),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export const statItemSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, "Label is required."),
  value: z.string().min(1, "Value is required."),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export const activityTabSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Title is required."),
  body: z.string().min(2, "Description is required."),
  altText: z.string().optional(),
  driveUrl: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export const newsItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Title is required."),
  excerpt: z.string().min(2, "Excerpt is required."),
  dateLabel: z.string().optional(),
  altText: z.string().optional(),
  driveUrl: z.string().optional(),
  href: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export const instagramPostSchema = z.object({
  id: z.string().optional(),
  caption: z.string().optional(),
  altText: z.string().optional(),
  driveUrl: z.string().min(1, "Google Drive link is required."),
  href: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export const locationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name is required."),
  addressLines: z.string().min(2, "Address is required."),
  phone: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export const photoSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Photo title is required."),
  altText: z.string().optional(),
  caption: z.string().optional(),
  driveUrl: z.string().min(1, "Google Drive link is required."),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export const carouselSlideSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Slide title is required."),
  altText: z.string().optional(),
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
      carouselSlides: { orderBy: { sortOrder: "asc" } },
      navLinks: { orderBy: { sortOrder: "asc" } },
      programLevels: { orderBy: { sortOrder: "asc" } },
      stats: { orderBy: { sortOrder: "asc" } },
      activities: { orderBy: { sortOrder: "asc" } },
      news: { orderBy: { sortOrder: "asc" } },
      instagramPosts: { orderBy: { sortOrder: "asc" } },
      locations: { orderBy: { sortOrder: "asc" } },
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
      carouselSlides: {
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      },
      navLinks: {
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      },
      programLevels: {
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      },
      stats: {
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      },
      activities: {
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      },
      news: {
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      },
      instagramPosts: {
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      },
      locations: {
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

  const sectionData = {
    title: parsed.title,
    body: parsed.body,
    ctaLabel: parsed.ctaLabel?.trim() || null,
    ctaHref: parsed.ctaHref?.trim() || null,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
  };

  if (parsed.id) {
    await prisma.landingSection.update({
      where: { id: parsed.id },
      data: sectionData,
    });
  } else {
    await prisma.landingSection.create({
      data: {
        landingPageId: landingPage.id,
        ...sectionData,
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
    altText: parsed.altText?.trim() || parsed.title,
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

export async function upsertCarouselSlide(formData: FormData) {
  const parsed = carouselSlideSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();
  const driveImage = parseDriveImageUrl(parsed.driveUrl);

  const data = {
    title: parsed.title,
    altText: parsed.altText?.trim() || parsed.title,
    caption: parsed.caption || null,
    driveUrl: driveImage.originalUrl,
    driveFileId: driveImage.fileId,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
  };

  if (parsed.id) {
    await prisma.carouselSlide.update({
      where: { id: parsed.id },
      data,
    });
  } else {
    await prisma.carouselSlide.create({
      data: {
        landingPageId: landingPage.id,
        ...data,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/carousel");
}

export async function deleteCarouselSlide(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.carouselSlide.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/carousel");
}

export async function upsertNavLink(formData: FormData) {
  const parsed = navLinkSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();

  const data = {
    label: parsed.label,
    href: parsed.href,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
  };

  if (parsed.id) {
    await prisma.navLink.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.navLink.create({ data: { landingPageId: landingPage.id, ...data } });
  }

  revalidatePath("/");
  revalidatePath("/admin/navegacion");
}

export async function deleteNavLink(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.navLink.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/navegacion");
}

export async function upsertProgramLevel(formData: FormData) {
  const parsed = programLevelSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();
  const driveImage = parseDriveImageUrl(parsed.driveUrl);

  const data = {
    title: parsed.title,
    body: parsed.body,
    altText: parsed.altText?.trim() || parsed.title,
    driveUrl: driveImage.originalUrl,
    driveFileId: driveImage.fileId,
    ctaLabel: parsed.ctaLabel?.trim() || null,
    ctaHref: parsed.ctaHref?.trim() || null,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
  };

  if (parsed.id) {
    await prisma.programLevel.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.programLevel.create({ data: { landingPageId: landingPage.id, ...data } });
  }

  revalidatePath("/");
  revalidatePath("/admin/niveles");
}

export async function deleteProgramLevel(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.programLevel.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/niveles");
}

export async function upsertStatItem(formData: FormData) {
  const parsed = statItemSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();

  const data = {
    label: parsed.label,
    value: parsed.value,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
  };

  if (parsed.id) {
    await prisma.statItem.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.statItem.create({ data: { landingPageId: landingPage.id, ...data } });
  }

  revalidatePath("/");
  revalidatePath("/admin/estadisticas");
}

export async function deleteStatItem(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.statItem.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/estadisticas");
}

export async function upsertActivityTab(formData: FormData) {
  const parsed = activityTabSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();
  const driveImage = parsed.driveUrl?.trim()
    ? parseDriveImageUrl(parsed.driveUrl)
    : null;

  const data = {
    title: parsed.title,
    body: parsed.body,
    altText: parsed.altText?.trim() || parsed.title,
    driveUrl: driveImage?.originalUrl ?? null,
    driveFileId: driveImage?.fileId ?? null,
    ctaLabel: parsed.ctaLabel?.trim() || null,
    ctaHref: parsed.ctaHref?.trim() || null,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
  };

  if (parsed.id) {
    await prisma.activityTab.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.activityTab.create({ data: { landingPageId: landingPage.id, ...data } });
  }

  revalidatePath("/");
  revalidatePath("/admin/actividades");
}

export async function deleteActivityTab(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.activityTab.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/actividades");
}

export async function upsertNewsItem(formData: FormData) {
  const parsed = newsItemSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();
  const driveImage = parsed.driveUrl?.trim()
    ? parseDriveImageUrl(parsed.driveUrl)
    : null;

  const data = {
    title: parsed.title,
    excerpt: parsed.excerpt,
    dateLabel: parsed.dateLabel?.trim() || null,
    altText: parsed.altText?.trim() || parsed.title,
    driveUrl: driveImage?.originalUrl ?? null,
    driveFileId: driveImage?.fileId ?? null,
    href: parsed.href?.trim() || null,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
  };

  if (parsed.id) {
    await prisma.newsItem.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.newsItem.create({ data: { landingPageId: landingPage.id, ...data } });
  }

  revalidatePath("/");
  revalidatePath("/admin/noticias");
}

export async function deleteNewsItem(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.newsItem.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/noticias");
}

export async function upsertInstagramPost(formData: FormData) {
  const parsed = instagramPostSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();
  const driveImage = parseDriveImageUrl(parsed.driveUrl);

  const data = {
    caption: parsed.caption?.trim() || null,
    altText: parsed.altText?.trim() || parsed.caption?.trim() || "Instagram Northern",
    driveUrl: driveImage.originalUrl,
    driveFileId: driveImage.fileId,
    href: parsed.href?.trim() || null,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
  };

  if (parsed.id) {
    await prisma.instagramPost.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.instagramPost.create({ data: { landingPageId: landingPage.id, ...data } });
  }

  revalidatePath("/");
  revalidatePath("/admin/instagram");
}

export async function deleteInstagramPost(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.instagramPost.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/instagram");
}

export async function upsertLocation(formData: FormData) {
  const parsed = locationSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();

  const data = {
    name: parsed.name,
    addressLines: parsed.addressLines,
    phone: parsed.phone?.trim() || null,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
  };

  if (parsed.id) {
    await prisma.location.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.location.create({ data: { landingPageId: landingPage.id, ...data } });
  }

  revalidatePath("/");
  revalidatePath("/admin/sedes");
}

export async function deleteLocation(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.location.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/sedes");
}

