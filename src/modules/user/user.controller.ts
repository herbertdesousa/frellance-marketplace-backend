import {
  Body,
  Controller,
  Post,
  Put,
  Patch,
  Query,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { User, UserNotificationOnChatMessages } from '@prisma/client';

import { UploadService } from 'src/common/modules/upload/upload.service';

import { FirebaseUserDto } from 'src/dtos/firebase-user.dto';

import { ReqUserNameDTO } from './dto/req-user-name.dto';
import { ReqUserNotificationOnChatMessage } from './dto/req-user-notification-on-chat-message.dto';

import { EntireUser, UserService } from './user.service';
import { fileInterceptorOptions } from 'src/common/helpers/fileInterceptorOptions';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private uploadService: UploadService,
  ) {}

  @Post()
  async auth(@Body('user') user: FirebaseUserDto): Promise<EntireUser> {
    if (await this.userService.findUserByUid(user.uid)) {
      return await this.userService.findEntireUserByUid(user.uid);
    }

    const newUser = await this.userService.createUser({
      uid: user.uid,
      signInMethod: user.sign_in_provider,
      name: user.name,
      email: user.email,
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

  @Patch('name')
  async changeUserName(
    @Body('user') user: FirebaseUserDto,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: ReqUserNameDTO,
  ): Promise<User> {
    return await this.userService.changeUserName(user.uid, query.name);
  }

  @Put('user_notification_on_chat_messages')
  async toggleUserNotificationOnChatMessages(
    @Body('user') user: FirebaseUserDto,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: ReqUserNotificationOnChatMessage,
  ): Promise<UserNotificationOnChatMessages> {
    return await this.userService.toggleUserNotificationOnChatMessages(
      user.uid,
      !!query.value,
    );
  }

  @Post('picture')
  @UseInterceptors(
    FileInterceptor(
      'picture',
      fileInterceptorOptions({ fileSize: 2e9, mimes: /\.(jpg|jpeg|png)$/ }),
    ),
  )
  async uploadFile(
    @Query('user') user: FirebaseUserDto,
    @UploadedFile() picture: Express.Multer.File,
  ): Promise<User> {
    const currentUser = await this.userService.findUserByUid(user.uid);

    const url = await this.uploadService.uploadPicture({
      picture,
      oldFirebasePath: currentUser.picture,
      resize: { height: 96, width: 96 },
    });

    return await this.userService.updatePicture(user.uid, url);
  }
}
