import { connectDb } from "@/app/db/db";
import { getDataFromToken } from "@/app/helpers/serverHelpers/getDatafromToken";
import { User } from "@/app/schemas/user";
import { Message } from "@/app/schemas/message";
import { NextRequest, NextResponse } from "next/server";
import {
  getEncryptedText,
  getOrignalText,
} from "@/app/helpers/serverHelpers/encryption";
import { Chat } from "@/app/schemas/chats";

export const POST = async (request: NextRequest) => {
  try {
    connectDb();

    const { content, chatId } = await request.json();
    if (!content || !chatId) {
      return NextResponse.json(
        { success: true, message: "Invalid data passed" },
        { status: 400 }
      );
    }
    const encryptedmessagecontent = getEncryptedText(content);

    const { success, email, message } = await getDataFromToken(request);
    if (!success)
      return NextResponse.json({ success: false, message }, { status: 401 });
    const user = await User.findOne({ email }).select("-password").exec();

    const encryptedMessage = await Message.create({
      content: encryptedmessagecontent,
      sender: user._id,
      chat: chatId,
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: encryptedMessage });
    let populatedMessage = await encryptedMessage.populate(
      "sender",
      "name pic email"
    );

    const originalText = getOrignalText(populatedMessage.content);

    let userMessage: any = await Message.findById({ _id: populatedMessage._id })
      .populate("sender", "name pic email")
      .lean();
    userMessage = { ...userMessage, content: originalText };

    return NextResponse.json(
      {
        success: true,
        message: "Successfully send message",
        messageSend: message,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
};
