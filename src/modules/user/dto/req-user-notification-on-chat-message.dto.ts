import { IsNotEmpty } from 'class-validator';

export class ReqUserNotificationOnChatMessage {
  @IsNotEmpty({ message: 'obrigatório' })
  value: number;
}
