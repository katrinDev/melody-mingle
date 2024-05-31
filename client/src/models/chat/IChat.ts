import { IMessage } from "./IMessage";

export interface IChat {
  id: number;
  users: IChatUser[];
  messages: IMessage[];
}

export type IChatUser = {
  name: string;
  userId: number;
  mainRole: string;
  avatarUrl: string;
  online?: boolean;
}

export type SmartChat = {
  id: number;
  sender: IChatUser;
  messages: IMessage[];
}