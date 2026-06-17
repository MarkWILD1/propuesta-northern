-- AlterTable LandingPage: editable band titles + instagram url
ALTER TABLE "LandingPage" ADD COLUMN "levelsTitle" TEXT NOT NULL DEFAULT 'Propuesta educativa';
ALTER TABLE "LandingPage" ADD COLUMN "statsTitle" TEXT NOT NULL DEFAULT 'Nuestra comunidad en numeros';
ALTER TABLE "LandingPage" ADD COLUMN "featuredTitle" TEXT NOT NULL DEFAULT 'Lo que nos define';
ALTER TABLE "LandingPage" ADD COLUMN "activitiesTitle" TEXT NOT NULL DEFAULT 'Vida en el colegio';
ALTER TABLE "LandingPage" ADD COLUMN "galleryTitle" TEXT NOT NULL DEFAULT 'Momentos de la comunidad Northern';
ALTER TABLE "LandingPage" ADD COLUMN "newsTitle" TEXT NOT NULL DEFAULT 'Noticias';
ALTER TABLE "LandingPage" ADD COLUMN "instagramTitle" TEXT NOT NULL DEFAULT 'Seguinos en Instagram';
ALTER TABLE "LandingPage" ADD COLUMN "instagramUrl" TEXT NOT NULL DEFAULT '';

-- AlterTable LandingSection: optional CTA
ALTER TABLE "LandingSection" ADD COLUMN "ctaLabel" TEXT;
ALTER TABLE "LandingSection" ADD COLUMN "ctaHref" TEXT;

-- CreateTable
CREATE TABLE "NavLink" (
    "id" TEXT NOT NULL,
    "landingPageId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NavLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramLevel" (
    "id" TEXT NOT NULL,
    "landingPageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "altText" TEXT NOT NULL,
    "driveUrl" TEXT NOT NULL,
    "driveFileId" TEXT NOT NULL,
    "ctaLabel" TEXT,
    "ctaHref" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatItem" (
    "id" TEXT NOT NULL,
    "landingPageId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityTab" (
    "id" TEXT NOT NULL,
    "landingPageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "altText" TEXT,
    "driveUrl" TEXT,
    "driveFileId" TEXT,
    "ctaLabel" TEXT,
    "ctaHref" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityTab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsItem" (
    "id" TEXT NOT NULL,
    "landingPageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "dateLabel" TEXT,
    "altText" TEXT,
    "driveUrl" TEXT,
    "driveFileId" TEXT,
    "href" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstagramPost" (
    "id" TEXT NOT NULL,
    "landingPageId" TEXT NOT NULL,
    "caption" TEXT,
    "altText" TEXT NOT NULL,
    "driveUrl" TEXT NOT NULL,
    "driveFileId" TEXT NOT NULL,
    "href" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstagramPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "landingPageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addressLines" TEXT NOT NULL,
    "phone" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NavLink_landingPageId_sortOrder_idx" ON "NavLink"("landingPageId", "sortOrder");
CREATE INDEX "ProgramLevel_landingPageId_sortOrder_idx" ON "ProgramLevel"("landingPageId", "sortOrder");
CREATE INDEX "StatItem_landingPageId_sortOrder_idx" ON "StatItem"("landingPageId", "sortOrder");
CREATE INDEX "ActivityTab_landingPageId_sortOrder_idx" ON "ActivityTab"("landingPageId", "sortOrder");
CREATE INDEX "NewsItem_landingPageId_sortOrder_idx" ON "NewsItem"("landingPageId", "sortOrder");
CREATE INDEX "InstagramPost_landingPageId_sortOrder_idx" ON "InstagramPost"("landingPageId", "sortOrder");
CREATE INDEX "Location_landingPageId_sortOrder_idx" ON "Location"("landingPageId", "sortOrder");

-- AddForeignKey
ALTER TABLE "NavLink" ADD CONSTRAINT "NavLink_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProgramLevel" ADD CONSTRAINT "ProgramLevel_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StatItem" ADD CONSTRAINT "StatItem_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ActivityTab" ADD CONSTRAINT "ActivityTab_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "NewsItem" ADD CONSTRAINT "NewsItem_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "InstagramPost" ADD CONSTRAINT "InstagramPost_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Location" ADD CONSTRAINT "Location_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
