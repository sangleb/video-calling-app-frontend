import SocketIoClient from 'socket.io-client';
import { createContext } from 'react';
import { Socket } from 'socket.io-client';

const WS_Server = "http://localhost:5500";

const SocketContext = createContext<Socket | null>(null);
const socket = SocketIoClient(WS_Server, {
    transports: ['websocket'],
    autoConnect: false,
});

interface Props {
    children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}