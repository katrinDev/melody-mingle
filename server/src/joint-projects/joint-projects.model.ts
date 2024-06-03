import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { SongChunk } from 'src/song-chunks/song-chunks.model';
import { Musician } from 'src/musicians/musicians.model';
import { MusicianJoints } from './musician-joints.model';

interface JointProjectCreationAtts {
  musicians: Musician[];
  headline: string;
  description: string;
}

@Table({ tableName: 'joint_projects' })
export class JointProject extends Model<
  JointProject,
  JointProjectCreationAtts
> {
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
  description: string;

  @BelongsToMany(() => Musician, () => MusicianJoints)
  musicians: Musician[];

  @HasMany(() => SongChunk)
  songChunks: SongChunk[];
}
