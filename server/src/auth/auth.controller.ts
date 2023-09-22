import { Body, Controller, Post, Req, Res, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @Public()
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
  @Public()
  @Post('login')
  async login(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(userDto);

    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    return tokens;
  }

  @ApiOperation({ summary: 'Выход из аккаунта пользователя' })
  @ApiResponse({ status: 200 })
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const refreshToken = req.cookies['refreshToken'];
    await this.authService.logout(refreshToken);

    res.clearCookie('refreshToken');
    return;
  }

  @ApiOperation({ summary: 'Обновить токены доступа' })
  @ApiResponse({ status: 200 })
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refreshToken'];

    const tokens = await this.authService.refresh(refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    return tokens;
  }
}
