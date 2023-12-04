import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Musician } from './musicians.model';
import { CreateMusicianDto } from './dto/create-musician.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MusiciansService {
  constructor(
    @InjectModel(Musician) private musicianRepository: typeof Musician,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Musician[]> {
    return this.musicianRepository.findAll();
  }

  async findByUserId(userId: number): Promise<Musician> {
    return this.musicianRepository.findOne({ where: { userId } });
  }

  async createMusician(musicianDto: CreateMusicianDto): Promise<Musician> {
    const { userId } = musicianDto;
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new BadRequestException('Incorrect user ID');
    }

    const existingMusician = await this.findByUserId(userId);

    if (existingMusician) {
      throw new BadRequestException(
        'Musician info for this user have been already added',
      );
    }

    const musician = await this.musicianRepository.create(musicianDto);

    return musician;
  }

  async deleteMusician(id: number): Promise<Musician> {
    const musician = await this.musicianRepository.findOne({ where: { id } });
    if (!musician) {
      throw new BadRequestException('There is no musician with such id');
    }
    await musician.destroy();

    return musician;
  }
}
