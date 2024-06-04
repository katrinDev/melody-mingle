import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import AvatarWithStatus from '../../components/messages/AvatarWithStatus';
import ChatBubble from '../../components/messages/ChatBubble';
import MessageInput from '../../components/messages/MessageInput';
import MessagesPaneHeader from '../../components/messages/MessagesPaneHeader';
import { SmartChat } from '../../models/chat/IChat';
import { observer } from 'mobx-react-lite';
import { IMessage } from '../../models/chat/IMessage';
import { Context } from '../../main';

type MessagesPaneProps = {
	chat: SmartChat;
};

function MessagesPane(props: MessagesPaneProps) {
	const { chat } = props;
	const { userStore, chatsStore, snackbarStore } = React.useContext(Context);
	const [chatMessages, setChatMessages] = React.useState(chat.messages);
	const [textAreaValue, setTextAreaValue] = React.useState('');

	React.useEffect(() => {
		setChatMessages(chat.messages);
	}, [chat.messages]);

	return (
		<Sheet
			sx={{
				height: { xs: 'calc(100dvh - var(--Header-height))', lg: '100dvh' },
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: 'background.level1',
			}}
		>
			<MessagesPaneHeader sender={chat.sender} />
			<Box
				sx={{
					display: 'flex',
					flex: 1,
					minHeight: 0,
					px: 2,
					py: 3,
					overflowY: 'scroll',
					flexDirection: 'column-reverse',
				}}
			>
				<Stack spacing={2} justifyContent="flex-end">
					{chatMessages
						.slice()
						.reverse()
						.map((message: IMessage, index: number) => {
							const isYou = message.senderId === userStore.user.id;
							return (
								<Stack
									key={index}
									direction="row"
									spacing={2}
									flexDirection={isYou ? 'row-reverse' : 'row'}
								>
									{message.senderId !== userStore.user.id && (
										<AvatarWithStatus
											online={chat.sender.online}
											src={chat.sender.avatarUrl}
										/>
									)}
									<ChatBubble
										variant={isYou ? 'sent' : 'received'}
										{...message}
										chatSender={chat.sender}
									/>
								</Stack>
							);
						})}
				</Stack>
			</Box>
			<MessageInput
				textAreaValue={textAreaValue}
				setTextAreaValue={setTextAreaValue}
				onSubmit={() => {
					chatsStore.addMessage(
						{
							chatId: chat.id,
							createdAt: new Date(),
							content: textAreaValue,
							senderId: userStore.user.id,
						},
						snackbarStore
					);
				}}
			/>
		</Sheet>
	);
}

export default observer(MessagesPane);
