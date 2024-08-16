/*
  Warnings:

  - You are about to drop the `links` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_usersId_fkey";

-- AlterTable
ALTER TABLE "Links" ALTER COLUMN "url" SET DEFAULT '';

-- DropTable
DROP TABLE "links";

-- DropTable
DROP TABLE "users";
