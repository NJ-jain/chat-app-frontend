import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { messageApi } from '../../api/MessageApi';


export const fetchAllMessages = createAsyncThunk(
    'message/fetchMessages',
    async () => {
        return await messageApi.getAllMessages();
    }
);

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [],
        loading: false,
        error: null,
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllMessages.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                state.messages = action.payload;
                state.error = null;
            })
            .addCase(fetchAllMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer; 