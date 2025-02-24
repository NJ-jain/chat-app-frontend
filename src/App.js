import './App.css';
import Chat from './component/Chat.js';
import PersonalChat from './component/PersonalChat.js';
import Login from './component/Login.js';
import Register from './component/Register.js';
import ProtectedRoute from './component/ProtectedRoute.js';
import PublicRoute from './component/PublicRoute.js';
import ChatLayout from './component/ChatLayout.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='h-screen'>
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <ChatLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Chat />} />
          <Route path="chat/:partnerId" element={<PersonalChat />} />
        </Route>
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;