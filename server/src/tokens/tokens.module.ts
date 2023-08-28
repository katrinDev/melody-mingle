import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './tokens.model';

@Module({
  providers: [TokensService],
  imports: [JwtModule.register({}), SequelizeModule.forFeature([Token])],
  exports: [TokensService, JwtModule],
})
export class TokensModule {}
