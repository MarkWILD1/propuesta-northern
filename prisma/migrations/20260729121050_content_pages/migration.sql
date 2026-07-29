-- CreateTable
CREATE TABLE "ContentPage" (
    "id" TEXT NOT NULL,
    "landingPageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "altText" TEXT NOT NULL DEFAULT '',
    "driveUrl" TEXT,
    "driveFileId" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContentPage_landingPageId_sortOrder_idx" ON "ContentPage"("landingPageId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ContentPage_landingPageId_slug_key" ON "ContentPage"("landingPageId", "slug");

-- AddForeignKey
ALTER TABLE "ContentPage" ADD CONSTRAINT "ContentPage_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
