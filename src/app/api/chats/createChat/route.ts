import { connectDb } from "@/app/db/db";
import { Chat } from "@/app/schemas/chats";
import { User } from "@/app/schemas/user";
import { getDataFromToken } from "@/app/helpers/serverHelpers/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    connectDb();
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Bad request" },
        { status: 400 }
      );
    }

    const { success, email, message } = await getDataFromToken(request);
    if (!success)
      return NextResponse.json({ success: false, message }, { status: 401 });

    const user = await User.findOne({ email }).select("-password").exec();

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email phonenumber",
    });

    if (isChat.length > 0) return NextResponse.json(isChat[0]);

    const chatData = {
      isGroupChat: false,
      users: [user._id, userId],
    };

    const createdChat = await Chat.create(chatData);
    const fullchat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );

    return NextResponse.json({
      success: true,
      message: "Successfully get chat",
      chat: fullchat,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
};
