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

  async findAll(): Promise<GetMusicianResponse[]> {
    const musicians = await this.musicianRepository.findAll({
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

    const musiciansWithUrl = musicians.map((musician) => {
      let musicianPlain = musician.get({ plain: true });
      let avatarUrl = this.awsService.createFileUrl(
        musicianPlain.profileInfo.avatarKey,
      );

      delete musicianPlain.profileInfo.avatarKey;
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
    });

    if (!musician) {
      throw new NotFoundException('Музыкант не был найден');
    }
    return musician;
  }

  async findById(id: number): Promise<Musician> {
    const musician = await this.musicianRepository.findByPk(id);
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
}
