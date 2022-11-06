import { IsNotEmpty } from 'class-validator';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data';

export class ReqUploadPictureDto {
  @IsNotEmpty({ message: 'obrigatório' })
  @IsFile()
  @MaxFileSize(2e9)
  @HasMimeType(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
  picture: FileSystemStoredFile;
}
