import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import admin from 'src/config/firebase-config';
import { FirebaseUserDto } from 'src/dtos/firebase-user.dto';

@Injectable()
export class DecodeFirebaseTokenMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1] || '';

    try {
      const decodeValue = await admin.auth().verifyIdToken(token);

      const user: FirebaseUserDto = {
        email: decodeValue.email,
        uid: decodeValue.uid,
        sign_in_provider: decodeValue.firebase.sign_in_provider,
        name: decodeValue.name,
        picture: decodeValue.picture,
      };

      if (decodeValue) {
        Object.assign(req.body, { user });
        return next();
      }
      throw new UnauthorizedException({ message: 'Un Authorizated' });
    } catch (err) {
      console.log(err);
      throw new BadRequestException({ message: 'Something is bad' });
    }
  }
}
