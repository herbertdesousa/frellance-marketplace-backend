/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `AdminContacts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AdminContacts_type_key" ON "AdminContacts"("type");
