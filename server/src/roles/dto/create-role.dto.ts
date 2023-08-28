import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Роль пользователя' })
  @IsString({ message: 'Must be a string' })
  readonly value: string;
}
