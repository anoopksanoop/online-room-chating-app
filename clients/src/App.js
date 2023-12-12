import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socketIO = io.connect("http://localhost:3001");

function App() {
  // debugger
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [socket, setSocket] = useState(null);

  const joinRoom = () => {
    // debugger
    if (username !== ""  && room !== "") {
      if(socket){
        socket.emit("join_room", room);
        setShowChat(true); // Show the chat when joining the room
      }
      
    }
  };

  useEffect(() => {
    // debugger
    if(!socket){
      setSocket(socketIO);
    }
    
    return () => {
      setSocket(null)
    }
  }, [])

  return (
    <div className="App">
      {showChat ? (
        <Chat socket={socket} username={username} room={room} />
      ) : (
        <div>
          <h2>Join Chat</h2>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="RoomID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      )}
    </div>
  );
}

export default App;
