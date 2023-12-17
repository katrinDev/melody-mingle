import { Module } from '@nestjs/common';
import { BannedUsersController } from './banned-users.controller';
import { BannedUsersService } from './banned-users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BannedUser } from './banned-users.model';

@Module({
  controllers: [BannedUsersController],
  providers: [BannedUsersService],
  imports: [SequelizeModule.forFeature([BannedUser])],
  exports: [BannedUsersService],
})
export class BannedUsersModule {}
