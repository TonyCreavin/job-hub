/*
  Warnings:

  - You are about to drop the column `companyId` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyDescription` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_companyId_fkey";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "companyId",
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "companyDescription" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL;

-- DropTable
DROP TABLE "Company";
