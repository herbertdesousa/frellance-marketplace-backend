import { IsNotEmpty } from 'class-validator';
import { ExistsOnTable } from 'src/common/validations/ExistsOnTable';

export class SaveAdminContact {
  @IsNotEmpty({ message: 'obrigatório' })
  @ExistsOnTable({ table: 'AdminContacts' })
  id: string;

  @IsNotEmpty({ message: 'obrigatório' })
  active: boolean;

  link: string;
}
