import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';
import { BannedUser } from 'src/banned-users/banned-users.model';
import { Musician } from 'src/musicians/musicians.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { Token } from 'src/tokens/tokens.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
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

  @ApiProperty({ example: 'email@gmail.com', description: 'Почта' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '123password', description: 'Пароль' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasOne(() => Token)
  refreshToken: Token;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasOne(() => Musician)
  musician: Musician;

  @HasOne(() => BannedUser)
  bannedUser: BannedUser;
}
