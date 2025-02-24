import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/User/userSlice';
import messageReducer from '../features/Message/messageSlice';
import personalChatReducer from '../features/Message/personalChatSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    message: messageReducer,
    personalMessage: personalChatReducer,
});

export default rootReducer; 