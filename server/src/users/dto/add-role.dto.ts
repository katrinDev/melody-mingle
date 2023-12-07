import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({
    example: 1,
    description: 'Внешний ключ пользователВнешний ключ пользователя',
  })
  @IsInt({ message: 'Must be an integer' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly userId: number;

  @ApiProperty({ example: 'ADMIN', description: 'Роль пользователя' })
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly value: string;
}
