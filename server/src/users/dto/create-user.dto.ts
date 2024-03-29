import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'email@gmail.com', description: 'Почта' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly email: string;

  @ApiProperty({ example: '123password', description: 'Пароль' })
  @IsString({ message: 'Must be a string' })
  @Length(5, 10, {
    message: 'Password length - from $constraint1 to $constraint2',
  })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly password: string;
}
