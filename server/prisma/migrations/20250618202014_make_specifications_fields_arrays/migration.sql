/*
  Warnings:

  - The `structure` column on the `PropertySpecification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `brickwork` column on the `PropertySpecification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `windows` column on the `PropertySpecification` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PropertySpecification" DROP COLUMN "structure",
ADD COLUMN     "structure" TEXT[],
DROP COLUMN "brickwork",
ADD COLUMN     "brickwork" TEXT[],
DROP COLUMN "windows",
ADD COLUMN     "windows" TEXT[];
