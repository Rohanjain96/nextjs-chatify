import { Message } from "@/app/schemas/message";
import CryptoJS from "crypto-js";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(request:NextRequest)=>{
    const {chatId} = await request.json();
    try {
        let messages = await Message.find({chat:chatId}).populate("sender","name pic email phonenumber").populate("chat").lean();
        messages = messages.map(message=>{
            var bytes  = CryptoJS.AES.decrypt(message.content, process.env.MESSAGE_SECRET as string);
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            return({...message,content:originalText})
        })

        return NextResponse.json({success:true,message:"Successfully fetched all messages",messages});
    } catch (error) {
        return NextResponse.json({success:false,error},{status:500});
    }
}