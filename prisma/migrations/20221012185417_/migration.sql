/*
  Warnings:

  - Added the required column `iconName` to the `Categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "iconName" TEXT NOT NULL;
