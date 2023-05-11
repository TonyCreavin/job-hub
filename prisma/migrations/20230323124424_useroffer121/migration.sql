/*
  Warnings:

  - You are about to drop the `UsersOnOffers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_user_applied_to_offer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsersOnOffers" DROP CONSTRAINT "UsersOnOffers_offerId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnOffers" DROP CONSTRAINT "UsersOnOffers_userId_fkey";

-- DropForeignKey
ALTER TABLE "_user_applied_to_offer" DROP CONSTRAINT "_user_applied_to_offer_A_fkey";

-- DropForeignKey
ALTER TABLE "_user_applied_to_offer" DROP CONSTRAINT "_user_applied_to_offer_B_fkey";

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "UsersOnOffers";

-- DropTable
DROP TABLE "_user_applied_to_offer";

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
