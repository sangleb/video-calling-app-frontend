import SocketIoClient from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';
import { v4 as UUIDV4 } from 'uuid';


const WS_Server = "http://localhost:5500";

export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server, {
    withCredentials: false,
    transports: ["transpolling", "websocket"]
});

interface Props {
    children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate(); // will help to programatically handle navigation

    // state variable to store the userId
    const [user, setUser] = useState<Peer>(); // new peer user
    const [stream, setStream]= useState<MediaStream>();

    const fetchParticipantLIst = ({roomId, participants}: {roomId: string, participants: string[]}) => {
        console.log("fetched room participants");
        console.log(roomId, participants);
    }

    const fetchUserFeed = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        setStream(stream);
    }

    useEffect(() => {

        const userId = UUIDV4();

        const newPeer = new Peer(userId, {
            host: 'localhost',
            port: 9000,
            path: '/myapp'
        });

        setUser(newPeer);

        fetchUserFeed();

        const enterRoom = ({ roomId} : {roomId: string}) => {
            navigate(`/room/${roomId}`)
        }

        // we will transfer the user to room page when we collect an event of `room-created` from server
        socket.on("room-created", enterRoom);

        socket.on("get-users", fetchParticipantLIst);
    }, []);
    return (
        <SocketContext.Provider value={{ socket, user, stream }}>
            {children}
        </SocketContext.Provider>
    )
}