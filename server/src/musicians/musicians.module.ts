import { Module } from '@nestjs/common';
import { MusiciansController } from './musicians.controller';
import { MusiciansService } from './musicians.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Musician } from './musicians.model';

@Module({
  controllers: [MusiciansController],
  providers: [MusiciansService],
  imports: [SequelizeModule.forFeature([Musician])],
  exports: [MusiciansService],
})
export class MusiciansModule {}
