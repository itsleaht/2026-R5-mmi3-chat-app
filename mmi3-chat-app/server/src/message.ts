import { randomUUID } from "node:crypto";
import type { Message } from "../../types/events.js";

const messageList: Message[] = []

const createMessage = (userId: string, message: { type: Message['type'], content: Message['content']} ): Message => {
    return {
        ...message,
        id: randomUUID().toString(),
        userId: userId, 
        timestamp: Date.now().toString()
    };
}

export const addMessage = (userId: string, message: { type: Message['type'], content: Message['content'] }) => {
    const createdMessage = createMessage(userId, message);
    messageList.push(createdMessage);

    return createdMessage;
}

export const cleanupOldMessages = (maxAge: number) => {
    const now = Date.now();
    let deletedMessages = 0;
    messageList.forEach((message, i) => {
        const date = parseInt(message.timestamp)
        if (now - date > maxAge) {
            messageList.splice(i, 1)
            deletedMessages++;
        }
    })
    return deletedMessages;
}

export const getMessageList = () => {
    return {
        list: messageList
    }
}