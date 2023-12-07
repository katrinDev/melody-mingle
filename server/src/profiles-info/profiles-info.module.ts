import { Module } from '@nestjs/common';
import { ProfilesInfoService } from './profiles-info.service';
import { ProfileInfo } from './profiles-info.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfilesInfoController } from './profiles-info.controller';

@Module({
  providers: [ProfilesInfoService],
  imports: [SequelizeModule.forFeature([ProfileInfo])],
  exports: [ProfilesInfoService],
  controllers: [ProfilesInfoController],
})
export class ProfilesInfoModule {}
