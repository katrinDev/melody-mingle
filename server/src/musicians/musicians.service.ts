import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Musician } from './musicians.model';
import { CreateMusicianDto } from './dto/create-musician.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { ProfileInfo } from '../profiles-info/profiles-info.model';
import { AwsService } from '../aws/aws.service';
import { Op } from 'sequelize';
import { UpdateMusicianDto } from './dto/update-musician.dto';
import { ChatsUserInfo } from 'src/chats/chats.service';

export interface GetMusicianResponse {
  id: number;
  name: string;
  mainRole: string;
  city: string;
  experience: number;
  languages: string[];
  genres: string[];
  subRoles: string[] | null;
  user: {
    email: string;
  };
  avatarUrl: string;
}

@Injectable()
export class MusiciansService {
  constructor(
    @InjectModel(Musician) private musicianRepository: typeof Musician,
    private usersService: UsersService,
    private awsService: AwsService,
  ) {}

  async findAll() {
    return this.musicianRepository.findAll();
  }

  async findAllTheOthers(musicianId: number): Promise<GetMusicianResponse[]> {
    const musicians = await this.musicianRepository.findAll({
      where: {
        id: {
          [Op.ne]: musicianId,
        },
      },

      attributes: {
        exclude: ['userId'],
      },
      include: [
        {
          model: User,
          attributes: ['email'],
        },
        {
          model: ProfileInfo,
          attributes: ['avatarKey'],
        },
      ],
    });

    return this.getMusiciansWithUrl(musicians);
  }

  private getMusiciansWithUrl(musicians: Musician[]) {
    const musiciansWithUrl = musicians.map((musician) => {
      const musicianPlain = musician.get({ plain: true });
      const avatarUrl = this.awsService.createFileUrl(
        musicianPlain.profileInfo.avatarKey,
      );

      delete musicianPlain.profileInfo;
      return {
        ...musicianPlain,
        avatarUrl,
      };
    });

    return musiciansWithUrl;
  }

  async findByUserId(userId: number): Promise<Musician> {
    const musician = await this.musicianRepository.findOne({
      where: { userId },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (!musician) {
      throw new NotFoundException('Музыкант не был найден');
    }
    return musician;
  }

  async findChatsFormat(usersId: number[]): Promise<ChatsUserInfo[]> {
    const musicians = await this.musicianRepository.findAll({
      where: { userId: { [Op.in]: usersId } },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'languages',
          'genres',
          'subRoles',
          'city',
          'id',
          'experience',
        ],
      },
      include: [
        {
          model: ProfileInfo,
          attributes: ['avatarKey'],
        },
      ],
    });

    return this.getMusiciansWithUrl(musicians);
  }

  async findById(id: number): Promise<Musician> {
    const musician = await this.musicianRepository.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!musician) {
      throw new NotFoundException('Музыкант не был найден');
    }
    return musician;
  }

  async createMusician(musicianDto: CreateMusicianDto): Promise<Musician> {
    const { userId } = musicianDto;
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new BadRequestException('Некорректный ID пользователя');
    }

    const existingMusician = await this.findByUserId(userId);

    if (existingMusician) {
      throw new BadRequestException(
        'Данные музыканта уже были добавлены для этого пользователя',
      );
    }

    const musician = await this.musicianRepository.create(musicianDto);

    return musician;
  }

  async deleteMusician(id: number): Promise<Musician> {
    const musician = await this.musicianRepository.findOne({ where: { id } });
    if (!musician) {
      throw new BadRequestException('Пользователя с данным ID не найдено');
    }
    await musician.destroy();

    return musician;
  }

  async updateMusician(id: number, updateMusicianDto: UpdateMusicianDto) {
    const musician = await this.findById(id);

    return musician.update(updateMusicianDto);
  }
}
