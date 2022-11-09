import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data';

export class ReqUpdateCategory {
  @IsNotEmpty({ message: 'obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @Transform((value) => Number(value))
  relevance: number;

  @IsNotEmpty({ message: 'obrigatório' })
  iconName: string;

  @IsNotEmpty({ message: 'obrigatório' })
  slug: string;

  @IsOptional()
  @IsFile()
  @MaxFileSize(2e9)
  @HasMimeType(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
  img?: FileSystemStoredFile;
}
