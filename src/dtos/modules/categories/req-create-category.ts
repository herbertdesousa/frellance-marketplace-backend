import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data';
import { NotExistsOnTable } from 'src/common/validations/NotExistsOnTable';

export class ReqCreateCategory {
  @IsNotEmpty({ message: 'obrigatório' })
  @NotExistsOnTable(
    { table: 'Categories', field: 'name' },
    { message: 'Nome em uso' },
  )
  name: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @Transform((value) => Number(value))
  relevance: number;

  @IsNotEmpty({ message: 'obrigatório' })
  iconName: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @NotExistsOnTable(
    { table: 'Categories', field: 'slug' },
    { message: 'Slug em uso' },
  )
  slug: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @IsFile()
  @MaxFileSize(2e9)
  @HasMimeType(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'])
  img: FileSystemStoredFile;
}
