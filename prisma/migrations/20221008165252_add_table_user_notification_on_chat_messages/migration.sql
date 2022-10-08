-- CreateTable
CREATE TABLE "UserNotificationOnChatMessages" (
    "id" TEXT NOT NULL,
    "value" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserNotificationOnChatMessages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserNotificationOnChatMessages" ADD CONSTRAINT "UserNotificationOnChatMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
