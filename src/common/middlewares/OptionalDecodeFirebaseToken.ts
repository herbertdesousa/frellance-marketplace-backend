import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { tokenDecoder } from './tokenDecoder';

@Injectable()
export class OptionalDecodeFirebaseToken implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1] || '';

    if (!token) return next();

    Object.assign(req.body, { user: await tokenDecoder(token) });

    return next();
  }
}
