import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Request } from './requests.model';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService],
  imports: [SequelizeModule.forFeature([Request])],
  exports: [RequestsService],
})
export class RequestsModule {}
