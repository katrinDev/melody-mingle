import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { TokensService } from './tokens/tokens.service';
import { RolesModule } from './roles/roles.module';
import { takeCoverage } from 'v8';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `config/.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    TokensModule,
  ],
})
export class AppModule {}
