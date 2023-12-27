import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создать новую роль' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Получить роль по значению' })
  @ApiResponse({ status: 200 })
  @Get(':value')
  async getByValue(@Param('value') value: string) {
    return this.rolesService.getByValue(value);
  }
}
