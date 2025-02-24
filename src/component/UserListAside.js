import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllUsers } from "../features/User/userSlice";

const UserListAside = () => {
    const { partnerId } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { users, loading } = useSelector((state) => state.user || []);

    useEffect(()=> {
        dispatch(fetchAllUsers());
    },[dispatch])

    return (
        <aside style={{ 
            width: "200px", 
            marginRight: "20px", 
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px"
        }}>
            <h3>Chat Users</h3>
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li 
                        style={{
                            padding: "8px",
                            margin: "4px 0",
                            borderRadius: "4px",
                            cursor: "pointer",
                            backgroundColor: !partnerId ? "#d0e0ff" : "#f0f0f0"
                        }}
                        onClick={() => navigate("/")}
                    >
                        All group chat
                    </li>
                    {users.map((user) => (
                        <li 
                            key={user._id}
                            style={{
                                padding: "8px",
                                margin: "4px 0",
                                borderRadius: "4px",
                                cursor: "pointer",
                                backgroundColor: user._id === partnerId ? "#d0e0ff" : "#f0f0f0"
                            }}
                            onClick={() => navigate(`/chat/${user._id}`)}
                        >
                            {user.username}
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    );
};

export default UserListAside; 