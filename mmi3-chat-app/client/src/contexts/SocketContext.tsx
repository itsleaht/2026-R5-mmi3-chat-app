import { io, Socket } from "socket.io-client";
import { createContext, useContext } from "react";
import { type ServerToClientEvents, type ClientToServerEvents } from '../../../types/events'

const SERVER_URL = "http://localhost:3000"
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SERVER_URL);

export const SocketContext = createContext(socket);

type SocketProviderProps = {
    children?: React.ReactNode,
}

export const SocketProvider = ({ children } : SocketProviderProps) => {
    return (
        <SocketContext.Provider value={socket}>
            { children }
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext);
