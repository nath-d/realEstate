-- CreateTable
CREATE TABLE "MaterialCertification" (
    "id" SERIAL NOT NULL,
    "material" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "certificate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "propertyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaterialCertification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MaterialCertification" ADD CONSTRAINT "MaterialCertification_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
