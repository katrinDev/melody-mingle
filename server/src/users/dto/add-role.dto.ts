import { IsEnum, IsString } from 'class-validator';

//add validation!!
export class AddRoleDto {
  readonly userId: number;

  @IsString({ message: 'Must be a string' })
  readonly value: string;
}
