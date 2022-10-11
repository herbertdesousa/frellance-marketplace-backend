-- DropForeignKey
ALTER TABLE "ItemAddresses" DROP CONSTRAINT "ItemAddresses_itemId_fkey";

-- AddForeignKey
ALTER TABLE "ItemAddresses" ADD CONSTRAINT "ItemAddresses_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
