import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { FirebaseUserDto } from 'src/dtos/firebase-user.dto';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async registerUser(@Body('user') user: FirebaseUserDto): Promise<User> {
    return await this.userService.createUser({
      uid: user.uid,
      signInMethod: user.sign_in_provider,
      name: user.name,
      picture: user.picture,
      UserContacts: {
        create: [
          {
            type: 'email',
            contact: user.email,
          },
        ],
      },
      UserNotificationOnChatMessages: {
        create: [{ value: true }],
      },
    });
  }
}
