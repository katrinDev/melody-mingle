import { Module } from '@nestjs/common';
import { MusiciansController } from './musicians.controller';
import { MusiciansService } from './musicians.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Musician } from './musicians.model';
import { UsersModule } from 'src/users/users.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  controllers: [MusiciansController],
  providers: [MusiciansService],
  imports: [SequelizeModule.forFeature([Musician]), UsersModule, AwsModule],
  exports: [MusiciansService],
})
export class MusiciansModule {}
