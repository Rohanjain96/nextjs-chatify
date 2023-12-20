import { ObjectId } from "mongoose";

export interface userInterface {
  _id: ObjectId
  phoneNumber: String;
  email: String;
  name: String;
  dateOfBirth?: String;
  profilePic?: String;
  password?: String;
}
