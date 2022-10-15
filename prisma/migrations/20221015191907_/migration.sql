-- DropForeignKey
ALTER TABLE "AnalyticsRequestContact" DROP CONSTRAINT "AnalyticsRequestContact_itemsId_fkey";

-- DropForeignKey
ALTER TABLE "AnalyticsRequestContact" DROP CONSTRAINT "AnalyticsRequestContact_userUid_fkey";

-- DropForeignKey
ALTER TABLE "UserFavorites" DROP CONSTRAINT "UserFavorites_itemsId_fkey";

-- DropForeignKey
ALTER TABLE "UserFavorites" DROP CONSTRAINT "UserFavorites_userUid_fkey";

-- DropForeignKey
ALTER TABLE "UserRecentsView" DROP CONSTRAINT "UserRecentsView_itemsId_fkey";

-- DropForeignKey
ALTER TABLE "UserRecentsView" DROP CONSTRAINT "UserRecentsView_userUid_fkey";

-- AlterTable
ALTER TABLE "ItemPrice" ALTER COLUMN "value" SET DEFAULT 'A Combinar';

-- AddForeignKey
ALTER TABLE "AnalyticsRequestContact" ADD CONSTRAINT "AnalyticsRequestContact_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalyticsRequestContact" ADD CONSTRAINT "AnalyticsRequestContact_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorites" ADD CONSTRAINT "UserFavorites_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorites" ADD CONSTRAINT "UserFavorites_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecentsView" ADD CONSTRAINT "UserRecentsView_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecentsView" ADD CONSTRAINT "UserRecentsView_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
