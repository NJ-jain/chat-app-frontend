import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { addPersonalMessage, fetchPersonalMessages } from "../features/Message/personalChatSlice.js";

const socket = io(process.env.REACT_APP_BACKEND_URL, {
    transports: ["websocket"], // Force WebSocket only
    withCredentials: true
});

const PersonalChat = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const userid = useSelector((state) => state.auth.user._id);
    const { partnerId } = useParams(); // Get partnerId from route params
    const personalMessages = useSelector((state) => state?.personalMessage?.messages) || [];
    const {users, loading} = useSelector((state) => state.user); // Assuming users are stored in state.user.users
    const partner = users.find(user => user._id === partnerId); // Find the partner user object

    useEffect(() => {
        const fetchMessages = async () => {
            await dispatch(fetchPersonalMessages(partnerId));
        };

        fetchMessages();

        socket.emit("joinRoom", { userId: userid, partnerId });

        socket.on("receivePersonalMessage", (data) => {
            console.log("New personal message received:", data);
            dispatch(addPersonalMessage(data));
        });

        return () => {
            socket.off("receivePersonalMessage");
        };
    }, [userid, partnerId, dispatch]);

    const sendMessage = useCallback(() => {
        if (message.trim() !== "") {
            const msgData = { senderId: userid, receiverId: partnerId, text: message };
            socket.emit("sendPersonalMessage", msgData);
            setMessage(""); // Clear input field
        }
    }, [message, userid, partnerId]);

    return (
        <div style={{ display: "flex", padding: "20px", margin: "auto", maxWidth: "800px" }}>
            <div style={{ flex: 1 }}>
                <h2>Chat with {partner ? partner.username : "Unknown"}</h2>
                <div style={{ border: "1px solid #ccc", padding: "10px", height: "400px", overflowY: "auto" }}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        personalMessages.map((msg, index) => (
                            <div key={index} style={{ padding: "5px", textAlign: msg.sender === userid ? "right" : "left" }}>
                                <strong>{msg.sender.username}:</strong> {msg.text}
                            </div>
                        ))
                    )}
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

export default PersonalChat; 