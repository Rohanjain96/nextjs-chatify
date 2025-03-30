import { User } from "./user";

export interface Message {
  id: string;
  content: string;
  sender: User;
  readyBy: User[];
  createdAt: string;
  updatedAt: string;
}
