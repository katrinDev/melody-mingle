import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsArray,
} from 'class-validator';

export class CreateMusicianDto {
  @ApiProperty({
    example: 'Katrin',
    description: 'Псевдоним или настоящее полное имя',
  })
  @IsString({ message: 'Must be a string' })
  @Length(2, 15, { message: 'Name length - from $constraint1 to $constraint2' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly name: string;

  @ApiProperty({ example: 'Гитарист', description: 'Роль в индустрии' })
  @IsString({ message: 'Must be a string' })
  @Length(2, 15, { message: 'Role length - from $constraint1 to $constraint2' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly mainRole: string;

  @ApiProperty({ example: 'Минск', description: 'Город проживания' })
  @IsString({ message: 'Must be a string' })
  @Length(2, 10, { message: 'City length - from $constraint1 to $constraint2' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly city: string;

  @ApiProperty({
    example: 5.0,
    description: 'Опыт в основном направлении в годах',
  })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Must be a number' },
  )
  @Min(0.1, { message: 'Min value is $constraint1' })
  @Max(70.0, { message: 'Max value is $constraint1' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly experience: number;

  @ApiProperty({
    example: ['Автор текстов песен', 'Аранжировщик'],
    description: 'Дополнительные навыки',
  })
  @IsArray()
  @IsString({ each: true })
  readonly subRoles: string[];

  @ApiProperty({
    example: ['pop', 'jazz'],
    description: 'Жанры, в которых работает музыкант',
  })
  @IsArray()
  @IsString({ each: true })
  readonly genres: string[];

  @ApiProperty({
    example: ['Русский', 'Англиский'],
    description: 'Языки, которыми владеет музыкант',
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly languages: string[];

  @ApiProperty({
    example: 1,
    description: 'Внешний ключ пользователя',
  })
  @IsInt({ message: 'Must be an integer' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly userId: number;
}
