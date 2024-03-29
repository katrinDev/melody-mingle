import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from './decorators/public.decorator';
import { TokensService } from '../tokens/tokens.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokensService,
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    try {
      const accessToken = this.extractToken(request);

      if (!accessToken) {
        throw new UnauthorizedException();
      }

      const payload = await this.tokenService.verifyAccessToken(accessToken);
      const userEntity = await this.usersService.findById(payload.id);

      request.user = { ...payload, musicianId: userEntity.musician?.id };
      return true;
    } catch (e) {
      throw new UnauthorizedException('User is not authorized');
    }
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
