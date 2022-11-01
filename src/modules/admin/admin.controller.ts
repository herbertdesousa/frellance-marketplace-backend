import { Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  @Post()
  @UseGuards(AuthGuard('basic'))
  async auth(): Promise<void> {
    return;
  }
}
