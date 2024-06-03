import { AxiosError } from 'axios';
import Pusher from 'pusher-js';
import { makeAutoObservable } from 'mobx';
import { IChat, IChatUser, SmartChat } from '../models/chat/IChat';
import SnackbarPropsStore from './SnackbarPropsStore';
import ChatsService from '../services/ChatsService';
import { IMessage, MessageDto } from '../models/chat/IMessage';

export default class ChatsStore {
	chats = [] as SmartChat[];
	channels = [] as string[];
	chatsCount = 0;
	private pusher: Pusher;

	constructor() {
		this.pusher = new Pusher('120f0216e88b902b0e81', {
			cluster: 'eu',
		});

		Pusher.log = message => console.log(message);

		makeAutoObservable(this, {}, { deep: true });
	}

	private setChatsCount(count: number) {
		this.chatsCount = count;
	}

	private setAllChats(allInfoChats: IChat[], myId: number) {
		const smartChats = allInfoChats.map(chat => {
			const sender: IChatUser = chat.users.find(user => user.userId !== myId)!;

			return { id: chat.id, messages: chat.messages, sender };
		});

		this.chats = smartChats;
	}

	private setChannels(channels: string[]) {
		this.channels = channels;
	}

	async fetchAllChatsForUser(snackbarStore: SnackbarPropsStore, myId: number) {
		try {
			const { data } = await ChatsService.getAllChatsForUser();
			this.setAllChats(data, myId);

			const userIDs = data.map(chat => chat.users.map(user => user.userId));
			const channelsNames = userIDs.map(idsArr =>
				idsArr
					.sort((a, b) => a - b)
					.reduce((name, userId) => (name += `-${userId}`), 'chat')
			);

			this.subscribeToChannels(channelsNames);
			this.setChannels(channelsNames);
		} catch (error) {
			if (error instanceof AxiosError) {
				const serverMessage = error.response?.data.message;

				snackbarStore.changeAll(true, 'danger', `${serverMessage}`);
			}
		}
	}

	updateChat(chatId: number, message: IMessage) {
		const chatToUpdate = this.chats.find(chat => chat.id === chatId);

		chatToUpdate?.messages.unshift(message);
	}

	private subscribeToChannels(channels: string[]) {
		channels.map(channel => {
			const subscribedChannel = this.pusher.subscribe(channel);
			subscribedChannel.bind('message', (data: MessageDto) => {
				console.log(JSON.stringify(data, null, 4));
				let { chatId, ...message } = data;
				this.updateChat(chatId, message);
			});
		});
	}

	async addMessage(messageDto: MessageDto, snackbarStore: SnackbarPropsStore) {
		try {
			const { chatId, ...message } = messageDto;
			await ChatsService.addMessageToChat(chatId, message);
		} catch (error) {
			if (error instanceof AxiosError) {
				const serverMessage = error.response?.data.message;

				snackbarStore.changeAll(true, 'danger', `${serverMessage}`);
			}
		}
	}

	async fetchChatsCount(snackbarStore: SnackbarPropsStore) {
		try {
			const { data } = await ChatsService.getChatsCount();

			this.setChatsCount(data);
		} catch (error) {
			if (error instanceof AxiosError) {
				const serverMessage = error.response?.data.message;

				snackbarStore.changeAll(true, 'danger', `${serverMessage}`);
			}
		}
	}
}
