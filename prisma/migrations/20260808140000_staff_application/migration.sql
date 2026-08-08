-- CreateTable
CREATE TABLE "StaffApplicationSection" (
    "id" TEXT NOT NULL,
    "landingPageId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Te gustaría hacer parte del staff Northern',
    "body" TEXT NOT NULL DEFAULT 'Envíanos tu curriculum aquí.',
    "successMessage" TEXT NOT NULL DEFAULT '¡Gracias! Recibimos tu postulación.',
    "submitLabel" TEXT NOT NULL DEFAULT 'Enviar postulación',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffApplicationSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffApplicationField" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "placeholder" TEXT,
    "options" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffApplicationField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffApplicationSubmission" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "answersJson" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StaffApplicationSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffApplicationSection_landingPageId_key" ON "StaffApplicationSection"("landingPageId");

-- CreateIndex
CREATE INDEX "StaffApplicationField_sectionId_sortOrder_idx" ON "StaffApplicationField"("sectionId", "sortOrder");

-- CreateIndex
CREATE INDEX "StaffApplicationSubmission_sectionId_createdAt_idx" ON "StaffApplicationSubmission"("sectionId", "createdAt");

-- AddForeignKey
ALTER TABLE "StaffApplicationSection" ADD CONSTRAINT "StaffApplicationSection_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "LandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffApplicationField" ADD CONSTRAINT "StaffApplicationField_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "StaffApplicationSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffApplicationSubmission" ADD CONSTRAINT "StaffApplicationSubmission_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "StaffApplicationSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
