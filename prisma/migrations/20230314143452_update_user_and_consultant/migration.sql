/*
  Warnings:

  - Added the required column `company` to the `Consultant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consultant" ADD COLUMN     "company" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "consultantId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coverletter" TEXT,
ADD COLUMN     "cv" TEXT;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "Consultant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
