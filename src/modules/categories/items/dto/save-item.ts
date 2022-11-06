import { plainToClass, Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  MinLength,
  ValidateNested,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';

import {
  HasMimeType,
  IsFiles,
  MaxFileSize,
  MemoryStoredFile,
  FileSystemStoredFile,
} from 'nestjs-form-data';

import { ExistsOnTable } from 'src/common/validations/ExistsOnTable';

class SaveItemAttributes {
  @IsNotEmpty({ message: 'obrigatório' })
  @ExistsOnTable({ table: 'attributes' })
  id: string;

  @IsNotEmpty({ message: 'obrigatório' })
  value: string;
}

class SaveItemPrice {
  @IsNotEmpty({ message: 'obrigatório' })
  @IsEnum(['alugar', 'vender'], { message: 'inválido' })
  type: 'alugar' | 'vender';

  @IsNotEmpty({ message: 'obrigatório' })
  value: string;
}

export class SaveItemDto {
  @IsNotEmpty({ message: 'obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @MinLength(15, { message: 'mínimo de 15 caracters' })
  description: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @ExistsOnTable({ table: 'categories' })
  category_id: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @Transform((price) => plainToClass(SaveItemPrice, JSON.parse(price.value)))
  @ValidateNested({ each: true })
  @Type(() => SaveItemPrice)
  price: SaveItemPrice;

  @IsNotEmpty({ message: 'obrigatório' })
  @IsFiles()
  @MaxFileSize(1e6, {
    each: true,
  })
  @HasMimeType(['image/jpeg', 'image/png', 'image/jpg', 'image/webp'], {
    each: true,
  })
  @ValidateNested({ each: true })
  @ArrayMaxSize(20, { message: 'inválido' })
  @ArrayMinSize(5, { message: 'inválido' })
  imgs: FileSystemStoredFile[];

  @IsNotEmpty({ message: 'obrigatório' })
  @Transform((attr) => {
    attr.value.map((i) => plainToClass(SaveItemPrice, JSON.parse(i)));
    return attr;
  })
  @ValidateNested({ each: true })
  @Type(() => SaveItemAttributes)
  attributes: SaveItemAttributes[];
}
