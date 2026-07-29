-- AlterTable
ALTER TABLE "LandingPage" ALTER COLUMN "slug" SET DEFAULT 'home';

-- AlterTable
ALTER TABLE "NavLink" ADD COLUMN     "highlight" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "linkType" TEXT NOT NULL DEFAULT 'SECTION',
ADD COLUMN     "openInNewTab" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "AnnouncementBar" (
    "id" TEXT NOT NULL,
    "landingPageId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "linkLabel" TEXT,
    "linkType" TEXT NOT NULL DEFAULT 'NONE',
    "href" TEXT,
    "openInNewTab" BOOLEAN NOT NULL DEFAULT false,
    "dismissible" BOOLEAN NOT NULL DEFAULT true,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnnouncementBar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnnouncementBar_landingPageId_key" ON "AnnouncementBar"("landingPageId");

-- AddForeignKey
ALTER TABLE "AnnouncementBar" ADD CONSTRAINT "AnnouncementBar_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
