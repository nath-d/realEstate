/*
  Warnings:

  - You are about to drop the `Amenity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertySpecification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Amenity" DROP CONSTRAINT "Amenity_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "PropertySpecification" DROP CONSTRAINT "PropertySpecification_propertyId_fkey";

-- DropTable
DROP TABLE "Amenity";

-- DropTable
DROP TABLE "PropertySpecification";
