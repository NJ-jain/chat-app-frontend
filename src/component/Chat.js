// src/component/Chat.js
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addMessage, fetchAllMessages } from "../features/Message/messageSlice";
import UserListAside from "./UserListAside";

const socket = io(process.env.REACT_APP_BACKEND_URL, {
    transports: ["websocket"], // Force WebSocket only
    withCredentials: true
});

const Chat = () => {
    const [message, setMessage] = useState("");
    const {messages, loading} = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const userid = useSelector((state) => state.auth.user._id);

    useEffect(() => {
        dispatch(fetchAllMessages())

        socket.on("receiveMessage", (data) => {
            console.log("New message received:", data);
            dispatch(addMessage(data));
        });

        // Clean up the socket listener on component unmount
        return () => {
            socket.off("receiveMessage");
        };
    }, [dispatch]);

    const sendMessage = useCallback(() => {
        if (message.trim() !== "") {
            const msgData = { senderId: userid, text: message };
            socket.emit("sendMessage", msgData);
            setMessage(""); // Clear input field
        }
    }, [message, userid]);

    return (
        loading ?
        <p>loading...</p>
        :
        <div style={{ display: "flex", padding: "20px", margin: "auto", maxWidth: "800px" }}>
            {/* Chat Area */}
            <div style={{ flex: 1 }}>
                <h2>React Chat</h2>
                <div style={{ border: "1px solid #ccc", padding: "10px", height: "400px", overflowY: "auto" }}>
                    {messages.slice().reverse().map((msg, index) => (
                        <div key={index} style={{ padding: "5px", width: "100%", textAlign: "left", float: msg.sender === userid ? "right" : "left" }}>
                            <strong>{msg.sender.username}:</strong> {msg.text}
                        </div>
                    ))} 
                </div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={{ padding: "10px", width: "80%", marginTop: "10px" }}
                />
                <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "5px" }}>Send</button>
            </div>
        </div>
    );
};

export default React.memo(Chat);