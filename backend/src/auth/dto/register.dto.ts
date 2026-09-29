import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: "L'email doit être valide" })
  email: string;

  @IsString()
  @MinLength(3, { message: 'Le nom doit faire au moins 3 caractères' })
  name: string;

  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit faire au moins 6 caractères' })
  password: string;
}
