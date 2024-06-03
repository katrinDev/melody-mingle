import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { TokensModule } from './tokens/tokens.module';
import { MusiciansModule } from './musicians/musicians.module';
import { ProfilesInfoModule } from './profiles-info/profiles-info.module';
import { AwsModule } from './aws/aws.module';
import { ProjectsModule } from './projects/projects.module';
import { OffersModule } from './offers/offers.module';
import { BannedUsersModule } from './banned-users/banned-users.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { JointProjectsModule } from './joint-projects/joint-projects.module';
import { SongChunksModule } from './song-chunks/song-chunks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `config/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
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
    MusiciansModule,
    ProfilesInfoModule,
    AwsModule,
    ProjectsModule,
    OffersModule,
    BannedUsersModule,
    ChatsModule,
    MessagesModule,
    JointProjectsModule,
    SongChunksModule,
  ],
})
export class AppModule {}
