import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";

const CreateRoom : React.FC = () => {

    const { socket }  = useContext(SocketContext);

    const initRoom = () => {
        console.log("initialized a request to create a new room", socket);
        socket.emit("cerate room")
    }

    return(
        <button 
            onClick={initRoom}
            className="btn btn-primary"
        >
            start new meeting in a new room
        </button>
    )
}


export default CreateRoom;