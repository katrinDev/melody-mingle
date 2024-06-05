import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangePasswDto {
  @ApiProperty({ example: '123password', description: 'Пароль' })
  @IsString({ message: 'Must be a string' })
  @Length(5, 10, {
    message: 'Password length - from $constraint1 to $constraint2',
  })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly password: string;
}
