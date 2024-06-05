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
import { JointsMusicianInfo } from 'src/joint-projects/joint-projects.service';

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

  async findByUserId(userId: number, check: boolean): Promise<Musician> {
    const musician = await this.musicianRepository.findOne({
      where: { userId },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (check && !musician) {
      throw new NotFoundException('Музыкант не был найден');
    }
    return musician;
  }

  private async filterAsync<T>(
    array: T[],
    callback: (value: T) => Promise<boolean>,
  ): Promise<T[]> {
    const results = await Promise.all(array.map(callback));
    return array.filter((_, index) => results[index]);
  }

  async findChatsFormat(usersId: number[]): Promise<ChatsUserInfo[]> {
    const adminsIdArr = await this.filterAsync(usersId, async (id) => {
      const user = await this.usersService.findById(id);
      return user.roles.some((role) => role.value === 'ADMIN');
    });

    const userRoleIdsArr = usersId.filter((id) => !adminsIdArr.includes(id));

    const userRoleMusicians = await this.musicianRepository.findAll({
      where: { userId: { [Op.in]: userRoleIdsArr } },
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

    const musiciansWithUrl = this.getMusiciansWithUrl(userRoleMusicians);

    const adminRoleInfo = adminsIdArr.map((id) => {
      return {
        userId: id,
        mainRole: 'Admin',
        name: 'Melody Mingle',
      };
    });

    return [...musiciansWithUrl, ...adminRoleInfo];
  }

  async getJointProjectsFormat(
    musiciansId: number[],
  ): Promise<JointsMusicianInfo[]> {
    const musicians = await this.musicianRepository.findAll({
      where: { id: { [Op.in]: musiciansId } },
      attributes: {
        exclude: [
          'subRoles',
          'city',
          'experience',
          'languages',
          'genres',
          'userId',
          'createdAt',
          'updatedAt',
        ],
      },
      include: [
        {
          model: ProfileInfo,
          attributes: ['avatarKey'],
        },
        {
          model: User,
          attributes: ['email'],
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

    const existingMusician = await this.findByUserId(userId, false);

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
