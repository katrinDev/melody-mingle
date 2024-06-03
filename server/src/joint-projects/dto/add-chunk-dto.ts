import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddChunkDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly creatorId: number;

  @IsString()
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly description: string;
}
