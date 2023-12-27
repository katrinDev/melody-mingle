import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class AddProjectDto {
  @IsString({ message: 'Must be a string' })
  @Length(2, 55, {
    message: 'Project name length - from $constraint1 to $constraint2',
  })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly projectName: string;

  @IsString({ message: 'Must be a string' })
  @Length(2, 55, {
    message: 'Project name length - from $constraint1 to $constraint2',
  })
  readonly performer: string;

  @IsString({ message: 'Must be a string' })
  @Length(2, 100, {
    message: 'Project descriptin length - from $constraint1 to $constraint2',
  })
  readonly description: string;
}
