import { connectDb } from "@/app/db/db";
import { Chat } from "@/app/schemas/chats";
import { User } from "@/app/schemas/user";
import { getOrignalText } from "@/app/helpers/serverHelpers/encryption";
import { getDataFromToken } from "@/app/helpers/serverHelpers/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "@/app/interfaces/server/user";

export const GET = async (request: NextRequest) => {
  try {
    connectDb();

    // Extract user data from token
    const { success, message, email } = await getDataFromToken(request);
    if (!success)
      return NextResponse.json({ success: false, message }, { status: 401 });

    // Find the authenticated user
    const user = await User.findOne({ email }).select("-password").exec();
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    // Fetch chats where the user is a participant
    var chats = await Chat.find({
      users: { $elemMatch: { $eq: user._id } },
    })
      .populate({
        path: "users",
        model: "User", // Explicitly specify model name
        select: "-password",
      })
      .populate({
        path: "groupAdmin",
        model: "User", // Ensure this is correct if it's a User reference
        select: "-password",
        match: { isGroupChat: true },
      })
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .lean();

    // Populate latestMessage sender
    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      model: "User", // Explicitly specify model
      select: "name profilePic email phoneNumber",
    });

    // Process chat data
    for (let i = 0; i < chats.length; i++) {
      chats[i].notificationCount = 0;

      // Decrypt latest message content
      if (chats[i].latestMessage) {
        let content = chats[i].latestMessage.content;
        chats[i].latestMessage.content = getOrignalText(content);
      }

      // Determine chat name and picture
      if (!chats[i].isGroupChat) {
        const otherUser = chats[i].users.find(
          (usr: IUser) => usr.email !== email
        );
        chats[i].chatName = otherUser?.name || "Unknown";
        chats[i].pic = otherUser?.profilePic || "/images/dummy-person.png";
      } else {
        chats[i].pic = chats[i].groupPic;
      }
    }

    return NextResponse.json({
      success: true,
      message: "Successfully fetched all chats",
      chats,
    });
  } catch (error: any) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
