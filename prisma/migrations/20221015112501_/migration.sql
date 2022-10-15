/*
  Warnings:

  - Made the column `attributeValuesId` on table `ItemAttributeValues` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ItemAttributeValues" DROP CONSTRAINT "ItemAttributeValues_attributeValuesId_fkey";

-- AlterTable
ALTER TABLE "ItemAttributeValues" ALTER COLUMN "attributeValuesId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ItemAttributeValues" ADD CONSTRAINT "ItemAttributeValues_attributeValuesId_fkey" FOREIGN KEY ("attributeValuesId") REFERENCES "AttributeValues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
