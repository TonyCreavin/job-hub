/*
  Warnings:

  - You are about to drop the column `coverletter` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cv` on the `User` table. All the data in the column will be lost.
  - Added the required column `coverLetter` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cv` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "applied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "coverLetter" TEXT NOT NULL,
ADD COLUMN     "cv" TEXT NOT NULL,
ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "coverletter",
DROP COLUMN "cv";
