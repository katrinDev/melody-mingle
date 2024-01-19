import { IsNumber, IsString, Length, Min, IsArray, Max } from 'class-validator';

export class UpdateMusicianDto {
  @IsString({ message: 'Must be a string' })
  @Length(2, 15, { message: 'Name length - from $constraint1 to $constraint2' })
  readonly name?: string;

  @IsString({ message: 'Must be a string' })
  @Length(2, 15, { message: 'Role length - from $constraint1 to $constraint2' })
  readonly mainRole?: string;

  @IsString({ message: 'Must be a string' })
  @Length(2, 10, { message: 'City length - from $constraint1 to $constraint2' })
  readonly city?: string;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'Must be a number' },
  )
  @Min(0.1, { message: 'Min value is $constraint1' })
  @Max(70.0, { message: 'Max value is $constraint1' })
  readonly experience?: number;

  @IsArray()
  @IsString({ each: true })
  readonly subRoles?: string[];

  @IsArray()
  @IsString({ each: true })
  readonly genres?: string[];

  @IsArray()
  @IsString({ each: true })
  readonly languages?: string[];
}
