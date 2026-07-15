import {
  DeleteInstagramPostForm,
  InstagramPostForm,
  InstagramPostPreview,
} from "@/components/admin/instagram-forms";
import { LandingTitleForm } from "@/components/admin/landing-title-form";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminMasAllaDelAulaPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder = page.instagramPosts.length
    ? Math.max(...page.instagramPosts.map((post) => post.sortOrder)) + 1
    : 0;
  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Más allá del aula</p>
        <h1 className="display">Publicaciones sociales.</h1>
        <p className="muted">Agrega la URL pública de cada post de Instagram.</p>
      </header>
      <LandingTitleForm field="instagramTitle" value={page.instagramTitle} />
      <InstagramPostForm nextSortOrder={nextSortOrder} />
      <section className="admin-grid" aria-label="Publicaciones guardadas">
        {page.instagramPosts.map((post) => (
          <article key={post.id} className="admin-card stack">
            <InstagramPostPreview post={post} />
            <InstagramPostForm post={post} />
            <DeleteInstagramPostForm id={post.id} />
          </article>
        ))}
      </section>
    </div>
  );
}
