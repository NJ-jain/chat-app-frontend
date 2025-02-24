import React from 'react';
import { Outlet } from 'react-router-dom';
import UserListAside from './UserListAside';

const ChatLayout = () => {
    return (
        <div style={{ display: "flex", padding: "20px", margin: "auto", maxWidth: "800px" }}>
            <UserListAside />
            <div style={{ flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
};

export default ChatLayout; 