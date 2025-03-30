import { ObjectId } from "mongoose";

export interface User {
  _id: string;
  phoneNumber: string;
  email: string;
  name: string;
  dateOfBirth?: string;
  profilePic?: string;
  password?: string;
}
