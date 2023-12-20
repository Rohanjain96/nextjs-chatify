import { connectDb } from "@/app/db/db";
import { getDataFromToken } from "@/app/helpers/serverHelpers/getDatafromToken";
import { User } from "@/app/schemas/user";
import { Message } from "@/app/schemas/message";
import { NextRequest, NextResponse } from "next/server";
import { getEncryptedText, getOrignalText } from "@/app/helpers/serverHelpers/encryption";

export const POST = async (request: NextRequest) => {
    try {

        connectDb()

        const { content } = await request.json();
        if (!content) {
            return NextResponse.json({ success: true, message: "Invalid data passed" }, { status: 400 });
        }
        const encryptedmessagecontent = getEncryptedText(content)

        const userEmail = await getDataFromToken(request);
        const user = await User.findOne({ email: userEmail }).select("-password").exec()

        const encryptedMessage = await Message.create({
            content: encryptedmessagecontent,
            sender: user._id
        });
        
        const newMessage = await encryptedMessage.populate("sender", "name pic email");

        const originalText = getOrignalText(newMessage.content)

        let message:any = await Message.findById({ _id: newMessage._id }).populate("sender", "name pic email").lean()
        message = { ...message, content: originalText }

        return NextResponse.json({ success: true, message: "Successfully send message", messageSend: message }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
}