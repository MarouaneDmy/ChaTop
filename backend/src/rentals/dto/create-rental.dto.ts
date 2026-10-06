import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateRentalDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  surface: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsOptional() // La picture n'est pas obligatoire
  picture?: string;

  @IsString()
  description: string;
}
