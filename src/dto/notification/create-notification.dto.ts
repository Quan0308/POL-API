import { IsNotEmpty, IsNumber } from 'class-validator';
import { NotificationTypeEnum } from 'src/ultils/enums/notification-type.enum';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsNumber()
  receiverId: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  type: NotificationTypeEnum;

  data: { [key: string]: string };
}
