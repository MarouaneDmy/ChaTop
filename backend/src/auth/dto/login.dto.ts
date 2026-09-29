import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: "L'email doit être valide" })
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
