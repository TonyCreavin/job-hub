/*
  Warnings:

  - You are about to drop the column `consultantId` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the `Consultant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_user_applied_offers` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'APPLICANT', 'CONSULTANT');

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_consultantId_fkey";

-- DropForeignKey
ALTER TABLE "_user_applied_offers" DROP CONSTRAINT "_user_applied_offers_A_fkey";

-- DropForeignKey
ALTER TABLE "_user_applied_offers" DROP CONSTRAINT "_user_applied_offers_B_fkey";

-- DropIndex
DROP INDEX "User_linkedin_key";

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "consultantId",
DROP COLUMN "website",
ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "salary" TEXT;

-- DropTable
DROP TABLE "Consultant";

-- DropTable
DROP TABLE "_user_applied_offers";

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "website" TEXT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postcode" TEXT,
    "country" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_user_applied_to_offer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_id_key" ON "Company"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_user_applied_to_offer_AB_unique" ON "_user_applied_to_offer"("A", "B");

-- CreateIndex
CREATE INDEX "_user_applied_to_offer_B_index" ON "_user_applied_to_offer"("B");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_applied_to_offer" ADD CONSTRAINT "_user_applied_to_offer_A_fkey" FOREIGN KEY ("A") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_applied_to_offer" ADD CONSTRAINT "_user_applied_to_offer_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
