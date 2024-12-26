/*
  Warnings:

  - A unique constraint covering the columns `[comId]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Organization_comId_key" ON "Organization"("comId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_stId_key" ON "Student"("stId");

-- AddForeignKey
ALTER TABLE "Internship" ADD CONSTRAINT "Internship_stId_fkey" FOREIGN KEY ("stId") REFERENCES "Student"("stId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Internship" ADD CONSTRAINT "Internship_comId_fkey" FOREIGN KEY ("comId") REFERENCES "Organization"("comId") ON DELETE RESTRICT ON UPDATE CASCADE;
