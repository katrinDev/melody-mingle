import { AxiosResponse } from 'axios';
import { IChat } from '../models/chat/IChat';
import $api from '../http/axiosSetUp';
import { IMessage, MessageDto } from '../models/chat/IMessage';

export default class ChatsService {
	static async getAllChatsForUser(): Promise<AxiosResponse<IChat[]>> {
		return $api.get<IChat[]>(`chats/by-user`);
	}

	static async addMessageToChat(
		chatId: number,
		message: IMessage
	): Promise<AxiosResponse<MessageDto>> {
		return $api.post<MessageDto>(`chats/${chatId}`, message);
	}

	static async getChatsCount(): Promise<AxiosResponse<number>> {
		return $api.get<number>(`chats/count`);
	}
}
