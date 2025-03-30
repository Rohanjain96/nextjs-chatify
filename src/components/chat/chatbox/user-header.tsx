'use client'
import { useChatContext } from "@/app/context/chatProvider"
import { User } from "@/app/interfaces/client/user"
import Image from "next/image"

type Props = {
    user: User
}
export const UserHeader = () => {
    const { state } = useChatContext()
    return (
        <div className="flex items-center gap-2 max-h-[56px]">
            <Image src={state.selectedChat.pic} alt='user image' className="w-[50px] h-[50px] rounded-full ring-1 ring-blue-300 p-[2px]" width={50} height={50} />
            <div className="flex flex-col">
                <p className="text-2xl text-black font-medium">{state.selectedChat.chatName}</p>
                <p className="text-neutral-400">Online</p>
            </div>
        </div>
    )
}