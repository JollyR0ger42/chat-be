export interface MessagePayload {
  sender: string;
  receiver: string;
  message: string;
  timestamp: Date;
}

export interface Message {
  _id: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp: Date;
}

export interface ChatMessage {
  sender: string;
  receiver: string;
  message: string;
  timestamp: Date;
}