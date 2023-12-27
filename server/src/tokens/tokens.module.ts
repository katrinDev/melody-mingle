import { Module, forwardRef } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './tokens.model';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [TokensService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({}),
    SequelizeModule.forFeature([Token]),
  ],
  exports: [TokensService, JwtModule],
})
export class TokensModule {}
