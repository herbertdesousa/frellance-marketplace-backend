import { Injectable } from '@nestjs/common';

import {
  Prisma,
  User,
  UserContacts,
  UserNotificationOnChatMessages,
} from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

interface UserFormatted extends User {
  contacts: UserContacts[];
  notificationOnChatMessages: boolean;
}

const fromUserToUserFormatted = (
  user: User & {
    UserContacts: UserContacts[];
    UserNotificationOnChatMessages: UserNotificationOnChatMessages[];
  },
): UserFormatted => {
  const { UserContacts, UserNotificationOnChatMessages, ...rest } = user;

  return {
    ...rest,
    contacts: UserContacts,
    notificationOnChatMessages: UserNotificationOnChatMessages[0].value,
  };
};

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(payload: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data: payload });
  }

  async findEntireUserByUid(uid: string): Promise<UserFormatted> {
    const user = await this.prisma.user.findFirst({
      where: { uid },
      include: { UserContacts: true, UserNotificationOnChatMessages: true },
    });

    return fromUserToUserFormatted(user);
  }

  async findUserByUid(uid: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { uid },
    });
  }

  async changeUserName(uid: string, newName: string): Promise<User> {
    return await this.prisma.user.update({
      where: { uid },
      data: { name: newName },
    });
  }

  async toggleUserNotificationOnChatMessages(
    uid: string,
    value: boolean,
  ): Promise<UserNotificationOnChatMessages> {
    const user = await this.prisma.user.findFirst({
      where: { uid },
      include: { UserNotificationOnChatMessages: true },
    });

    return await this.prisma.userNotificationOnChatMessages.update({
      where: { id: user.UserNotificationOnChatMessages[0].id },
      data: { value },
    });
  }
}
