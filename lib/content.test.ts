import { describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { defaultLandingPageCreateData } from "@/lib/default-content";
import { landingPageSchema, photoSchema, programLevelSchema } from "@/lib/content";
import { slugify } from "@/lib/slugify";

describe("landing content validation", () => {
  it("accepts complete landing page form data", () => {
    const parsed = landingPageSchema.parse({
      title: "Colegio Northern",
      eyebrow: "Educacion",
      heroTitle: "Un colegio cercano",
      heroSubtitle: "Informacion para familias y comunidad.",
      ctaLabel: "Contactar",
      ctaHref: "mailto:info@northern.edu",
      contactTitle: "Hablemos",
      contactBody: "Escribinos para conocer mas.",
      contactEmail: "info@northern.edu",
      contactPhone: "",
      published: "true",
    });

    expect(parsed.published).toBe(true);
  });

  it("parses unchecked publish fields as false", () => {
    const parsed = photoSchema.parse({
      title: "Patio escolar",
      altText: "Estudiantes en el patio del colegio",
      caption: "",
      driveUrl: "https://drive.google.com/file/d/abc123/view",
      sortOrder: "0",
      published: "false",
    });

    expect(parsed.published).toBe(false);
  });

  it("ships default content with ordered sections", () => {
    const defaults = defaultLandingPageCreateData();

    expect(defaults.slug).toBe("home");
    expect(defaults.sections.create).toHaveLength(3);
    expect(defaults.sections.create.map((section) => section.sortOrder)).toEqual([0, 1, 2]);
  });

  it("accepts program level form data and generates slug from title", () => {
    const parsed = programLevelSchema.parse({
      title: "Educacion Inicial",
      slug: "",
      body: "Texto breve para la tarjeta.",
      detailBody: "Texto completo para la pagina de detalle.",
      driveUrl: "https://drive.google.com/file/d/abc123/view",
      sortOrder: "0",
      published: "true",
    });

    expect(parsed.slug).toBe("");
  });

  it("validates explicit program level slugs", () => {
    const parsed = programLevelSchema.parse({
      title: "Primaria",
      slug: "primaria",
      body: "Texto breve para la tarjeta.",
      detailBody: "Texto completo para la pagina de detalle.",
      driveUrl: "https://drive.google.com/file/d/abc123/view",
      sortOrder: "1",
      published: "true",
    });

    expect(parsed.slug).toBe("primaria");
  });
});

describe("slugify", () => {
  it("creates url-safe slugs from titles", () => {
    expect(slugify("Educación Inicial")).toBe("educacion-inicial");
    expect(slugify("  Primaria  ")).toBe("primaria");
  });
});
