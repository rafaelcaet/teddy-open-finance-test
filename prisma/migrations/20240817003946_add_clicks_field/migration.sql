/*
  Warnings:

  - You are about to drop the column `clicksCount` on the `Links` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Links" DROP COLUMN "clicksCount",
ADD COLUMN     "clicks" INTEGER NOT NULL DEFAULT 0;
