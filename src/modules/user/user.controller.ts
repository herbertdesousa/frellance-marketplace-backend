import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
