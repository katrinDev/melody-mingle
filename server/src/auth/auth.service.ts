import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(userDto.email);
    if (existingUser) {
      throw new BadRequestException(
        'User with such email has been already created',
      );
    }

    const user = await this.usersService.createUser(userDto);

    const tokens = await this.tokensService.generateTokens(user);

    await this.tokensService.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    const tokens = await this.tokensService.generateTokens(user);

    await this.tokensService.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async validateUser(userDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(userDto.email);

    if (!existingUser) {
      throw new BadRequestException('There is no user with such email');
    }

    const isMatch = await bcrypt.compare(
      userDto.password,
      existingUser.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Incorrect password');
    }

    return existingUser;
  }
}
