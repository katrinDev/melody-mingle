import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'email@gmail.com', description: 'Почта' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ example: '123password', description: 'Пароль' })
  @IsString({ message: 'Must be a string' })
  @Length(5, 10, {
    message: 'Password length - from $constraint1 to $constraint2',
  })
  readonly password: string;
}
