import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Patch,
  UnprocessableEntityException,
  ParseBoolPipe,
  Query,
} from '@nestjs/common';
import { User, UserNotificationOnChatMessages } from '@prisma/client';
import { FirebaseUserDto } from 'src/dtos/firebase-user.dto';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sign-up')
  async registerUser(@Body('user') user: FirebaseUserDto): Promise<User> {
    if (await this.userService.findUserByUid(user.uid))
      throw new ConflictException({ message: 'user already registered' });

    const newUser = await this.userService.createUser({
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

    const entireUser = await this.userService.findEntireUserByUid(newUser.uid);

    return entireUser;
  }

  @Get()
  async findUser(@Body('user') user: FirebaseUserDto): Promise<User> {
    try {
      const entireUser = await this.userService.findEntireUserByUid(user.uid);

      return entireUser;
    } catch (err) {
      throw new NotFoundException({ message: 'user not found' });
    }
  }

  @Patch('name')
  async changeUserName(
    @Body('user') user: FirebaseUserDto,
    @Query('name') newName: string,
  ): Promise<User> {
    if (!newName)
      throw new UnprocessableEntityException({ name: 'obrigatório' });

    return await this.userService.changeUserName(user.uid, newName);
  }

  @Put('user_notification_on_chat_messages')
  async toggleUserNotificationOnChatMessages(
    @Body('user') user: FirebaseUserDto,
    @Query('value', ParseBoolPipe) value: boolean,
  ): Promise<UserNotificationOnChatMessages> {
    return await this.userService.toggleUserNotificationOnChatMessages(
      user.uid,
      value,
    );
  }
}
