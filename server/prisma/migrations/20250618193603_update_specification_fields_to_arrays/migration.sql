/*
  Warnings:

  - The `elevator` column on the `PropertySpecification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `waterSupply` column on the `PropertySpecification` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PropertySpecification" DROP COLUMN "elevator",
ADD COLUMN     "elevator" TEXT[],
DROP COLUMN "waterSupply",
ADD COLUMN     "waterSupply" TEXT[];
