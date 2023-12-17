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
import { User } from 'src/users/users.model';

interface BannedUserCreationAttrs {
  userId: number;
  bannedReason: string;
}

@Table({ tableName: 'banned_users' })
export class BannedUser extends Model<BannedUser, BannedUserCreationAttrs> {
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
  })
  bannedReason: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
