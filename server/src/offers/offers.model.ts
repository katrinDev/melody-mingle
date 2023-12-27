import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Musician } from '../musicians/musicians.model';
import { Moment } from 'moment';

interface OfferCreationAttrs {
  musicianId: number;
  headline: string;
  body: string;
  mainRoles: string[];
  genres: string[];
  location: string;
  expirationDate: Date | Moment;
  photoKey?: string;
}

@Table({ tableName: 'offers' })
export class Offer extends Model<Offer, OfferCreationAttrs> {
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
  expirationDate: Date;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  photoKey: string;

  @ForeignKey(() => Musician)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  musicianId: number;

  @BelongsTo(() => Musician, { onDelete: 'CASCADE' })
  musician: Musician;
}
