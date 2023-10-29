import './App.css';
import io from "socket.io-client";
import {useState} from "react"
import Chat from './Chat';
const socket = io.connect("http://localhost:3001");

function App() {

  const [username,setUsername] = useState("");
  const [room,setRoom] = useState("");
  const [showChat,setShowChat] = useState(false);
  
  const joinRoom = ()=>{
    if(username&&room !== ""){
      // console.log(username);
      // console.log(room);
      socket.emit("join_room",room);//sent RoomId to back
      setShowChat(!showChat);
    }

  }
  
  
  return (
    <div className="App">{
      !showChat?(
        <>
        <h1>App Chat</h1>
        <div>
        <h2>Join Room</h2>
        <input type="text" placeholder="name..." onChange={(e)=>setUsername(e.target.value)}  value={username}/>
        <input type="text" placeholder="Room id..." onChange={(e)=>setRoom(e.target.value)} value={room} />
        <button onClick={joinRoom}>Join Room</button>
        </div>
        </>
      ): <Chat socket={socket} username={username} room={room} />
    }
      
       
     
    </div>
  );
}

export default App;
