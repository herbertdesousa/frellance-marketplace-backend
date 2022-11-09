import { Module } from '@nestjs/common';

import { BasicAuthModule } from './basic-auth/basic-auth.module';
import { UploadModule } from './upload/upload.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BasicAuthModule, UploadModule, PrismaModule],
  providers: [],
})
export class CommonConfigModule {}
