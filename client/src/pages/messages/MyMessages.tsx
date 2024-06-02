import Sheet from '@mui/joy/Sheet';
import MessagesPane from './MessagesPane';
import ChatsPane from './ChatsPane';
import { useContext, useEffect, useState } from 'react';
import { SmartChat } from '../../models/chat/IChat';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';
import { AxiosError } from 'axios';

function MyMessages() {
  const {chatsStore, snackbarStore, userStore} = useContext(Context);
  
  const [selectedChat, setSelectedChat] = useState<SmartChat | null>(null);
  const [loadingChats, setLoadingChats] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try{
        setLoadingChats(true);
        await chatsStore.fetchAllChatsForUser(snackbarStore, userStore.user?.id);

        setSelectedChat(chatsStore.chats[0]);
        setLoadingChats(false);
      } catch(error) {

        if (error instanceof AxiosError) {
          const serverMessage = error.response?.data.message;

          snackbarStore.changeAll(true, "danger", `${serverMessage}`);
        }
      }
    }

    fetchData();
  }, [])

  if (loadingChats || !selectedChat) {
    return <div>Loading...</div>;
  } else {
  return (
    <Sheet
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: { xs: 'var(--Header-height)', sm: 0 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(min-content, min(30%, 400px)) 1fr',
        },
      }}
    >
      <Sheet
        sx={{
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 100,
          width: '100%',
          top: 52,
        }}
      >
        <ChatsPane
          chats={chatsStore.chats}
          selectedChatId={selectedChat.id}
          setSelectedChat={setSelectedChat}
        />
      </Sheet>
      <MessagesPane chat={selectedChat!} />
    </Sheet>
  );
}
}

export default observer(MyMessages);