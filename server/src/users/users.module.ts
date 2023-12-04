import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesModule } from 'src/roles/roles.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { Role } from 'src/roles/roles.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    //creates a dynamic provider for the User model that has its own injection token
    SequelizeModule.forFeature([User, Role]),
    RolesModule,
    forwardRef(() => TokensModule),
  ],
  //we specify which repositories this module should have access to by using forFeature
  exports: [UsersService],
})
export class UsersModule {}
