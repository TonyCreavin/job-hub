/*
  Warnings:

  - The `phone` column on the `Consultant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `postcode` column on the `Consultant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `phone` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `postcode` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Consultant" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER,
DROP COLUMN "postcode",
ADD COLUMN     "postcode" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER,
DROP COLUMN "postcode",
ADD COLUMN     "postcode" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Consultant_phone_key" ON "Consultant"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
