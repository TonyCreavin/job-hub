/*
  Warnings:

  - The primary key for the `Consultant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Consultant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Consultant" DROP CONSTRAINT "Consultant_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Consultant_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Consultant_id_key" ON "Consultant"("id");
