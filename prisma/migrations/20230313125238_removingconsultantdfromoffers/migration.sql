/*
  Warnings:

  - You are about to drop the column `consultantId` on the `Offer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_consultantId_fkey";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "consultantId";
