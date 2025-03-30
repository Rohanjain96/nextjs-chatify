'use client'
import SingleChat from '@/components/chat/mychats/chat'
import React, { useEffect, useState } from 'react'
import "./mychats.css"
import { Chat } from '@/app/interfaces/client/chat'
import { getChats } from '@/app/services/chat-service'
import SingleChatSkeleton from './chat-skeleton'

const Mychats = () => {
    const [chats, setChats] = useState<Chat[]>([])
    const [loading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const fetchChats = async () => {
        setLoading(true)
        try {
            const allChats = await getChats()
            setChats(allChats.data.chats)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setIsError(true)
        }
    }

    useEffect(() => {
        fetchChats()
    }, [])

    return (
        <>
            <div className='flex flex-col h-full overflow-y-auto scroll'>
                {
                    loading || isError ?
                        Array.from({ length: 10 }).map((_, index) => {
                            return <SingleChatSkeleton key={index} />
                        })
                        :
                        chats.map((chat, index) => {
                            return <SingleChat key={index} chat={chat} email='rj71829@gmail.com' />
                        })
                }
            </div>
        </>
    )
}

export default Mychats