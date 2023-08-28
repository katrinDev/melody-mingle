import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), RolesModule],
  //we specify which repository this module should have access to by using forFeature
  controllers: [UsersController],
  providers: [UsersService],
  exports: [SequelizeModule, UsersService],
})
export class UsersModule {}
