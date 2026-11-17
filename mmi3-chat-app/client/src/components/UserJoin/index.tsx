import { useState } from "react"
import { useSocket } from "../../contexts/SocketContext"
import { Button } from "../Button"

function UserJoin() {
    const socket = useSocket()
    const [inputUsernameValue, setInputUsernameValue] = useState("")

    return (
        <>
            <input type="text" placeholder="Nom d'utilisateur" className="input" onChange={(e) => setInputUsernameValue(e.currentTarget.value)} />
            <Button 
                onClick={() => {
                    socket.emit('user_join', {
                        user: {
                            username: inputUsernameValue
                        }
                    })
                }}>
                Rejoindre
            </Button>
        </>
    )
}

export { UserJoin };