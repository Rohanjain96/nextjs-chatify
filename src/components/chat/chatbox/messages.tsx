'use client'
import { Message } from "@/app/interfaces/client/message";
import { getMessages } from "@/app/services/message-service";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Utility function for conditional class names
import { useChatContext } from "@/app/context/chatProvider";

type Props = {
    currentUserEmail: string; // Pass the logged-in user's email as a prop
};

export const Messages = ({ currentUserEmail }: Props) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const { state } = useChatContext()
    const fetchMessages = async () => {
        try {
            setLoading(true);
            const messages = await getMessages({ chatId: state.selectedChat._id });
            setMessages(messages.data.messages);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    if (loading) return <div className="h-full flex justify-center items-center"><p className="text-center text-gray-500">Loading...</p></div>

    return (
        <div className="py-6 w-full space-y-4 mx-auto pr-4">
            {messages?.map((message, index) => {
                const isMe = message.sender.email === currentUserEmail;
                const prevMessage = messages[index - 1];
                const formattedTime = new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                const isFirstInSequence = !prevMessage || prevMessage.sender.email !== message.sender.email;

                return (
                    <div key={message.id} className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
                        <div className="flex items-center gap-2">
                            {!isMe && message.sender.profilePic && (
                                <Image
                                    src={message.sender.profilePic}
                                    alt="Profile Picture"
                                    width={32}
                                    height={32}
                                    className="rounded-full w-8 h-8"
                                />
                            )}
                            <div
                                className={cn(
                                    "p-3 text-sm flex gap-2",
                                    isMe ? "bg-green-500 text-white self-end" : "bg-purple-500 text-white",
                                    isMe
                                        ? isFirstInSequence
                                            ? "rounded-lg rounded-tr-none"
                                            : "rounded-lg"
                                        : isFirstInSequence
                                            ? "rounded-lg rounded-tl-none"
                                            : "rounded-lg"
                                )}
                            >
                                <p>{message.content}</p>
                                <p className="text-xs text-gray-300 mt-2 text-right">{formattedTime}</p>
                            </div>
                            {isMe && message.sender.profilePic && (
                                <Image
                                    src={message.sender.profilePic}
                                    alt="Profile Picture"
                                    width={32}
                                    height={32}
                                    className="rounded-full w-8 h-8"
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
