export interface IMessage {
	content: string;
	createdAt: Date;
	senderId: number;
	unread?: boolean;
	attachment?: {
		fileName: string;
		type: string;
		size: string;
	};
}

type ChatId = {
	chatId: number;
};

export type MessageDto = IMessage & ChatId;
