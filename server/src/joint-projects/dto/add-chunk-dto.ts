import { IsNotEmpty, IsString } from 'class-validator';

export class AddChunkDto {
  @IsString()
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly creatorId: string;

  @IsString()
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly description: string;
}
