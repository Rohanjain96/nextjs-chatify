'use client'
import { useChatContext } from '@/app/context/chatProvider'
import { ChatActions } from '@/app/interfaces/client/app'
import { Chat } from '@/app/interfaces/client/chat'
import Image from 'next/image'
import React from 'react'

type Props = {
    chat: Chat;
    email: string
}

const SingleChat = ({ chat, email }: Props) => {
    const { dispatch } = useChatContext()
    const handleChatClick = () => {
        dispatch({ type: ChatActions.SET_SELECTED_CHAT, payload: chat })
    }
    return (
        <>
            <div className='flex bg-white p-3 mr-3 mb-3 rounded-lg items-center hover:bg-slate-200 cursor-pointer shadow gap-2' onClick={handleChatClick}>
                <div>
                    <Image src={chat.pic} alt='chat picture' className='w-7 h-7 rounded-full' width={28} height={28} />
                </div>
                <div className='flex items-center'>
                    <div className='flex flex-col w-[180px] leading-5'>
                        <h3 className="font-semibold text-base">{chat.chatName || ""}</h3>
                        <div className='flex gap-2 items-center min-h-[20px]'>
                            <p className='font-medium text-sm'>{chat.latestMessage?.sender?.email === email ? 'You:' : chat.latestMessage?.sender?.email || " "}</p>
                            <p className="text-slate-400 text-sm">{chat.latestMessage?.content || " "}</p>
                        </div>
                    </div>
                    <div className='flex flex-col text-xs items-end leading-3'>
                        <span className="font-medium mb-1">{new Date(chat.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        {chat.notificationCount > 0 ? <span className='w-5 h-5 bg-sky-500 rounded-full text-center text-white text-xs py-[2px]'>{chat.notificationCount}</span> : <span className='w-5 h-5 text-xs py-[2px]'> </span>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleChat