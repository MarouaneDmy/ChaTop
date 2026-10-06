import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { Public } from './decorators/public.decorator.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Créer un nouveau compte utilisateur' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Compte créé avec succès.' })
  @ApiResponse({
    status: 400,
    description: 'Données invalides (email, mot de passe, etc.).',
  })
  @ApiResponse({ status: 409, description: 'Cet email est déjà utilisé.' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Se connecter et récupérer un token JWT' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Connexion réussie, token JWT retourné.',
  })
  @ApiResponse({ status: 401, description: 'Email ou mot de passe incorrect.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Récupérer les informations de l'utilisateur connecté",
  })
  @ApiResponse({ status: 200, description: "Informations de l'utilisateur." })
  @ApiResponse({
    status: 401,
    description: 'Non authentifié (token manquant ou invalide).',
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.userId);
  }
}
