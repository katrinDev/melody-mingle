import { IMessage } from "./IMessage";

export interface IChat {
  id: number;
  users: IChatUser[];
  messages: IMessage[];
}

type IChatUser = {
  userId: number;
  name: string;
  mainRole: string;
  avatarUrl: string;
}