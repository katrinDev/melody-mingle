import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JointProject } from './joint-projects.model';
import { InjectModel } from '@nestjs/sequelize';
import { SongChunksService } from 'src/song-chunks/song-chunks.service';
import { MusiciansService } from 'src/musicians/musicians.service';
import { Musician } from 'src/musicians/musicians.model';
import { SongChunk } from 'src/song-chunks/song-chunks.model';
import { CreateJointProjectDto } from './dto/create-joint-dto';
import { AddChunkDto } from './dto/add-chunk-dto';
import { AwsService } from 'src/aws/aws.service';

export interface JointsMusicianInfo {
  id: number;
  name: string;
  mainRole: string;
  avatarUrl: string;
  user: {
    email: string;
  };
}

@Injectable()
export class JointProjectsService {
  constructor(
    @InjectModel(JointProject) private jointsRepository: typeof JointProject,
    private songChunksService: SongChunksService,
    private musiciansService: MusiciansService,
    private awsService: AwsService,
  ) {}

  async findById(id: number) {
    const joint = await this.jointsRepository.findByPk(id, {
      include: [
        { model: Musician, attributes: ['id'], through: { attributes: [] } },
      ],
    });
    if (!joint) {
      throw new BadRequestException('Совместного проекта с таким id нет');
    }
    return joint;
  }

  async createJointProject(createJointDto: CreateJointProjectDto) {
    const promises: Promise<Musician>[] = createJointDto.musicians.map(
      (musicianId) => this.musiciansService.findById(musicianId),
    );

    const musicians: Musician[] = await Promise.all(promises);

    const jointProject = await this.jointsRepository.create({
      ...createJointDto,
      musicians,
    });

    await jointProject.$set('musicians', musicians);
    return jointProject;
  }

  async addSongChunk(
    addChunkDto: AddChunkDto,
    fileName: string,
    audio: Buffer,
    jointProjectId: number,
  ) {
    try {
      const jointProject = await this.findById(jointProjectId);

      const uploadResult = await this.awsService.uploadPublicFile(
        audio,
        fileName,
      );

      const newSongChunk = await this.songChunksService.createSongChunk({
        ...addChunkDto,
        chunkKey: uploadResult.Key,
        jointProjectId: jointProject.id,
      });

      const chunkPlain = newSongChunk.get({ plain: true });
      delete chunkPlain.chunkKey;
      delete chunkPlain.id;

      return {
        ...chunkPlain,
        audioUrl: uploadResult.Location,
      };
    } catch (error) {
      throw new HttpException(
        'Не удалось добавить аудио файл',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const allJointProjects = await this.jointsRepository.findAll({
      include: [
        {
          model: Musician,
          attributes: ['id'],
          through: { attributes: [] },
        },
        {
          model: SongChunk,
          attributes: {
            exclude: ['id'],
          },
        },
      ],
    });

    const flattedJointProjects = allJointProjects.map((joint) => {
      const musiciansId = joint.musicians.map((musician) => musician.id);

      return {
        id: joint.id,
        headline: joint.headline,
        description: joint.description,
        musicians: musiciansId,
        songChunks: joint.songChunks,
      };
    });

    return flattedJointProjects;
  }

  async getJointsForMusician(musicianId: number) {
    const jointProjects = await this.findAll();

    const filteredJoints = jointProjects.filter((project) =>
      project.musicians.includes(musicianId),
    );

    const resultJointsForMusician = await Promise.all(
      filteredJoints.map(async (joint) => {
        const jointsMusicianInfo: JointsMusicianInfo[] =
          await this.musiciansService.getJointProjectsFormat(joint.musicians);

        if (joint.songChunks) {
          const jointsChunksWithUrl = this.songChunksService.getChunksWithUrl(
            joint.songChunks,
          );

          return {
            id: joint.id,
            headline: joint.headline,
            description: joint.description,
            musicians: jointsMusicianInfo,
            songChunks: jointsChunksWithUrl,
          };
        }

        return {
          id: joint.id,
          headline: joint.headline,
          description: joint.description,
          musicians: jointsMusicianInfo,
        };
      }),
    );
    return resultJointsForMusician;
  }
}
