import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, TokensModule],
  exports: [AuthService],
})
export class AuthModule {}
