-- CreateTable
CREATE TABLE "AdminItemHero" (
    "id" TEXT NOT NULL,
    "itemsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminItemHero_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdminItemHero" ADD CONSTRAINT "AdminItemHero_itemsId_fkey" FOREIGN KEY ("itemsId") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
