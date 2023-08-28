import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    const hashedPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.usersService.createUser({
      ...userDto,
      password: hashedPassword,
    });

    const tokens = await this.tokensService.generateTokens(user);

    return tokens;
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    const tokens = await this.tokensService.generateTokens(user);

    return tokens;
  }

  private async validateUser(userDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(userDto.email);

    if (!existingUser) {
      throw new BadRequestException('Incorrect email');
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
