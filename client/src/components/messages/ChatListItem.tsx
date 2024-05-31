import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import AvatarWithStatus from './AvatarWithStatus';
import { toggleMessagesPane } from '../../pages/messages/utils';
import { IChatUser, SmartChat } from '../../models/chat/IChat';
import { IMessage } from '../../models/chat/IMessage';
import { observer } from 'mobx-react-lite';

type ChatListItemProps = ListItemButtonProps & {
  chatId: number;
  sender: IChatUser;
  messages: IMessage[];
  unread?: boolean;
  selectedChatId: number;
  setSelectedChat: (chat: SmartChat) => void;
};

 function ChatListItem(props: ChatListItemProps) {
  const { chatId, sender, messages, selectedChatId, setSelectedChat } = props;
  const selected = selectedChatId === chatId;

  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            setSelectedChat({ id: chatId, sender, messages });
          }}
          selected={selected}
          color="neutral"
          sx={{
            flexDirection: 'column',
            alignItems: 'initial',
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus online={sender.online} src={sender.avatarUrl} />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{sender.name}</Typography>
              <Typography level="body-sm">{sender.mainRole}</Typography>
            </Box>
            <Box
              sx={{
                lineHeight: 1.5,
                textAlign: 'right',
              }}
            >
              {messages[0].unread && (
                <CircleIcon sx={{ fontSize: 12 }} color="primary" />
              )}
              <Typography
                level="body-xs"
                display={{ xs: 'none', md: 'block' }}
                noWrap
              >
                5 мин назад 
              </Typography>
            </Box>
          </Stack>
          <Typography
            level="body-sm"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {messages[0].content}
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}

export default observer(ChatListItem);