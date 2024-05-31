import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsArray()
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly users: number[];
}
