import { useState } from "react"
import { useSocket } from "../../contexts/SocketContext"

function TypeMessage() {
    const socket = useSocket()
    const [content, setContent] = useState("")

    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">Message</legend>
            <textarea className="textarea h-24" placeholder="Votre message" onInput={(e) => setContent(e.currentTarget.value)}></textarea>
            <button onClick={() => {
                socket.emit('send_message', {
                    message: {
                        type: 'text',
                        content: content
                    }
                })
            }}>Envoyer</button>
        </fieldset>
    )
}

export {
    TypeMessage
}