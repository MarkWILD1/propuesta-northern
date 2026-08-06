import { ActivityTabs } from "@/components/landing/activity-tabs";
import { FeatureMedia } from "@/components/landing/feature-media";
import { FeaturedBlocks } from "@/components/landing/featured-blocks";
import { FinalShow } from "@/components/landing/final-show";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { InstagramBand } from "@/components/landing/instagram-band";
import { LocalesSection } from "@/components/landing/locales-section";
import { ProgramLevels } from "@/components/landing/program-levels";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { StatsCounter } from "@/components/landing/stats-counter";
import { TeamSection } from "@/components/landing/team-section";
import { Workshops } from "@/components/landing/workshops";
import { WhatsAppFab } from "@/components/landing/whatsapp-fab";
import type { PublishedLandingPage } from "@/lib/content";

export function LandingPage({ page }: { page: PublishedLandingPage }) {
  return (
    <div id="top">
      <SiteHeader
        brand={page.title}
        eyebrow={page.eyebrow}
        navLinks={page.navLinks}
        announcement={page.announcementBar}
      />

      <ScrollReveal>
        {/* 1. Carrusel */}
        <section className="hero" aria-label="Galeria destacada">
          <HeroCarousel slides={page.carouselSlides} />
        </section>

        {/* 2. Contenido */}
        <section className="intro page-shell" aria-labelledby="intro-title">
          <p className="section-kicker">{page.eyebrow}</p>
          <h1 id="intro-title" className="display intro-title">
            {page.heroTitle}
          </h1>
          <p className="intro-body">{page.heroSubtitle}</p>
        </section>

        {/* 3. Niveles */}
        <ProgramLevels title={page.levelsTitle} levels={page.programLevels} />

        {/* 4. Estadistica */}
        <StatsCounter title={page.statsTitle} stats={page.stats} />

        {/* 5. Lo que nos define */}
        <FeaturedBlocks
          title={page.featuredTitle}
          pageTitle={page.title}
          blocks={page.sections}
        />

        {/* 6. Lenguas extranjeras */}
        <ActivityTabs
          title={page.activitiesTitle}
          kicker={page.activitiesKicker}
          activities={page.activities}
        />

        {/* 7. Talleres */}
        <Workshops title={page.galleryTitle} workshops={page.workshops} />

        {/* 8. Educacion Fisica */}
        <FeatureMedia
          content={page.physicalEducation}
          sectionId="educacion-fisica"
          kicker="Educación Física"
        />

        {/* 9. Equipo multidisciplinario */}
        <TeamSection team={page.multidisciplinaryTeam} />

        {/* 10. Proyecto institucional */}
        <FeatureMedia
          content={page.institutionalProject}
          sectionId="proyecto-institucional"
          kicker="Proyecto institucional"
          reversed
        />

        {/* 11. Mas alla del aula */}
        <InstagramBand
          title={page.instagramTitle}
          profileUrl={page.instagramUrl}
          posts={page.instagramPosts}
        />

        {/* 12. Locales y espacios */}
        <LocalesSection title="Nuestros espacios" locales={page.locations} />

        {/* 13. Countdown - The Final Show */}
        <FinalShow
          content={
            page.finalShow
              ? {
                  title: page.finalShow.title,
                  body: page.finalShow.body,
                  eventAt: page.finalShow.eventAt
                    ? page.finalShow.eventAt.toISOString()
                    : null,
                  videoUrl: page.finalShow.videoUrl,
                }
              : null
          }
        />
      </ScrollReveal>

      {/* 14. Footer */}
      <SiteFooter
        brand={page.title}
        contactTitle={page.contactTitle}
        contactBody={page.contactBody}
        contactEmail={page.contactEmail}
        contactPhone={page.contactPhone}
      />

      <WhatsAppFab phone={page.contactPhone} />
    </div>
  );
}
