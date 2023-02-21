import { Collection } from 'mongodb';
import { MessagePayload, Message, ChatMessage } from './types/MessageTypes';

export default function (collection: Collection<Message | MessagePayload>) {
  async function addMessage(payload: MessagePayload): Promise<any> {
    let newMessage;

    try {
      newMessage = await collection.insertOne(payload);
    } catch (e) {
      console.log(e);
    }

    if (newMessage) return newMessage;
    else return false;
  }

  async function getChat(sender: string, receiver: string): Promise<ChatMessage[] | false> {
    let chat: Message[] = [] ;

    try {
      const result = await collection
        .find({
          $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender },
          ],
        })
        .toArray();
      chat = result as Message[];
    } catch (e) {
      console.log(e);
    }

    if (chat.length) {
      return chat.map(({ sender, receiver, message, timestamp }) => ({ sender, receiver, message, timestamp }));
    } else return false;
  }

  return {
    addMessage,
    getChat,
  };
}
