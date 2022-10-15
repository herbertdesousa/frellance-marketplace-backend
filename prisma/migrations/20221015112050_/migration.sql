/*
  Warnings:

  - The values [rent,sale] on the enum `ItemPriceType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItemPriceType_new" AS ENUM ('alugar', 'vender');
ALTER TABLE "ItemPrice" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "ItemPrice" ALTER COLUMN "type" TYPE "ItemPriceType_new" USING ("type"::text::"ItemPriceType_new");
ALTER TYPE "ItemPriceType" RENAME TO "ItemPriceType_old";
ALTER TYPE "ItemPriceType_new" RENAME TO "ItemPriceType";
DROP TYPE "ItemPriceType_old";
ALTER TABLE "ItemPrice" ALTER COLUMN "type" SET DEFAULT 'vender';
COMMIT;

-- AlterTable
ALTER TABLE "ItemPrice" ALTER COLUMN "type" SET DEFAULT 'vender';
