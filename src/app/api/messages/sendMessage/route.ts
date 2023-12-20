import { connectDb } from "@/app/db/db";
import { getDataFromToken } from "@/app/helpers/serverHelpers/getDatafromToken";
import { User } from "@/app/schemas/user";
import { Message } from "@/app/schemas/message";
import CryptoJS from "crypto-js"
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {

    try {
        connectDb()
        const { content } = await request.json();
        if (!content) {
            return NextResponse.json({ success: true, message: "Invalid data passed" }, { status: 400 });
        }
        const encryptedmessagecontent = CryptoJS.AES.encrypt(content, process.env.MESSAGE_SECRET as string).toString();

        const userEmail = await getDataFromToken(request);
        const user = await User.findOne({ email: userEmail }).select("-password").exec()

        var newmessage = await Message.create({
            content: encryptedmessagecontent,
            sender: user._id
        });
        newmessage = await newmessage.populate("sender", "name pic email");


        var bytes = CryptoJS.AES.decrypt(newmessage.content, process.env.MESSAGE_SECRET as string);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        let message:any = await Message.findById({ _id: newmessage._id }).populate("sender", "name pic email").lean()
        message = { ...message, content: originalText }

        return NextResponse.json({ success: true, message: "Successfully send message", messageSend: message }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
}