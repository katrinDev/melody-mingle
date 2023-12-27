import { Module } from '@nestjs/common';
import { ProfilesInfoService } from './profiles-info.service';
import { ProfileInfo } from './profiles-info.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfilesInfoController } from './profiles-info.controller';
import { MusiciansModule } from 'src/musicians/musicians.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  providers: [ProfilesInfoService],
  imports: [
    SequelizeModule.forFeature([ProfileInfo]),
    MusiciansModule,
    AwsModule,
  ],
  exports: [ProfilesInfoService],
  controllers: [ProfilesInfoController],
})
export class ProfilesInfoModule {}
