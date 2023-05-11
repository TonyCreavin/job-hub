/*
  Warnings:

  - The primary key for the `Consultant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Offer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UsersOnOffers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `consultantId` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsersOnOffers" DROP CONSTRAINT "UsersOnOffers_offerId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnOffers" DROP CONSTRAINT "UsersOnOffers_userId_fkey";

-- DropForeignKey
ALTER TABLE "_user_applied_offers" DROP CONSTRAINT "_user_applied_offers_A_fkey";

-- DropForeignKey
ALTER TABLE "_user_applied_offers" DROP CONSTRAINT "_user_applied_offers_B_fkey";

-- AlterTable
ALTER TABLE "Consultant" DROP CONSTRAINT "Consultant_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Consultant_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Consultant_id_seq";

-- AlterTable
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_pkey",
ADD COLUMN     "consultantId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Offer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Offer_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UsersOnOffers" DROP CONSTRAINT "UsersOnOffers_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "offerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UsersOnOffers_pkey" PRIMARY KEY ("userId", "offerId");

-- AlterTable
ALTER TABLE "_user_applied_offers" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "Consultant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnOffers" ADD CONSTRAINT "UsersOnOffers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnOffers" ADD CONSTRAINT "UsersOnOffers_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_applied_offers" ADD CONSTRAINT "_user_applied_offers_A_fkey" FOREIGN KEY ("A") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_applied_offers" ADD CONSTRAINT "_user_applied_offers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
