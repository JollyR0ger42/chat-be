import { Collection } from 'mongodb';
import { MessagePayload, Message, ChatMessage } from './types/MessageTypes';

export default function (collection: Collection<Message>) {
  async function addMessage(payload: MessagePayload): Promise<Message | false> {
    let newMessage;

    try {
      newMessage = await collection.insertOne(payload);
    } catch (e) {
      console.log(e);
    }

    if (newMessage) return newMessage.ops[0];
    else return false;
  }

  async function getChat(sender: string, receiver: string): Promise<ChatMessage[] | false> {
    let chat: Message[];

    try {
      chat = await collection
        .find({
          $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender },
          ],
        })
        .toArray();
    } catch (e) {
      console.log(e);
    }

    if (chat) {
      return chat.map(({ sender, receiver, message, timestamp }) => ({ sender, receiver, message, timestamp }));
    } else return false;
  }

  return {
    addMessage,
    getChat,
  };
}
