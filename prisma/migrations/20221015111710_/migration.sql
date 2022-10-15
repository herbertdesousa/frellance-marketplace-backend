-- CreateEnum
CREATE TYPE "ItemPriceType" AS ENUM ('rent', 'sale');

-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "itemPriceId" TEXT;

-- CreateTable
CREATE TABLE "ItemPrice" (
    "id" TEXT NOT NULL,
    "type" "ItemPriceType" NOT NULL DEFAULT 'sale',
    "value" TEXT NOT NULL DEFAULT 'on request',
    "itemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemPrice_itemId_key" ON "ItemPrice"("itemId");

-- AddForeignKey
ALTER TABLE "ItemPrice" ADD CONSTRAINT "ItemPrice_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
