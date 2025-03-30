import { IUser } from "./user";

export interface Message {
  id: string;
  content: string;
  sender: IUser;
  readyBy: IUser[];
}
