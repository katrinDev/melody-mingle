import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBioDto {
  @ApiProperty({
    example: 'Есть большой опыт выступлений и создания собственных проектов',
    description: 'Описание опыта музыканта',
  })
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty({ message: 'Must not be empty' })
  readonly bio: string;
}
