import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(userDto.email);
    if (existingUser) {
      throw new BadRequestException('Данный email уже используется');
    }

    const user = await this.usersService.createUser(userDto);

    const tokens = await this.tokensService.generateTokens(user);
    return tokens;
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    const tokens = await this.tokensService.generateTokens(user);

    await this.tokensService.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(refreshToken: string) {
    return this.tokensService.removeRefreshToken(refreshToken);
  }

  private async validateUser(userDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(userDto.email);

    if (!existingUser) {
      throw new BadRequestException('Пользователя с таким email не существует');
    }

    const isMatch = await bcrypt.compare(
      userDto.password,
      existingUser.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Некорректный пароль');
    }

    return existingUser;
  }

  async refresh(token: string) {
    return this.tokensService.refresh(token);
  }
}
