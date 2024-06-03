import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateJointProjectDto {
  @IsArray()
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly musicians: number[];

  @IsString()
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly headline: string;

  @IsString()
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly description: string;
}
