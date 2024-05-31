import { AxiosError } from 'axios';
import Pusher from 'pusher-js';
import { makeAutoObservable } from 'mobx';
import { IChat } from '../models/chat/IChat';
import SnackbarPropsStore from './SnackbarPropsStore';
import ChatsService from '../services/ChatsService';
import { MessageDto } from '../models/chat/IMessage';

    
export default class ChatsStore {
  chats = [] as IChat[];
  channels = [] as string[];
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher('120f0216e88b902b0e81', {
      cluster: 'eu',
    });

    makeAutoObservable(this);
  }

  private setAllChats(value: IChat[]) {
    this.chats = value;
  }

  private setChannels(channels: string[]) {
    this.channels = channels;
  }

  async fetchAllChatsForUser(snackbarStore: SnackbarPropsStore) {
    try {
      const {data} = await ChatsService.getAllChatsForUser();
      this.setAllChats(data);

      const userIDs = data.map(chat => chat.users.map(user => user.userId));
      const channelsNames = userIDs.map(idsArr => idsArr.reduce((name, userId) => name += `-${userId}`, 'chat'));

      this.subscribeToChannels(channelsNames);
      this.setChannels(channelsNames);
    } catch(error) {
      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data.message;

        snackbarStore.changeAll(true, "danger", `${serverMessage}`);
      }
   }
  }

  private subscribeToChannels(channels: string[]) {
    channels.map(channel => {
      const subscribedChannel = this.pusher.subscribe(channel);
      subscribedChannel.bind('messages', (data: MessageDto) => {
        let {chatId, ...message} = data;
        const chatForMessage = this.chats.find(chat => chat.id === chatId);

        chatForMessage?.messages.push(message);
      })
    });
  }

  async addMessage(messageDto: MessageDto, snackbarStore: SnackbarPropsStore) {
    try{ 
      const {chatId, ...message} = messageDto;
      const {data} = await ChatsService.addMessageToChat(chatId, message);
    } catch(error) {
      if (error instanceof AxiosError) {
        const serverMessage = error.response?.data.message;

        snackbarStore.changeAll(true, "danger", `${serverMessage}`);
      }
   }
  }

  // handleTextChange(e) {
  //   if (e.keyCode === 13) {
  //     const payload = {
  //       username: this.state.username,
  //       message: this.state.text
  //     };
  //     axios.post('http://localhost:5000/message', payload);
  //   } else {
  //     this.setState({ text: e.target.value });
  //   }
}


    // render() {
    //     return (
    //       <div className="App">
    //         <header className="App-header">
    //           <img src={logo} className="App-logo" alt="logo" />
    //           <h1 className="App-title">Welcome to React-Pusher Chat</h1>
    //         </header>
    //         <section>
    //           <ChatList chats={this.state.chats} />
    //           <ChatBox
    //             text={this.state.text}
    //             username={this.state.username}
    //             handleTextChange={this.handleTextChange}
    //           />
    //         </section>
    //       </div>
    //     );
    //   }
     
    // }
