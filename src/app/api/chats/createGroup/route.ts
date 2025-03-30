import { connectDb } from "@/app/db/db";
import { Chat } from "@/app/schemas/chats";
import { User } from "@/app/schemas/user";
import { getDataFromToken } from "@/app/helpers/serverHelpers/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    connectDb();

    const { userIds, groupName } = await request.json();
    if (!groupName) {
      return NextResponse.json(
        { success: false, message: "Please enter all fields" },
        { status: 400 }
      );
    }

    if (userIds.length < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "For group creation there must be atleast 2 users",
        },
        { status: 400 }
      );
    }

    const { success, email, message } = await getDataFromToken(request);
    if (!success)
      return NextResponse.json({ success: false, message }, { status: 401 });

    const user = await User.findOne({ email }).select("-password").exec();

    var groupChat = {
      chatName: groupName,
      isGroupChat: true,
      users: [user._id, ...userIds],
      groupAdmin: user._id,
    };

    const createdgroupchat = await Chat.create(groupChat);

    let fullGroupChat = await Chat.findOne({ _id: createdgroupchat._id })
      .populate("User", "-password")
      .populate("groupAdmin");

    fullGroupChat = await User.populate(fullGroupChat, {
      path: "latestMessage.sender",
      select: "name pic email phonenumber",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully created group",
        createdGroup: fullGroupChat,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
};
