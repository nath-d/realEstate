/*
  Warnings:

  - You are about to drop the column `isActive` on the `WhyChooseUsReason` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `WhyChooseUsReason` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WhyChooseUsReason" DROP COLUMN "isActive",
DROP COLUMN "order";
