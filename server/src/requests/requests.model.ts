import { DateOnlyDataType } from 'sequelize';
import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Musician } from 'src/musicians/musicians.model';

interface RequestCreationAttrs {
  headline: string;
  body: string;
  mainRoles: string[];
  genres: string[];
  location: string;
  expirationDate: DateOnlyDataType;
}

@Table({ tableName: 'requests' })
export class Request extends Model<Request, RequestCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  headline: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  mainRoles: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  genres: string[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  expirationDate: DateOnlyDataType;

  @ForeignKey(() => Musician)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  musicianId: number;

  @BelongsTo(() => Musician, { onDelete: 'CASCADE' })
  musician: Musician;
}
