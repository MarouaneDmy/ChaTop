import { IsNumber, IsString, Min } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  @Min(1)
  rental_id: number;

  @IsString()
  message: string;
}
