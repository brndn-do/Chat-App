// Chat.js

import { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from "../firebase-config";
import '../styles/Chat.css';

export const Chat = (props) => {
    // destructure room prop
    const {room} = props;

    // state to manage new message
    const [newMessage, setNewMessage] = useState("");

    // state for messages
    const [messages, setMessages] = useState([]);

    // reference to message collection in Firestore
    const messagesRef = collection(db, "messages");

    // setting up a listener for new messages in the current room
    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", room))
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });

        return () => unsubscribe();
    }, []);

    // handle submitting a new message
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newMessage === "") return; // empty message, do nothing

        // add to Firestore collection
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        // clear input field
        setNewMessage("");
    };

  return (
    <div className="chat-app">
        <div> {messages.map((message) => <h1> {message.text}</h1>)}</div>
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
