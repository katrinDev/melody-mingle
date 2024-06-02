import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from './decorators/roles.decorator';
import { TokensService } from '../tokens/tokens.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private tokenService: TokensService,
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getClass(), context.getHandler()],
    );

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    try {
      const accessToken = this.extractToken(req);

      if (!accessToken) {
        throw new UnauthorizedException();
      }

      const payload = await this.tokenService.verifyAccessToken(accessToken);

      const userEntity = await this.usersService.findById(payload.id);

      req.user = { ...payload, musicianId: userEntity.musician?.id };

      return payload.roles.some((role) => requiredRoles.includes(role));
    } catch (err) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
  }

  private extractToken(req: Request) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
