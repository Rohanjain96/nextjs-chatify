import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { userInterface } from "../interfaces/user";

const userSchema = new mongoose.Schema<userInterface>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: String },
  password: { type: String, required: true },
  profilePic: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

userSchema.methods.comparePassword = async function (password: string) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
