import { connectDb } from "@/app/db/db";
import { Chat } from "@/app/schemas/chats";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
  try {
    connectDb();

    const { chatId, userIds } = await request.json();

    if (!chatId || userIds.length === 0) {
      return NextResponse.json(
        { success: false, message: "Bad request" },
        { status: 400 }
      );
    }

    const updatedGroup = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: [...userIds] } },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedGroup)
      return NextResponse.json(
        {
          success: false,
          message: "Group not found",
        },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: "Successfully added to group",
      chat: updatedGroup,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
};
