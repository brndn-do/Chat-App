import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../firebase-config";

export const Chat = (props) => {
    const {room} = props;
    const [newMessage, setNewMessage] = useState("");

    const messagesRef = collection(db, "messages");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newMessage === "") return; // empty message

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessage("");
    };

  return (
    <div className="chat-app">
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          onChange={(event) => setNewMessage(event.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
