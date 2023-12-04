import { Module } from '@nestjs/common';
import { MusiciansController } from './musicians.controller';
import { MusiciansService } from './musicians.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Musician } from './musicians.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [MusiciansController],
  providers: [MusiciansService],
  imports: [SequelizeModule.forFeature([Musician]), UsersModule],
  exports: [MusiciansService],
})
export class MusiciansModule {}
