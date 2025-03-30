import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    readBy: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    chat: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "chats",
    },
  },
  { timestamps: true }
);

export const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
