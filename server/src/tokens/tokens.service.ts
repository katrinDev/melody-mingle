import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './tokens.model';
import { User } from 'src/users/users.model';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async generateTokens(user: User) {
    const roles = user.roles.map((role) => role.value);

    const payload = {
      id: user.id,
      email: user.email,
      roles: roles,
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
      await tokenData.update({ refreshToken: token });
    } else {
      await this.tokenRepository.create({ userId, refreshToken: token });
    }
  }

  async removeRefreshToken(token: string) {
    return this.tokenRepository.destroy({ where: { refreshToken: token } });
  }

  async verifyAccessToken(accessToken: string) {
    return this.jwtService.verifyAsync(accessToken, {
      secret: process.env.SECRET_ACCESS_KEY || 'SECRET_ACCESS',
    });
  }

  async verifyRefreshToken(refreshToken: string) {
    return this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.SECRET_REFRESH_KEY || 'SECRET_REFRESH',
    });
  }

  async refresh(refreshToken: string) {
    const payload = await this.verifyRefreshToken(refreshToken);

    const tokenFromDb = await this.tokenRepository.findOne({
      where: { refreshToken },
    });

    if (!payload || !tokenFromDb || payload.sub !== tokenFromDb.userId) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findById(payload.sub);
    //to generate appropriate tokens, after month some properties can change

    const tokens = await this.generateTokens(user);

    await this.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
