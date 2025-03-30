import { connectDb } from "@/app/db/db";
import { Chat } from "@/app/schemas/chats";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
  try {
    connectDb();

    const { chatId, chatName } = await request.json();

    if (!chatId || !chatName.trim()) {
      return NextResponse.json(
        { success: false, message: "Bad request" },
        { status: 400 }
      );
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("User", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return NextResponse.json(
        { success: false, message: "Group Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully updated group name",
      updatedChat,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
};
