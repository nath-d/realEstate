-- CreateTable
CREATE TABLE "FutureVisionContent" (
    "id" SERIAL NOT NULL,
    "visionText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FutureVisionContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FutureVisionGoal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FutureVisionGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FutureVisionTimelineItem" (
    "id" SERIAL NOT NULL,
    "year" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FutureVisionTimelineItem_pkey" PRIMARY KEY ("id")
);
