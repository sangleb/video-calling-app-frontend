import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";

const CreateRoom : React.FC = () => {

    const { socket }  = useContext(SocketContext);

    const initRoom = () => {
        console.log("initialized a request to create a new room", socket);
        socket.emit("create-room")
    }

    return(
        <button 
            onClick={initRoom}
            className="btn btn-primary"
        >
            start a new meeting
        </button>
    )
}


export default CreateRoom;