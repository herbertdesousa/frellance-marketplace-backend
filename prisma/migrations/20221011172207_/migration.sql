-- DropForeignKey
ALTER TABLE "Attributes" DROP CONSTRAINT "Attributes_refAttributeClassName_fkey";

-- AlterTable
ALTER TABLE "Attributes" ALTER COLUMN "refAttributeClassName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Attributes" ADD CONSTRAINT "Attributes_refAttributeClassName_fkey" FOREIGN KEY ("refAttributeClassName") REFERENCES "RefAttributeClass"("name") ON DELETE SET NULL ON UPDATE CASCADE;
