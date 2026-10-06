import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: "Adresse email de l'utilisateur",
  })
  @IsEmail({}, { message: "L'email doit être valide" })
  email: string;

  @ApiProperty({
    example: 'Marouane',
    description: "Nom de l'utilisateur",
    minLength: 3,
  })
  @IsString()
  @MinLength(3, { message: 'Le nom doit faire au moins 3 caractères' })
  name: string;

  @ApiProperty({
    example: 'password123',
    description: 'Mot de passe (min. 6 caractères)',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit faire au moins 6 caractères' })
  password: string;
}
