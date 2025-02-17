import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { fetchAllUsers } from "../features/User/userSlice";
import { fetchAllMessages } from "../features/Message/messageSlice";

const socket = io(process.env.REACT_APP_BACKEND_URL , {
    transports: ["websocket"], // Force WebSocket only
    withCredentials: true
});

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();
    const userid = useSelector((state) => state.auth.user._id);
    const { users, loading } = useSelector((state) => state.user || []);

    useEffect(() => {
        dispatch(fetchAllUsers());
        dispatch(fetchAllMessages());
        
        socket.on("receiveMessage", (data) => {
            console.log("New message received:", data);
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    }, [dispatch]);

    const sendMessage = () => {
        if (message.trim() !== "") {
            const msgData = { senderId: userid, text: message };
            socket.emit("sendMessage", msgData);
            setMessage(""); // Clear input field
        }
    };
    // 67b30601b756c7a3be0eb99e
    return (
        <div style={{ display: "flex", padding: "20px", margin: "auto", maxWidth: "800px" }}>
            {/* Users List Aside */}
            <aside style={{ 
                width: "200px", 
                marginRight: "20px", 
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px"
            }}>
                <h3>Chat Users</h3>
                <button  style={{
                                    padding: "8px",
                                    margin: "4px 0",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    backgroundColor: "#f0f0f0"
                                }}
                                 > All group chat</button>
                {loading ? (
                    <p>Loading users...</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {users.map((user) => (
                            <li 
                                key={user._id}
                                style={{
                                    padding: "8px",
                                    margin: "4px 0",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    backgroundColor: "#f0f0f0"
                                }}
                            >
                                {user.username}
                            </li>
                        ))}
                    </ul>
                )}
            </aside>

            {/* Chat Area */}
            <div style={{ flex: 1 }}>
                <h2>React Chat</h2>
                <div style={{ border: "1px solid #ccc", padding: "10px", height: "400px", overflowY: "auto" }}>
                    {messages.map((msg, index) => (
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

export default Chat;
