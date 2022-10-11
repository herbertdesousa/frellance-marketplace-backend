import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ExistsOnTable } from 'src/common/validations/ExistsOnTable';

class SaveItemAttributes {
  @IsNotEmpty({ message: 'obrigatório' })
  @ExistsOnTable({ table: 'attributes' })
  id: string;

  @IsNotEmpty({ message: 'obrigatório' })
  value: string;
}

export class SaveItemDto {
  @IsNotEmpty({ message: 'obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @MinLength(50, { message: 'mínimo de 50 caracters' })
  description: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @ExistsOnTable({ table: 'categories' })
  category_id: string;

  @IsString({ message: 'inválido', each: true })
  imgs: string[];

  @IsNotEmpty({ message: 'obrigatório' })
  @ValidateNested({ each: true })
  @Type(() => SaveItemAttributes)
  attributes: SaveItemAttributes[];

  // @ValidateNested()
  // @Type(() => SaveItemAddressDto)
  // address: SaveItemAddressDto;
}
