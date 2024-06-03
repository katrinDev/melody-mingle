import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { JointProject } from './joint-projects.model';
import { Musician } from 'src/musicians/musicians.model';

@Table({ tableName: 'musician_joints', createdAt: false, updatedAt: false })
export class MusicianJoints extends Model<MusicianJoints> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ForeignKey(() => Musician)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  musicianId: number;

  @ForeignKey(() => JointProject)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  jointProjectId: number;
}
