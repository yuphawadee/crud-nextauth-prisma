/*
  Warnings:

  - A unique constraint covering the columns `[stId]` on the table `Internship` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Internship_stId_key" ON "Internship"("stId");
