import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: String },
  password: { type: String, required: true },
  profilePic: {
    type: String,
    default: "/images/dummy-person.png",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);

  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
