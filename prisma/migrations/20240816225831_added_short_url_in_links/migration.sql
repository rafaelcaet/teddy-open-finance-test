/*
  Warnings:

  - Added the required column `shortUrl` to the `Links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Links" ADD COLUMN     "shortUrl" VARCHAR(255) NOT NULL;
