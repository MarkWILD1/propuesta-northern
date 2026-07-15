-- Preserve the existing "Photo" table while evolving it into workshops.
ALTER TABLE "Photo"
  ADD COLUMN "body" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "href" TEXT;

-- Instagram posts created from now on only require their destination URL.
ALTER TABLE "InstagramPost"
  ALTER COLUMN "altText" SET DEFAULT '',
  ALTER COLUMN "driveUrl" DROP NOT NULL,
  ALTER COLUMN "driveFileId" DROP NOT NULL;

UPDATE "InstagramPost"
SET "href" = COALESCE(NULLIF("href", ''), "driveUrl")
WHERE "href" IS NULL OR "href" = '';

ALTER TABLE "InstagramPost"
  ALTER COLUMN "href" SET NOT NULL;

-- Editorial location card fields use compatible defaults for existing rows.
ALTER TABLE "Location"
  ADD COLUMN "body" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "altText" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "driveUrl" TEXT,
  ADD COLUMN "driveFileId" TEXT,
  ADD COLUMN "href" TEXT;

CREATE TABLE "PhysicalEducation" (
  "id" TEXT NOT NULL,
  "landingPageId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "altText" TEXT NOT NULL DEFAULT '',
  "driveUrl" TEXT,
  "driveFileId" TEXT,
  "ctaLabel" TEXT,
  "ctaHref" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "PhysicalEducation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MultidisciplinaryTeam" (
  "id" TEXT NOT NULL,
  "landingPageId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MultidisciplinaryTeam_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TeamVideo" (
  "id" TEXT NOT NULL,
  "multidisciplinaryTeamId" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL,
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "TeamVideo_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "InstitutionalProject" (
  "id" TEXT NOT NULL,
  "landingPageId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "altText" TEXT NOT NULL DEFAULT '',
  "driveUrl" TEXT,
  "driveFileId" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "InstitutionalProject_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FinalShow" (
  "id" TEXT NOT NULL,
  "landingPageId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "eventAt" TIMESTAMP(3),
  "videoUrl" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "FinalShow_pkey" PRIMARY KEY ("id")
);

INSERT INTO "PhysicalEducation" ("id", "landingPageId", "title", "body", "published", "updatedAt")
SELECT 'physical-' || "id", "id", 'Educación física', '', false, CURRENT_TIMESTAMP
FROM "LandingPage";
INSERT INTO "MultidisciplinaryTeam" ("id", "landingPageId", "title", "body", "published", "updatedAt")
SELECT 'team-' || "id", "id", 'Equipo multidisciplinario', '', false, CURRENT_TIMESTAMP
FROM "LandingPage";
INSERT INTO "InstitutionalProject" ("id", "landingPageId", "title", "body", "published", "updatedAt")
SELECT 'project-' || "id", "id", 'Proyecto institucional', '', false, CURRENT_TIMESTAMP
FROM "LandingPage";
INSERT INTO "FinalShow" ("id", "landingPageId", "title", "body", "published", "updatedAt")
SELECT 'show-' || "id", "id", 'Muestra final', '', false, CURRENT_TIMESTAMP
FROM "LandingPage";

CREATE UNIQUE INDEX "PhysicalEducation_landingPageId_key" ON "PhysicalEducation"("landingPageId");
CREATE UNIQUE INDEX "MultidisciplinaryTeam_landingPageId_key" ON "MultidisciplinaryTeam"("landingPageId");
CREATE INDEX "TeamVideo_multidisciplinaryTeamId_sortOrder_idx" ON "TeamVideo"("multidisciplinaryTeamId", "sortOrder");
CREATE UNIQUE INDEX "InstitutionalProject_landingPageId_key" ON "InstitutionalProject"("landingPageId");
CREATE UNIQUE INDEX "FinalShow_landingPageId_key" ON "FinalShow"("landingPageId");

ALTER TABLE "PhysicalEducation"
  ADD CONSTRAINT "PhysicalEducation_landingPageId_fkey"
  FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MultidisciplinaryTeam"
  ADD CONSTRAINT "MultidisciplinaryTeam_landingPageId_fkey"
  FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TeamVideo"
  ADD CONSTRAINT "TeamVideo_multidisciplinaryTeamId_fkey"
  FOREIGN KEY ("multidisciplinaryTeamId") REFERENCES "MultidisciplinaryTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "InstitutionalProject"
  ADD CONSTRAINT "InstitutionalProject_landingPageId_fkey"
  FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FinalShow"
  ADD CONSTRAINT "FinalShow_landingPageId_fkey"
  FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
