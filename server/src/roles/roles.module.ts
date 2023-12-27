import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { UserRoles } from './user-roles.model';
import { User } from '../users/users.model';

@Module({
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, UserRoles, User])],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
