'use client'
import { createContext, PropsWithChildren, useContext, useReducer } from "react";
import { Action, ChatActions } from "../interfaces/client/app";
import { Chat } from "../interfaces/client/chat";

interface ChatState {
    selectedChat: Chat;
}

const initialState: ChatState = {
    selectedChat: {} as Chat,
};

const ChatContext = createContext<{ state: ChatState; dispatch: React.Dispatch<Action<ChatActions, Chat>> } | undefined>(undefined);

export const ChatProvider = ({ children }: PropsWithChildren) => {
    const reducer = (state: ChatState, action: Action<ChatActions, Chat>): ChatState => {
        switch (action.type) {
            case ChatActions.SET_SELECTED_CHAT:
                return { ...state, selectedChat: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return <ChatContext.Provider value={{ state, dispatch }}>{children}</ChatContext.Provider>;
};


export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatContext must be used within a ChatProvider");
    }
    return context;
};
