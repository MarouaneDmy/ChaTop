import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateRentalDto {
  @ApiProperty({ example: 'Appartement T3', description: 'Nom de la location' })
  @IsString()
  name: string;

  @ApiProperty({ example: 45, description: 'Surface en m²' })
  @IsNumber()
  @Min(1)
  surface: number;

  @ApiProperty({ example: 1200, description: 'Prix par mois' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 'https://image.com/pic.jpg' })
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiProperty({ example: 'Superbe appartement en centre ville.' })
  @IsString()
  description: string;
}
