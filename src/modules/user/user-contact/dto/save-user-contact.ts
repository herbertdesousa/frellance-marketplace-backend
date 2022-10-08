import { IsEnum, IsNotEmpty } from 'class-validator';

export class SaveUserContactDto {
  @IsNotEmpty({ message: 'obrigatório' })
  @IsEnum(['email', 'whatsapp', 'phone'], { message: 'obrigatório' })
  type: 'email' | 'whatsapp' | 'phone';

  @IsNotEmpty({ message: 'obrigatório' })
  contact: string;
}
