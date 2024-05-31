import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Offer } from './offers.model';
import { InjectModel } from '@nestjs/sequelize';
import { Musician } from '../musicians/musicians.model';
import { User } from '../users/users.model';
import { CreateOfferDto } from './dto/create-offer.dto';
import { MusiciansService } from '../musicians/musicians.service';
import { AwsService } from '../aws/aws.service';

import * as moment from 'moment';

export interface GetOfferResponse {
  id: number;
  headline: string;
  body: string;
  mainRoles?: string[];
  genres: string[];
  location: string;
  expirationDate: Date;
  photoUrl: string;
  musician: {
    name: string;
    user: {
      email: string;
    };
  };
}

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer) private offerRepository: typeof Offer,

    private musiciansService: MusiciansService,
    private awsService: AwsService,
  ) {}

  async checkMusician(musicianId: number) {
    const musician = await this.musiciansService.findById(musicianId);

    if (!musician) {
      throw new NotFoundException("Musician wasn't found");
    }
  }

  async createOffer(
    offerDto: CreateOfferDto,
    fileName: string,
    data: Buffer,
    musicianId: number,
  ): Promise<GetOfferResponse> {
    try {
      await this.checkMusician(musicianId);

      const date = moment(offerDto.expirationDate, 'DD.MM.YYYY').toDate();

      const uploadResult = await this.awsService.uploadPublicFile(
        data,
        fileName,
      );

      const newOffer = await this.offerRepository.create({
        ...offerDto,
        expirationDate: date,
        photoKey: uploadResult.Key,
        musicianId,
      });

      const offer = await this.findById(newOffer.id);

      const offerPlain = offer.get({ plain: true });

      return {
        ...offerPlain,
        photoUrl: uploadResult.Location,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Unsuccessfull offer creation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<GetOfferResponse[]> {
    const offers = await this.offerRepository.findAll({
      attributes: {
        exclude: ['updatedAt', 'musicianId'],
      },
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

    const offersWithUrl = offers.map((offer) => {
      const offerPlain = offer.get({ plain: true });
      const photoUrl = this.awsService.createFileUrl(offerPlain.photoKey);
      delete offerPlain.photoKey;
      return {
        ...offerPlain,
        photoUrl,
      };
    });

    return offersWithUrl;
  }

  async findById(id: number): Promise<Offer> {
    return this.offerRepository.findByPk(id, {
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

  async deleteOffer(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findByPk(id);
    if (!offer) {
      throw new BadRequestException('There is no offer with such id');
    }

    await offer.destroy();

    return offer;
  }

  async getOffersCount(): Promise<number> {
    return this.offerRepository.count();
  }
}
