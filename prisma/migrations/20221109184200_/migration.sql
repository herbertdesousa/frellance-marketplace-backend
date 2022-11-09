/*
  Warnings:

  - You are about to drop the column `path` on the `Attributes` table. All the data in the column will be lost.
  - You are about to drop the column `refAttributeClassName` on the `Attributes` table. All the data in the column will be lost.
  - You are about to drop the `RefAttributeClass` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attributes" DROP CONSTRAINT "Attributes_refAttributeClassName_fkey";

-- AlterTable
ALTER TABLE "Attributes" DROP COLUMN "path",
DROP COLUMN "refAttributeClassName";

-- DropTable
DROP TABLE "RefAttributeClass";
