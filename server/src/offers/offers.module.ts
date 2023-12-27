import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Offer } from './offers.model';
import { AwsModule } from '../aws/aws.module';
import { MusiciansModule } from '../musicians/musicians.module';
import { Musician } from '../musicians/musicians.model';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  imports: [
    SequelizeModule.forFeature([Offer, Musician]),
    AwsModule,
    MusiciansModule,
  ],
  exports: [OffersService],
})
export class OffersModule {}
