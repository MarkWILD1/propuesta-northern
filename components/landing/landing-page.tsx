import { ActivityTabs } from "@/components/landing/activity-tabs";
import { FeaturedBlocks } from "@/components/landing/featured-blocks";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { InstagramBand } from "@/components/landing/instagram-band";
import { NewsGrid } from "@/components/landing/news-grid";
import { PhotoGallery } from "@/components/landing/photo-gallery";
import { ProgramLevels } from "@/components/landing/program-levels";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { StatsCounter } from "@/components/landing/stats-counter";

type Section = {
  id: string;
  title: string;
  body: string;
  ctaLabel: string | null;
  ctaHref: string | null;
};

type Photo = {
  id: string;
  title: string;
  altText: string;
  caption: string | null;
  driveFileId: string;
};

type CarouselSlide = {
  id: string;
  title: string;
  altText: string;
  caption: string | null;
  driveFileId: string;
};

type NavLink = {
  id: string;
  label: string;
  href: string;
};

type ProgramLevel = {
  id: string;
  title: string;
  body: string;
  altText: string;
  driveFileId: string;
  ctaLabel: string | null;
  ctaHref: string | null;
};

type StatItem = {
  id: string;
  label: string;
  value: string;
};

type ActivityTab = {
  id: string;
  title: string;
  body: string;
  altText: string | null;
  driveFileId: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
};

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  dateLabel: string | null;
  altText: string | null;
  driveFileId: string | null;
  href: string | null;
};

type InstagramPost = {
  id: string;
  caption: string | null;
  altText: string;
  driveFileId: string;
  href: string | null;
};

type Location = {
  id: string;
  name: string;
  addressLines: string;
  phone: string | null;
};

type LandingPageContent = {
  title: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaLabel: string;
  ctaHref: string;
  levelsTitle: string;
  statsTitle: string;
  featuredTitle: string;
  activitiesTitle: string;
  galleryTitle: string;
  newsTitle: string;
  instagramTitle: string;
  instagramUrl: string;
  contactTitle: string;
  contactBody: string;
  contactEmail: string;
  contactPhone: string | null;
  sections: Section[];
  photos: Photo[];
  carouselSlides: CarouselSlide[];
  navLinks: NavLink[];
  programLevels: ProgramLevel[];
  stats: StatItem[];
  activities: ActivityTab[];
  news: NewsItem[];
  instagramPosts: InstagramPost[];
  locations: Location[];
};

export function LandingPage({ page }: { page: LandingPageContent }) {
  return (
    <div id="top">
      <SiteHeader
        brand={page.title}
        eyebrow={page.eyebrow}
        links={page.navLinks}
        ctaLabel={page.ctaLabel}
        ctaHref={page.ctaHref}
      />

      <main className="landing">
        <section className="hero page-shell" aria-label="Galeria destacada">
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
      </main>

      <SiteFooter
        brand={page.title}
        contactTitle={page.contactTitle}
        contactBody={page.contactBody}
        contactEmail={page.contactEmail}
        contactPhone={page.contactPhone}
        locations={page.locations}
      />
    </div>
  );
}
