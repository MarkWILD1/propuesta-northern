import { LandingPage } from "@/components/landing/landing-page";
import { getPublishedLandingPage } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const page = await getPublishedLandingPage();

  if (!page) {
    return (
      <main className="page-shell empty-public">
        <h1 className="display">Colegio Northern</h1>
        <p>La landing page no esta publicada todavia.</p>
      </main>
    );
  }

  return <LandingPage page={page} />;
}
