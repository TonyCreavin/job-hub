/*
  Warnings:

  - The primary key for the `UsersOnOffers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `UsersOnOffers` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `UsersOnOffers` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "UsersOnOffers" DROP CONSTRAINT "UsersOnOffers_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "UsersOnOffers_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "UsersOnOffers_id_key" ON "UsersOnOffers"("id");
