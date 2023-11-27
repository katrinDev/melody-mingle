import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

//add validation!!
export class AddRoleDto {
  readonly userId: number;

  @ApiProperty({ example: 'ADMIN', description: 'Роль пользователя' })
  @IsString({ message: 'Must be a string' })
  readonly value: string;
}
