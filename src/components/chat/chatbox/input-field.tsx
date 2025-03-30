'use client'

import { useChatContext } from "@/app/context/chatProvider"
import { sendMessage } from "@/app/services/message-service"
import { toast } from "@/components/ui/use-toast"
import { Send, SendHorizonal } from "lucide-react"
import { useState } from "react"

export const Inputfield = () => {
    const [message, setMessage] = useState("")

    const { state } = useChatContext()

    const handleSendMessage = async () => {
        try {
            await sendMessage({ message, chatId: state.selectedChat._id })
            setMessage("")
        } catch (error: any) {
            toast({
                description: error.message,
                duration: 3000,
                variant: 'destructive'
            })
        }
    }
    return (
        <div className="flex w-full items-center mt-4 gap-2">
            <input
                value={message}
                placeholder="Enter your message"
                onChange={(e) => setMessage(e.target.value)}
                className="border-slate-600 border rounded-sm py-2 px-4 max-h-[48px] w-full" />

            <button type="submit" className="flex justify-center bg-green-500 text-white h-12 w-12 items-center rounded-full" onClick={handleSendMessage} ><SendHorizonal size={20} /></button>
        </div>
    )
}