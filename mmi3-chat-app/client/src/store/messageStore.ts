import { create } from "zustand"
import { type Message } from "../../../types/events"

type MessageState = {
    messages: Message[]
}

type MessageActions = {
    setMessages: (messages: Message[]) => void,
    addMessage: (message: Message) => void,
}

export const useMessageStore = create<MessageState & MessageActions>((set) => ({
    messages: [],
    setMessages: (newMessages) => set(() => ({
        messages: newMessages
    })),
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
    }))
}))