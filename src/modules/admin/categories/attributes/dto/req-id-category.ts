import { IsNotEmpty } from 'class-validator';
import { ExistsOnTable } from 'src/common/validations/ExistsOnTable';

export class ReqIdCategory {
  @IsNotEmpty({ message: 'obrigatório' })
  @ExistsOnTable({ table: 'Attributes' })
  id: string;
}
