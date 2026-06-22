-- AlterTable
ALTER TABLE "ProgramLevel" ADD COLUMN "slug" TEXT;
ALTER TABLE "ProgramLevel" ADD COLUMN "detailBody" TEXT;

-- Backfill detailBody from card excerpt
UPDATE "ProgramLevel" SET "detailBody" = "body" WHERE "detailBody" IS NULL;

-- Backfill slug from title
UPDATE "ProgramLevel"
SET "slug" = lower(
  regexp_replace(
    regexp_replace(trim("title"), '[^a-zA-Z0-9]+', '-', 'g'),
    '(^-|-$)',
    '',
    'g'
  )
)
WHERE "slug" IS NULL;

-- Resolve duplicate slugs within the same landing page
UPDATE "ProgramLevel" pl
SET "slug" = pl."slug" || '-' || left(pl."id", 6)
FROM (
  SELECT "id"
  FROM (
    SELECT
      "id",
      row_number() OVER (
        PARTITION BY "landingPageId", "slug"
        ORDER BY "sortOrder", "createdAt"
      ) AS rn
    FROM "ProgramLevel"
  ) ranked
  WHERE rn > 1
) duplicates
WHERE pl."id" = duplicates."id";

-- Make columns required
ALTER TABLE "ProgramLevel" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "ProgramLevel" ALTER COLUMN "detailBody" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProgramLevel_landingPageId_slug_key" ON "ProgramLevel"("landingPageId", "slug");
