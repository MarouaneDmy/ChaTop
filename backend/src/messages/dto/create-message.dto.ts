import { IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 1, description: 'ID de la location concernée' })
  @IsNumber()
  @Min(1)
  rental_id: number;

  @ApiProperty({
    example: 'Bonjour, je suis intéressé par votre location !',
    description: 'Contenu du message',
  })
  @IsString()
  message: string;
}
