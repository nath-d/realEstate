-- CreateTable
CREATE TABLE "PropertySpecification" (
    "id" SERIAL NOT NULL,
    "structure" TEXT NOT NULL DEFAULT '',
    "brickwork" TEXT NOT NULL DEFAULT '',
    "windows" TEXT NOT NULL DEFAULT '',
    "propertyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertySpecification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertySpecification_propertyId_key" ON "PropertySpecification"("propertyId");

-- AddForeignKey
ALTER TABLE "PropertySpecification" ADD CONSTRAINT "PropertySpecification_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
