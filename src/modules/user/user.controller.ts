import {
  Body,
  Controller,
  Post,
  Put,
  Patch,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { User, UserNotificationOnChatMessages } from '@prisma/client';
import { v4 } from 'uuid';

import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

import { UploadService } from 'src/common/modules/config/upload/upload.service';

import { FirebaseUserDto } from 'src/dtos/firebase-user.dto';

import { ReqUserNameDTO } from './dto/req-user-name.dto';
import { ReqUserNotificationOnChatMessage } from './dto/req-user-notification-on-chat-message.dto';

import { EntireUser, UserService } from './user.service';
import { ReqUploadPictureDto } from './dto/req-upload-picture.dto';

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
  @FormDataRequest({ storage: FileSystemStoredFile })
  async uploadFile(
    @Query('user') user: FirebaseUserDto,
    @Body('picture') picture: ReqUploadPictureDto['picture'],
  ): Promise<User> {
    const currentUser = await this.userService.findUserByUid(user.uid);

    if (currentUser.picture.includes('firebasestorage.googleapis.com')) {
      await this.uploadService.deletePicture(currentUser.picture);
    }

    const url = await this.uploadService.uploadPicture({
      picture: {
        localpath: picture.path,
        uploadpath: `users/${v4()}`,
        mimetype: picture.mimetype,
      },
      resize: { height: 96, width: 96 },
    });

    return await this.userService.updatePicture(user.uid, url);
  }
}
