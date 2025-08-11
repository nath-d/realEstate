-- CreateTable
CREATE TABLE "AboutContent" (
    "id" SERIAL NOT NULL,
    "headerTitle" TEXT NOT NULL DEFAULT 'Our Story',
    "headerSubtitle" TEXT,
    "heroImageUrl" TEXT,
    "heroImageCaption" TEXT,
    "rightHeading" TEXT,
    "rightParagraph1" TEXT,
    "rightParagraph2" TEXT,
    "stat1Label" TEXT DEFAULT 'Years of Excellence',
    "stat1Value" TEXT DEFAULT '13+',
    "stat2Label" TEXT DEFAULT 'Happy Customers',
    "stat2Value" TEXT DEFAULT '50K+',
    "stat3Label" TEXT DEFAULT 'Cities Covered',
    "stat3Value" TEXT DEFAULT '100+',
    "ctaText" TEXT DEFAULT 'Learn More About Us',
    "ctaLink" TEXT DEFAULT '/about',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutTimelineItem" (
    "id" SERIAL NOT NULL,
    "year" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "aboutContentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutTimelineItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AboutTimelineItem" ADD CONSTRAINT "AboutTimelineItem_aboutContentId_fkey" FOREIGN KEY ("aboutContentId") REFERENCES "AboutContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
