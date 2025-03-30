'use client'
import React from 'react'
import { UserHeader } from './user-header'
import { Messages } from './messages'
import './chatbox.css'
import { Inputfield } from './input-field'
import { useChatContext } from '@/app/context/chatProvider'

const Chatbox = () => {
    const { state } = useChatContext()

    if (!state?.selectedChat?._id) return (
        <div className='h-full flex justify-center items-center w-full bg-white p-5 rounded-md'>
            <p>Select any chat to start chatting or search any person from search tab</p>
        </div>
    )
    return (
        <>
            <div className="w-full bg-white p-5 rounded-md flex flex-col chatbox h-[500px]">
                <UserHeader />
                <div className="flex-grow overflow-auto">
                    <Messages currentUserEmail="rj71829@gmail.com" />
                </div>
                <Inputfield />
            </div>
        </>
    )
}

export default Chatbox