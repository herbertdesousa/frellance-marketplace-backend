/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserContacts" DROP CONSTRAINT "UserContacts_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserNotificationOnChatMessages" DROP CONSTRAINT "UserNotificationOnChatMessages_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id";

-- AddForeignKey
ALTER TABLE "UserContacts" ADD CONSTRAINT "UserContacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotificationOnChatMessages" ADD CONSTRAINT "UserNotificationOnChatMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
