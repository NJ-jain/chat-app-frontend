import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authApi.login(credentials);
            if (!response.token) {
                throw new Error(response.message || 'Login failed');
            }
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await authApi.register(userData);
            if (!response.token) {
                throw new Error(response.message || 'Registration failed');
            }
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
); 