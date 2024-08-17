/*
  Warnings:

  - A unique constraint covering the columns `[shortUrl]` on the table `Links` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Links_shortUrl_key" ON "Links"("shortUrl");
