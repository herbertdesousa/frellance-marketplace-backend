/*
  Warnings:

  - Added the required column `signInMethod` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT,
ADD COLUMN     "picture" TEXT,
ADD COLUMN     "signInMethod" TEXT NOT NULL;
