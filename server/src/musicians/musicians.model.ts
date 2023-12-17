import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProfileInfo } from 'src/profiles-info/profiles-info.model';
import { Project } from 'src/projects/projects.model';
import { Request } from 'src/requests/requests.model';
import { User } from 'src/users/users.model';

interface MusicianCreationAttrs {
  name: string;
  mainRole: string;
  userId: number;
  city: string;
  experience: number;
  subRoles: string[];
  languages: string[];
  genres: string[];
}

@Table({ tableName: 'musicians' })
export class Musician extends Model<Musician, MusicianCreationAttrs> {
  @ApiProperty({
    type: 'integer',
    format: 'int64',
    example: 1,
    description: 'Уникальный идентификатор',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    example: 'Katrin',
    description: 'Псевдоним или настоящее полное имя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Вокалист',
    description: 'Роль в музыкальной индустрии',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mainRole: string;

  @ApiProperty({
    example: 'Автор текстов песен, аранжировщик',
    description: 'Дополнительные навыки',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  subRoles: string[];

  @ApiProperty({ example: 'Minsk', description: 'Город проживания' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @ApiProperty({
    type: 'number',
    format: 'float',
    example: 5.0,
    minimum: 0,
    description: 'Опыт в основном направлении в годах',
  })
  @Column({ type: DataType.FLOAT, allowNull: false })
  experience: number;

  @ApiProperty({
    example: ['English', 'Belarusian', 'Russian'],
    description: 'Языки, которыми владеет музыкант',
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  languages: string[];

  @ApiProperty({
    example: ['jazz', 'rock', 'indie'],
    description: 'Жанры музыки',
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  genres: string[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasOne(() => ProfileInfo)
  profileInfo: ProfileInfo;

  @HasMany(() => Project)
  projects: Project[];

  @HasMany(() => Request)
  requests: Request[];
}
