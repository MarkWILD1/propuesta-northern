import { ActivityTabs } from "@/components/landing/activity-tabs";
import { FeaturedBlocks } from "@/components/landing/featured-blocks";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { InstagramBand } from "@/components/landing/instagram-band";
import { NewsGrid } from "@/components/landing/news-grid";
import { PhotoGallery } from "@/components/landing/photo-gallery";
import { ProgramLevels } from "@/components/landing/program-levels";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { StatsCounter } from "@/components/landing/stats-counter";
import { WhatsAppFab } from "@/components/landing/whatsapp-fab";
import type { PublishedLandingPage } from "@/lib/content";

export function LandingPage({ page }: { page: PublishedLandingPage }) {
  return (
    <div id="top">
      <SiteHeader
        brand={page.title}
        eyebrow={page.eyebrow}
        links={page.navLinks}
        ctaLabel={page.ctaLabel}
        ctaHref={page.ctaHref}
      />

      <ScrollReveal>
        <section className="hero" aria-label="Galeria destacada">
          <HeroCarousel slides={page.carouselSlides} />
        </section>

        <section className="intro page-shell" aria-labelledby="intro-title">
          <p className="section-kicker">{page.eyebrow}</p>
          <h1 id="intro-title" className="display intro-title">
            {page.heroTitle}
          </h1>
          <p className="intro-body">{page.heroSubtitle}</p>
        </section>

        <ProgramLevels title={page.levelsTitle} levels={page.programLevels} />

        <StatsCounter title={page.statsTitle} stats={page.stats} />

        <FeaturedBlocks
          title={page.featuredTitle}
          pageTitle={page.title}
          blocks={page.sections}
        />

        <ActivityTabs title={page.activitiesTitle} activities={page.activities} />

        <div className="page-shell">
          <PhotoGallery photos={page.photos} title={page.galleryTitle} />
        </div>

        <NewsGrid title={page.newsTitle} items={page.news} />

        <InstagramBand
          title={page.instagramTitle}
          profileUrl={page.instagramUrl}
          posts={page.instagramPosts}
        />
      </ScrollReveal>

      <SiteFooter
        brand={page.title}
        contactTitle={page.contactTitle}
        contactBody={page.contactBody}
        contactEmail={page.contactEmail}
        contactPhone={page.contactPhone}
        locations={page.locations}
      />

      <WhatsAppFab phone={page.contactPhone} />
    </div>
  );
}
