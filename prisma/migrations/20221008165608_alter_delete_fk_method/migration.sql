-- DropForeignKey
ALTER TABLE "UserContacts" DROP CONSTRAINT "UserContacts_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserNotificationOnChatMessages" DROP CONSTRAINT "UserNotificationOnChatMessages_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserContacts" ADD CONSTRAINT "UserContacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotificationOnChatMessages" ADD CONSTRAINT "UserNotificationOnChatMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
