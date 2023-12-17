import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from './requests.model';
import { InjectModel } from '@nestjs/sequelize';
import { Musician } from 'src/musicians/musicians.model';
import { getAttributes } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request) private requestRepository: typeof Request,
  ) {}

  async createRequest(requestDto: CreateRequestDto): Promise<Request> {
    return this.requestRepository.create(requestDto);
  }

  async findAll(): Promise<Request[]> {
    return this.requestRepository.findAll({
      include: {
        model: Musician,
        attributes: ['name'],
        include: [
          {
            model: User,
            attributes: ['email'],
          },
        ],
      },
    });
  }

  async findById(id: number): Promise<Request> {
    return this.requestRepository.findByPk(id, {
      include: [
        {
          model: Musician,
          attributes: ['name'],
          include: [
            {
              model: User,
              attributes: ['email'],
            },
          ],
        },
      ],
    });
  }

  async deleteRequest(id: number): Promise<Request> {
    const request = await this.requestRepository.findByPk(id);
    if (!request) {
      throw new BadRequestException('There is no request with such id');
    }

    await request.destroy();

    return request;
  }
}
