import {
  CarouselSlideForm,
  CarouselSlidePreview,
  DeleteCarouselSlideForm,
} from "@/components/admin/carousel-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminCarouselPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder =
    page.carouselSlides.length > 0
      ? Math.max(...page.carouselSlides.map((slide) => slide.sortOrder)) + 1
      : 0;

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Carrusel del hero</p>
        <h1 className="display">Imagenes destacadas del inicio.</h1>
        <p className="muted">
          Estas imagenes solo aparecen en el carrusel del hero, separado de la
          galeria. Pega links publicos de Google Drive y ordenalas.
        </p>
      </header>

      <CarouselSlideForm nextSortOrder={nextSortOrder} />

      <section className="admin-grid" aria-label="Slides guardados">
        {page.carouselSlides.map((slide) => (
          <article key={slide.id} className="admin-card stack">
            <CarouselSlidePreview slide={slide} />
            <CarouselSlideForm slide={slide} />
            <DeleteCarouselSlideForm id={slide.id} />
          </article>
        ))}
      </section>
    </div>
  );
}
