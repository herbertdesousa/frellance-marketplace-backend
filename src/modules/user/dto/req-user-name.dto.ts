import { IsNotEmpty } from 'class-validator';

export class ReqUserNameDTO {
  @IsNotEmpty({ message: 'obrigatório' })
  name: string;
}
