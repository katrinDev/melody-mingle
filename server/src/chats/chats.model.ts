import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Message } from 'src/messages/messages.model';
import { User } from 'src/users/users.model';
import { UserChats } from './user-chats.model';

export interface ChatCreationAttrs {
  users: User[];
}

@Table({ tableName: 'chats' })
export class Chat extends Model<Chat, ChatCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @BelongsToMany(() => User, () => UserChats)
  users: User[];

  @HasMany(() => Message)
  messages: Message[];
}
