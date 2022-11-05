import { diskStorage } from 'multer';
import { extname } from 'path';

import { UnprocessableEntityException } from '@nestjs/common';

import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

interface Request {
  mimes: RegExp;
  fileSize: number;
}

export function fileInterceptorOptions(payload: Request): MulterOptions {
  return {
    limits: { fileSize: payload.fileSize },
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(payload.mimes)) {
        return callback(
          new UnprocessableEntityException('tipo de imagem não suportado'),
          true,
        );
      }

      callback(null, true);
    },
    storage: diskStorage({
      destination: './temp',
      filename: (req, file, cb) => {
        // eslint-disable-next-line prettier/prettier
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');

        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  };
}
