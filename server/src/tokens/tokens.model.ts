import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface TokenCreationAttrs {
  userId: number;
  refreshToken: string;
}

@Table({ tableName: 'tokens' })
export class Token extends Model<Token, TokenCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  refreshToken: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
