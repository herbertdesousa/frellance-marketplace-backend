import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ExistsOnTable } from 'src/common/validations/ExistsOnTable';

class ReqSaveAttributeValues {
  @IsNotEmpty({ message: 'obrigatório' })
  name: string;
}

export class ReqSaveAttribute {
  @ExistsOnTable({ table: 'Categories' })
  @IsNotEmpty({ message: 'obrigatório' })
  category_id: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @Transform((val) => (val.value === 'false' ? false : true))
  required: boolean;

  @IsNotEmpty({ message: 'obrigatório' })
  order: number;

  @IsNotEmpty({ message: 'obrigatório' })
  name: string;

  description?: string;

  @IsEnum(['selectable', 'writable', 'both'], { message: 'inválido' })
  @IsNotEmpty({ message: 'obrigatório' })
  type: 'selectable' | 'writable' | 'both';

  @IsArray({ message: 'inválido' })
  @IsNotEmpty({ message: 'obrigatório' })
  @ValidateNested({ each: true })
  @Type(() => ReqSaveAttributeValues)
  values: ReqSaveAttributeValues[];
}
