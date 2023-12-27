import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateOfferDto {
  @IsString({ message: 'Must be a string' })
  @MaxLength(200, { message: 'Max length is $constraint1 symbols' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly headline: string;

  @IsString({ message: 'Must be a string' })
  @Length(2, 100, {
    message: 'Body length - from $constraint1 to $constraint2',
  })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly body: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly genres: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly mainRoles: string[];

  @IsString({ message: 'Must be a string' })
  @Length(2, 50, {
    message: 'Location length - from $constraint1 to $constraint2',
  })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly location: string;

  @IsDate({ message: 'Must be a date' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly expirationDate: Date;
}
