import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Musician } from '../musicians/musicians.model';

interface ProjectCreationAttrs {
  projectKey: string;
  performer: string;
  projectName: string;
  musicianId: number;
  description: string;
}

@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationAttrs> {
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
    allowNull: false,
  })
  projectKey: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  projectName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  performer: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

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
