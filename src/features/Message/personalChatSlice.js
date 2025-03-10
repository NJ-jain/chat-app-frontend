// src/features/Message/personalChatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { messageApi } from '../../api/MessageApi';

export const fetchPersonalMessages = createAsyncThunk(
    'personalMessage/fetchMessages',
    async (partnerId) => {
        return await messageApi.getPersonalMessages(partnerId);
    }
);

const personalChatSlice = createSlice({
    name: 'personalMessage',
    initialState: {
        messages: [],
        loading: false,
        error: null,
    },
    reducers: {
        addPersonalMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setPersonalMessages: (state, action) => {
            state.messages = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPersonalMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPersonalMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
                state.error = null;
            })
            .addCase(fetchPersonalMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addPersonalMessage, setPersonalMessages } = personalChatSlice.actions;
export default personalChatSlice.reducer;