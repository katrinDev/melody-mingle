import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Musician } from 'src/musicians/musicians.model';

interface ProfileInfoCreationAttrs {
  musicianId: number;
  avatarKey: string;
  bio: string;
}

@Table({ tableName: 'profiles_info' })
export class ProfileInfo extends Model<ProfileInfo, ProfileInfoCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  avatarKey: string;

  @Column({
    type: DataType.TEXT,
  })
  bio: string;

  @ForeignKey(() => Musician)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  musicianId: number;

  @BelongsTo(() => Musician, {
    onDelete: 'CASCADE',
  })
  musician: Musician;
}
