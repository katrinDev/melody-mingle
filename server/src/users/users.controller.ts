import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Roles } from '../guards/decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import RequestWithUser from 'src/auth/IRequestWithUser';
import { ChangePasswDto } from './dto/change-passw.dto';
import { Public } from 'src/guards/decorators/public.decorator';

@ApiTags('Пользователи')
@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Просмотр всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Public()
  @Get('not-admins')
  async findNotAdmins() {
    return this.usersService.findNotAdmins();
  }

  @ApiOperation({ summary: 'Получение 1 пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Добавление роли пользователю' })
  @ApiResponse({ status: 200, type: AddRoleDto })
  @UsePipes(ValidationPipe)
  @Post('/role')
  async addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @Post('/change-passw')
  async changePassword(
    @Body() changePasswDto: ChangePasswDto,
    @Req() req: RequestWithUser,
  ) {
    return this.usersService.changePassword(
      req.user.id,
      changePasswDto.password,
    );
  }
}
