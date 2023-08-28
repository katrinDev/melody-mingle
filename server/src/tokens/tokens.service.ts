import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './tokens.model';
import { User } from 'src/users/users.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    private jwtService: JwtService,
  ) {}

  async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.SECRET_ACCESS_KEY || 'SECRET_ACCESS',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: process.env.SECRET_REFRESH_KEY || 'SECRET_REFRESH',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveRefreshToken(userId: number, token: string) {
    const tokenData = await this.tokenRepository.findOne({ where: { userId } });
    if (tokenData) {
      await this.tokenRepository.update(
        { refreshToken: token },
        { where: { userId } },
      );
    } else {
      await this.tokenRepository.create({ userId, refreshToken: token });
    }
  }
}
