import { useState } from "react"
import { useSocket } from "../../contexts/SocketContext"
import { Button } from "../Button"

function TypeMessage() {
    const socket = useSocket()
    const [content, setContent] = useState("")

    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">Message</legend>
            <textarea className="textarea h-24" placeholder="Votre message" onInput={(e) => setContent(e.currentTarget.value)} value={content}></textarea>
            <Button onClick={() => {
                socket.emit('send_message', {
                    message: {
                        type: 'text',
                        content: content
                    }
                })
                setContent('')
            }}>Envoyer</Button>
        </fieldset>
    )
}

export {
    TypeMessage
}