import { revalidatePath } from "next/cache";
import { z } from "zod";

import { defaultLandingPageCreateData, HOME_SLUG } from "@/lib/default-content";
import { parseDriveImageUrl } from "@/lib/drive";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

const checkboxBoolean = z.preprocess(
  (value) => value === "true" || value === "on" || value === "1" || value === true,
  z.boolean(),
);

const optionalUrl = z
  .union([z.literal(""), z.string().trim().url("Use a valid URL.")])
  .optional();

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

export const landingHeroSchema = landingPageSchema.pick({
  title: true,
  eyebrow: true,
  heroTitle: true,
  heroSubtitle: true,
  published: true,
});

const landingTitleFields = [
  "levelsTitle",
  "statsTitle",
  "featuredTitle",
  "activitiesTitle",
  "galleryTitle",
  "instagramTitle",
] as const;

export const landingTitleSchema = z.object({
  field: z.enum(landingTitleFields),
  value: z.string().min(2, "Title is required."),
});

export const footerSchema = landingPageSchema.pick({
  contactTitle: true,
  contactBody: true,
  contactEmail: true,
  contactPhone: true,
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

const slugField = z
  .string()
  .optional()
  .transform((value) => value?.trim() ?? "")
  .pipe(z.union([z.literal(""), z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens.")]));

export const programLevelSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Title is required."),
  slug: slugField,
  body: z.string().min(2, "Card excerpt is required."),
  detailBody: z.string().min(2, "Page content is required."),
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
  driveUrl: z.string().min(1, "Google Drive link is required."),
  ctaLabel: z.string().optional(),
  ctaHref: optionalUrl,
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
  driveUrl: z.string().optional(),
  href: z.string().trim().url("Instagram URL is required."),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export const locationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name is required."),
  addressLines: z.string().min(2, "Address is required."),
  phone: z.string().optional(),
  body: z.string().optional().default(""),
  altText: z.string().optional(),
  driveUrl: z.string().optional(),
  href: optionalUrl,
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export const workshopSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Workshop title is required."),
  body: z.string().optional().default(""),
  altText: z.string().optional(),
  caption: z.string().optional(),
  driveUrl: z.string().min(1, "Google Drive link is required."),
  href: optionalUrl,
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

/** @deprecated Use workshopSchema. */
export const photoSchema = workshopSchema;

export const carouselSlideSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Slide title is required."),
  altText: z.string().optional(),
  caption: z.string().optional(),
  driveUrl: z.string().min(1, "Google Drive link is required."),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

const singletonBaseSchema = z.object({
  title: z.string().min(2, "Title is required."),
  body: z.string(),
  published: checkboxBoolean.default(true),
});

export const physicalEducationSchema = singletonBaseSchema.extend({
  altText: z.string().optional(),
  driveUrl: z.string().min(1, "Google Drive link is required."),
  ctaLabel: z.string().optional(),
  ctaHref: optionalUrl,
});

export const multidisciplinaryTeamSchema = singletonBaseSchema;

export const teamVideoSchema = z.object({
  id: z.string().optional(),
  url: z.string().trim().url("Video URL is required."),
  sortOrder: z.coerce.number().int().min(0),
  published: checkboxBoolean.default(true),
});

export const institutionalProjectSchema = singletonBaseSchema.extend({
  altText: z.string().optional(),
  driveUrl: z.string().min(1, "Google Drive link is required."),
});

export const finalShowSchema = z.object({
  title: z.string().optional().default(""),
  body: z.string().optional().default(""),
  eventAt: z
    .string()
    .optional()
    .refine((value) => !value || !Number.isNaN(Date.parse(value)), "Use a valid date."),
  videoUrl: optionalUrl,
  published: checkboxBoolean.default(false),
});

export async function getLandingPageForAdmin() {
  const page = await prisma.landingPage.upsert({
    where: { slug: HOME_SLUG },
    update: {},
    create: defaultLandingPageCreateData(),
    include: {
      sections: { orderBy: { sortOrder: "asc" } },
      workshops: { orderBy: { sortOrder: "asc" } },
      carouselSlides: { orderBy: { sortOrder: "asc" } },
      navLinks: { orderBy: { sortOrder: "asc" } },
      programLevels: { orderBy: { sortOrder: "asc" } },
      stats: { orderBy: { sortOrder: "asc" } },
      activities: { orderBy: { sortOrder: "asc" } },
      news: { orderBy: { sortOrder: "asc" } },
      instagramPosts: { orderBy: { sortOrder: "asc" } },
      locations: { orderBy: { sortOrder: "asc" } },
      physicalEducation: true,
      multidisciplinaryTeam: {
        include: { videos: { orderBy: { sortOrder: "asc" } } },
      },
      institutionalProject: true,
      finalShow: true,
    },
  });

  // Temporary compatibility for current pages while the UI adopts workshops.
  return {
    ...page,
    photos: page.workshops,
    instagramPosts: page.instagramPosts.map((post) => ({
      ...post,
      driveUrl: post.driveUrl ?? "",
      driveFileId: post.driveFileId ?? "",
    })),
  };
}

export async function getPublishedLandingPage() {
  const page = await prisma.landingPage.findFirst({
    where: { slug: HOME_SLUG, published: true },
    include: {
      sections: {
        where: { published: true },
        orderBy: { sortOrder: "asc" },
      },
      workshops: {
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
      physicalEducation: { where: { published: true } },
      multidisciplinaryTeam: {
        where: { published: true },
        include: {
          videos: {
            where: { published: true },
            orderBy: { sortOrder: "asc" },
          },
        },
      },
      institutionalProject: { where: { published: true } },
      finalShow: { where: { published: true } },
    },
  });

  if (!page) return null;

  // Temporary compatibility for current landing components.
  return {
    ...page,
    photos: page.workshops,
    instagramPosts: page.instagramPosts.map((post) => ({
      ...post,
      driveUrl: post.driveUrl ?? "",
      driveFileId: post.driveFileId ?? "",
    })),
  };
}

export type PublishedLandingPage = NonNullable<
  Awaited<ReturnType<typeof getPublishedLandingPage>>
>;

export async function getPublishedProgramLevel(slug: string) {
  return prisma.programLevel.findFirst({
    where: {
      slug,
      published: true,
      landingPage: { slug: HOME_SLUG, published: true },
    },
    include: {
      landingPage: {
        include: {
          navLinks: {
            where: { published: true },
            orderBy: { sortOrder: "asc" },
          },
          locations: {
            where: { published: true },
            orderBy: { sortOrder: "asc" },
          },
        },
      },
    },
  });
}

export type PublishedProgramLevel = NonNullable<
  Awaited<ReturnType<typeof getPublishedProgramLevel>>
>;

export async function updateLandingPage(formData: FormData) {
  const parsed = landingPageSchema.parse(Object.fromEntries(formData));

  await prisma.landingPage.update({
    where: { slug: HOME_SLUG },
    data: parsed,
  });

  revalidatePath("/");
  revalidatePath("/admin/content");
}

export async function updateLandingHero(formData: FormData) {
  const parsed = landingHeroSchema.parse(Object.fromEntries(formData));
  await prisma.landingPage.update({
    where: { slug: HOME_SLUG },
    data: parsed,
  });
  revalidateContentRoutes("/admin/content");
}

export async function updateLandingTitle(formData: FormData) {
  const { field, value } = landingTitleSchema.parse(Object.fromEntries(formData));
  await prisma.landingPage.update({
    where: { slug: HOME_SLUG },
    data: { [field]: value },
  });
  revalidateContentRoutes(
    "/admin/niveles",
    "/admin/estadisticas",
    "/admin/lo-que-nos-define",
    "/admin/lenguas-extranjeras",
    "/admin/talleres",
    "/admin/mas-alla-del-aula",
  );
}

export async function updateFooter(formData: FormData) {
  const parsed = footerSchema.parse(Object.fromEntries(formData));
  await prisma.landingPage.update({
    where: { slug: HOME_SLUG },
    data: {
      ...parsed,
      contactPhone: parsed.contactPhone?.trim() || null,
    },
  });
  revalidateContentRoutes("/admin/footer");
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
  revalidatePath("/admin/lo-que-nos-define");
}

export async function deleteSection(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.landingSection.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/lo-que-nos-define");
}

export async function upsertWorkshop(formData: FormData) {
  const parsed = workshopSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();
  const driveImage = parseDriveImageUrl(parsed.driveUrl);

  const data = {
    title: parsed.title,
    body: parsed.body,
    altText: parsed.altText?.trim() || parsed.title,
    caption: parsed.caption || null,
    driveUrl: driveImage.originalUrl,
    driveFileId: driveImage.fileId,
    href: parsed.href?.trim() || null,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
  };

  if (parsed.id) {
    await prisma.workshop.update({
      where: { id: parsed.id },
      data,
    });
  } else {
    await prisma.workshop.create({
      data: {
        landingPageId: landingPage.id,
        ...data,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/photos");
  revalidatePath("/admin/talleres");
}

export async function deleteWorkshop(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.workshop.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/photos");
  revalidatePath("/admin/talleres");
}

/** @deprecated Use upsertWorkshop. */
export const upsertPhoto = upsertWorkshop;
/** @deprecated Use deleteWorkshop. */
export const deletePhoto = deleteWorkshop;

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
  const slug = parsed.slug || slugify(parsed.title);

  const data = {
    title: parsed.title,
    slug,
    body: parsed.body,
    detailBody: parsed.detailBody,
    altText: parsed.altText?.trim() || parsed.title,
    driveUrl: driveImage.originalUrl,
    driveFileId: driveImage.fileId,
    ctaLabel: parsed.ctaLabel?.trim() || null,
    ctaHref: parsed.ctaHref?.trim() || null,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
  };

  if (parsed.id) {
    const previous = await prisma.programLevel.findUnique({
      where: { id: parsed.id },
      select: { slug: true },
    });
    await prisma.programLevel.update({ where: { id: parsed.id }, data });
    if (previous && previous.slug !== slug) {
      revalidatePath(`/propuesta/${previous.slug}`);
    }
  } else {
    await prisma.programLevel.create({ data: { landingPageId: landingPage.id, ...data } });
  }

  revalidatePath("/");
  revalidatePath("/admin/niveles");
  revalidatePath(`/propuesta/${slug}`);
}

export async function deleteProgramLevel(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));
  const existing = await prisma.programLevel.findUnique({
    where: { id },
    select: { slug: true },
  });

  await prisma.programLevel.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/niveles");
  if (existing) {
    revalidatePath(`/propuesta/${existing.slug}`);
  }
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
  revalidatePath("/admin/lenguas-extranjeras");
}

export async function deleteActivityTab(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.activityTab.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/actividades");
  revalidatePath("/admin/lenguas-extranjeras");
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

  const data = {
    caption: parsed.caption?.trim() || null,
    altText: parsed.altText?.trim() || parsed.caption?.trim() || "Instagram Northern",
    driveUrl: null,
    driveFileId: null,
    href: parsed.href,
    sortOrder: parsed.sortOrder,
    published: parsed.published,
  };

  if (parsed.id) {
    await prisma.instagramPost.update({ where: { id: parsed.id }, data });
  } else {
    await prisma.instagramPost.create({ data: { landingPageId: landingPage.id, ...data } });
  }

  revalidatePath("/");
  revalidatePath("/admin/mas-alla-del-aula");
}

export async function deleteInstagramPost(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.instagramPost.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/mas-alla-del-aula");
}

export async function upsertLocation(formData: FormData) {
  const parsed = locationSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();
  const driveImage = parsed.driveUrl?.trim()
    ? parseDriveImageUrl(parsed.driveUrl)
    : null;

  const data = {
    name: parsed.name,
    addressLines: parsed.addressLines,
    phone: parsed.phone?.trim() || null,
    body: parsed.body,
    altText: parsed.altText?.trim() || parsed.name,
    driveUrl: driveImage?.originalUrl ?? null,
    driveFileId: driveImage?.fileId ?? null,
    href: parsed.href?.trim() || null,
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
  revalidatePath("/admin/locales-y-espacios");
}

export async function deleteLocation(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));

  await prisma.location.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/sedes");
  revalidatePath("/admin/locales-y-espacios");
}

function revalidateContentRoutes(...adminRoutes: string[]) {
  revalidatePath("/");
  for (const route of adminRoutes) revalidatePath(route);
}

function optionalDriveImage(value?: string) {
  return value?.trim() ? parseDriveImageUrl(value) : null;
}

export async function getPhysicalEducation() {
  return prisma.physicalEducation.findFirst({
    where: { landingPage: { slug: HOME_SLUG } },
  });
}

export async function updatePhysicalEducation(formData: FormData) {
  const parsed = physicalEducationSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();
  const driveImage = optionalDriveImage(parsed.driveUrl);
  const data = {
    title: parsed.title,
    body: parsed.body,
    altText: parsed.altText?.trim() || parsed.title,
    driveUrl: driveImage?.originalUrl ?? null,
    driveFileId: driveImage?.fileId ?? null,
    ctaLabel: parsed.ctaLabel?.trim() || null,
    ctaHref: parsed.ctaHref?.trim() || null,
    published: parsed.published,
  };

  await prisma.physicalEducation.upsert({
    where: { landingPageId: landingPage.id },
    update: data,
    create: { landingPageId: landingPage.id, ...data },
  });
  revalidateContentRoutes("/admin/educacion-fisica");
}

export const upsertPhysicalEducation = updatePhysicalEducation;

export async function deletePhysicalEducation(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));
  await prisma.physicalEducation.delete({ where: { id } });
  revalidateContentRoutes("/admin/educacion-fisica");
}

export async function getMultidisciplinaryTeam() {
  return prisma.multidisciplinaryTeam.findFirst({
    where: { landingPage: { slug: HOME_SLUG } },
    include: { videos: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function updateMultidisciplinaryTeam(formData: FormData) {
  const parsed = multidisciplinaryTeamSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();
  const data = {
    title: parsed.title,
    body: parsed.body,
    published: parsed.published,
  };

  await prisma.multidisciplinaryTeam.upsert({
    where: { landingPageId: landingPage.id },
    update: data,
    create: { landingPageId: landingPage.id, ...data },
  });
  revalidateContentRoutes("/admin/equipo-multidisciplinario");
}

export const upsertMultidisciplinaryTeam = updateMultidisciplinaryTeam;

export async function deleteMultidisciplinaryTeam(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));
  await prisma.multidisciplinaryTeam.delete({ where: { id } });
  revalidateContentRoutes("/admin/equipo-multidisciplinario");
}

export async function getTeamVideos() {
  const team = await getMultidisciplinaryTeam();
  return team?.videos ?? [];
}

export async function upsertTeamVideo(formData: FormData) {
  const parsed = teamVideoSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();

  await prisma.$transaction(
    async (transaction) => {
      const team = await transaction.multidisciplinaryTeam.upsert({
        where: { landingPageId: landingPage.id },
        update: {},
        create: {
          landingPageId: landingPage.id,
          title: "Equipo multidisciplinario",
          body: "",
          published: false,
        },
      });
      const data = {
        url: parsed.url,
        sortOrder: parsed.sortOrder,
        published: parsed.published,
      };

      if (parsed.id) {
        const video = await transaction.teamVideo.findFirst({
          where: { id: parsed.id, multidisciplinaryTeamId: team.id },
          select: { id: true },
        });
        if (!video) throw new Error("Team video not found.");
        await transaction.teamVideo.update({ where: { id: video.id }, data });
        return;
      }

      const count = await transaction.teamVideo.count({
        where: { multidisciplinaryTeamId: team.id },
      });
      if (count >= 3) {
        throw new Error("The multidisciplinary team supports at most 3 videos.");
      }
      await transaction.teamVideo.create({
        data: { multidisciplinaryTeamId: team.id, ...data },
      });
    },
    { isolationLevel: "Serializable" },
  );

  revalidateContentRoutes("/admin/equipo-multidisciplinario");
}

export async function deleteTeamVideo(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));
  await prisma.teamVideo.delete({ where: { id } });
  revalidateContentRoutes("/admin/equipo-multidisciplinario");
}

export async function getInstitutionalProject() {
  return prisma.institutionalProject.findFirst({
    where: { landingPage: { slug: HOME_SLUG } },
  });
}

export async function updateInstitutionalProject(formData: FormData) {
  const parsed = institutionalProjectSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();
  const driveImage = optionalDriveImage(parsed.driveUrl);
  const data = {
    title: parsed.title,
    body: parsed.body,
    altText: parsed.altText?.trim() || parsed.title,
    driveUrl: driveImage?.originalUrl ?? null,
    driveFileId: driveImage?.fileId ?? null,
    published: parsed.published,
  };

  await prisma.institutionalProject.upsert({
    where: { landingPageId: landingPage.id },
    update: data,
    create: { landingPageId: landingPage.id, ...data },
  });
  revalidateContentRoutes("/admin/proyecto-institucional");
}

export const upsertInstitutionalProject = updateInstitutionalProject;

export async function deleteInstitutionalProject(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));
  await prisma.institutionalProject.delete({ where: { id } });
  revalidateContentRoutes("/admin/proyecto-institucional");
}

export async function getFinalShow() {
  return prisma.finalShow.findFirst({
    where: { landingPage: { slug: HOME_SLUG } },
  });
}

export async function updateFinalShow(formData: FormData) {
  const parsed = finalShowSchema.parse(Object.fromEntries(formData));
  const landingPage = await getLandingPageForAdmin();
  const data = {
    title: parsed.title,
    body: parsed.body,
    eventAt: parsed.eventAt ? new Date(parsed.eventAt) : null,
    videoUrl: parsed.videoUrl?.trim() || null,
    published: parsed.published,
  };

  await prisma.finalShow.upsert({
    where: { landingPageId: landingPage.id },
    update: data,
    create: { landingPageId: landingPage.id, ...data },
  });
  revalidateContentRoutes("/admin/muestra-final");
}

export const upsertFinalShow = updateFinalShow;

export async function deleteFinalShow(formData: FormData) {
  const id = z.string().min(1).parse(formData.get("id"));
  await prisma.finalShow.delete({ where: { id } });
  revalidateContentRoutes("/admin/muestra-final");
}

