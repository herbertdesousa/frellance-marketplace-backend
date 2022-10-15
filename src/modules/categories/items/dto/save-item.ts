import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, MinLength, ValidateNested } from 'class-validator';
import { ExistsOnTable } from 'src/common/validations/ExistsOnTable';

class SaveItemImg {
  @IsNotEmpty({ message: 'obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'obrigatório' })
  url: string;
}

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
  @ValidateNested({ each: true })
  @Type(() => SaveItemPrice)
  price: SaveItemPrice;

  @IsNotEmpty({ message: 'obrigatório' })
  @ValidateNested({ each: true })
  @Type(() => SaveItemImg)
  imgs: SaveItemImg[];

  @IsNotEmpty({ message: 'obrigatório' })
  @ValidateNested({ each: true })
  @Type(() => SaveItemAttributes)
  attributes: SaveItemAttributes[];
}
