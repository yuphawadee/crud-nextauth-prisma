-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "stId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
