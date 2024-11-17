// App.js

import "./App.css";
import { Auth } from "./components/Auth";
import { Chat } from "./components/Chat";

import { useState, useRef } from "react";

// for handling cookies to save user authentication info
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  // state to track if user is authenticated
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  // state to store the selected chat room
  const [room, setRoom] = useState(null);

  // reference to the input field for entering a room name
  const roomInputRef = useRef(null);

  // user is not authenticated, render the auth component
  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  // if authenticated, render the room/chat interface
  return (
    <div>
      {room ? (
        // if a room is selected, render chat component
        <Chat room={room} />
      ) : (
        // otherwise display input to join a room
        <div className="room">
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
