import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @Post('registration')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.registration(userDto);

    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    return tokens;
  }

  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @Post('login')
  async login(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(userDto);

    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    return tokens;
  }
}
