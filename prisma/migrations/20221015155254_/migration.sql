/*
  Warnings:

  - You are about to drop the `AnalyticsItemView` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnalyticsItemView" DROP CONSTRAINT "AnalyticsItemView_itemsId_fkey";

-- DropForeignKey
ALTER TABLE "AnalyticsItemView" DROP CONSTRAINT "AnalyticsItemView_userUid_fkey";

-- DropTable
DROP TABLE "AnalyticsItemView";
