import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/User/userSlice';
import messageReducer from '../features/User/userSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    message: messageReducer,
});

export default rootReducer; 