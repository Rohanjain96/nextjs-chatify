import { connectDb } from "@/app/db/db";
import { Chat } from "@/app/schemas/chats";
import { User } from "@/app/schemas/user";
import { getOrignalText } from "@/app/helpers/serverHelpers/encryption";
import { getDataFromToken } from "@/app/helpers/serverHelpers/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    connectDb();

    const { success, message, email } = await getDataFromToken(request);
    if (!success)
      return NextResponse.json({ success: false, message }, { status: 401 });

    const user = await User.findOne({ email }).select("-password").exec();

    var chats = await Chat.find({
      users: { $elemMatch: { $eq: user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .lean();

    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name pic email phonenumber",
    });

    for (let i = 0; i < chats.length; i++) {
      chats[i].notificationcount = 0;

      if (chats[i].latestMessage) {
        let content = chats[i].latestMessage.content;
        const originalText = getOrignalText(content);
        chats[i].latestMessage.content = originalText;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Successfully fetched all chats",
      chats,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
};
