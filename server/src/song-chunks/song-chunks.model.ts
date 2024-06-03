import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { JointProject } from 'src/joint-projects/joint-projects.model';
import { Musician } from 'src/musicians/musicians.model';

export interface SongChunkCreationAttrs {
  chunkKey: string;
  name: string;
  description: string;
  creatorId: number;
  jointProjectId: number;
}

@Table({ tableName: 'song_chunks' })
export class SongChunk extends Model<SongChunk, SongChunkCreationAttrs> {
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
  chunkKey: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ForeignKey(() => Musician)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  creatorId: number;

  @ForeignKey(() => JointProject)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  jointProjectId: number;

  @BelongsTo(() => JointProject, { onDelete: 'CASCADE' })
  jointProject: JointProject;
}
