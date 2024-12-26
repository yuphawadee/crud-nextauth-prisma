-- CreateTable
CREATE TABLE "Internship" (
    "id" SERIAL NOT NULL,
    "year" TEXT NOT NULL,
    "stId" TEXT NOT NULL,
    "comId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);
