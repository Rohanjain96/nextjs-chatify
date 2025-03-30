import { Message } from "./message";
import { User } from "./user";

export type Chat = {
  isGroupChat: boolean;
  chatName: string;
  users: User[];
  latestMessage: Message;
  groupAdmin: User;
  pic: string;
  createdAt: string;
  updatedAt: String;
  notificationCount: number;
  _id: string;
};
