import { IsNotEmpty } from 'class-validator';
import { ExistsOnTable } from 'src/common/validations/ExistsOnTable';

export class ReqListAllFromItemDTO {
  @IsNotEmpty({ message: 'obrigatório' })
  @ExistsOnTable({ table: 'items' })
  itemId: string;

  @IsNotEmpty({ message: 'obrigatório' })
  @ExistsOnTable({ table: 'user', field: 'uid' })
  ownerItemUserId: string;
}
