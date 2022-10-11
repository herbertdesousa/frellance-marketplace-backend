/*
  Warnings:

  - You are about to drop the `CategoryAttributeValues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemAddresses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `refAttributeClassName` to the `Attributes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoryAttributeValues" DROP CONSTRAINT "CategoryAttributeValues_attributeValuesId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryAttributeValues" DROP CONSTRAINT "CategoryAttributeValues_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ItemAddresses" DROP CONSTRAINT "ItemAddresses_itemId_fkey";

-- DropForeignKey
ALTER TABLE "ItemAttributeValues" DROP CONSTRAINT "ItemAttributeValues_itemId_fkey";

-- AlterTable
ALTER TABLE "AttributeValues" ADD COLUMN     "default" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Attributes" ADD COLUMN     "refAttributeClassName" TEXT NOT NULL;

-- DropTable
DROP TABLE "CategoryAttributeValues";

-- DropTable
DROP TABLE "ItemAddresses";

-- CreateTable
CREATE TABLE "RefAttributeClass" (
    "name" TEXT NOT NULL,

    CONSTRAINT "RefAttributeClass_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "CategoryAttribute" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "attributesId" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefAttributeClass_name_key" ON "RefAttributeClass"("name");

-- AddForeignKey
ALTER TABLE "Attributes" ADD CONSTRAINT "Attributes_refAttributeClassName_fkey" FOREIGN KEY ("refAttributeClassName") REFERENCES "RefAttributeClass"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryAttribute" ADD CONSTRAINT "CategoryAttribute_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryAttribute" ADD CONSTRAINT "CategoryAttribute_attributesId_fkey" FOREIGN KEY ("attributesId") REFERENCES "Attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemAttributeValues" ADD CONSTRAINT "ItemAttributeValues_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
