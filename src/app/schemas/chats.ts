import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },

    isGroupChat: {
      type: Boolean,
      default: false,
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],

    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messages",
    },

    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    groupPic: {
      type: String,
      default:
        "https://th.bing.com/th?q=Group+Profile+Icon&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
  },
  {
    timestamps: true,
  }
);

export const Chat =
  mongoose.models.chats || mongoose.model("chats", chatSchema);
