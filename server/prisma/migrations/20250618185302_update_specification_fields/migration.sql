/*
  Warnings:

  - Added the required column `elevator` to the `PropertySpecification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waterSupply` to the `PropertySpecification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PropertySpecification" ADD COLUMN     "bathrooms" TEXT[],
ADD COLUMN     "brickwork" TEXT[],
ADD COLUMN     "doors" TEXT[],
ADD COLUMN     "electrical" TEXT[],
ADD COLUMN     "elevator" TEXT NOT NULL,
ADD COLUMN     "externalFinishing" TEXT[],
ADD COLUMN     "flooring" TEXT[],
ADD COLUMN     "interiorFinishing" TEXT[],
ADD COLUMN     "kitchen" TEXT[],
ADD COLUMN     "structure" TEXT[],
ADD COLUMN     "waterSupply" TEXT NOT NULL,
ADD COLUMN     "windows" TEXT[];
