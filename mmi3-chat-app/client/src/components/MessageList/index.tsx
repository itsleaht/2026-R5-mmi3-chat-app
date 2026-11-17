import type { Message } from "../../../../types/events"

type MessageListProps = {
    messageList: Message[]
}

function MessageList({ messageList }: MessageListProps) {
    return (
        <div>
            { messageList.map((message) => (
                <div key={ message.id }>
                    { message.timestamp } - 
                    { message.content }
                </div>
            )) }
        </div>
    )
}

export {
    MessageList
}