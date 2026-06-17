import {
  DeleteInstagramPostForm,
  InstagramPostForm,
  InstagramPostPreview,
} from "@/components/admin/instagram-forms";
import { getLandingPageForAdmin } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminInstagramPage() {
  const page = await getLandingPageForAdmin();
  const nextSortOrder =
    page.instagramPosts.length > 0
      ? Math.max(...page.instagramPosts.map((post) => post.sortOrder)) + 1
      : 0;

  return (
    <div className="stack">
      <header className="admin-header">
        <p className="eyebrow">Instagram</p>
        <h1 className="display">Feed de Instagram.</h1>
        <p className="muted">
          Imagenes que aparecen en la banda &quot;Seguinos en Instagram&quot;. El
          link general del perfil se configura en Contenido.
        </p>
      </header>

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
