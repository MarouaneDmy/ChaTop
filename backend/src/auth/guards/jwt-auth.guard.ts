import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // On vérifie si la route est marquée comme "Public"
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si c'est public, on laisse passer (pas de vérification JWT)
    if (isPublic) {
      return true;
    }

    // Sinon, on applique la vérification JWT standard
    return super.canActivate(context);
  }
}
