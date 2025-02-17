import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { messageApi } from '../../api/MessageApi';


export const fetchAllMessages = createAsyncThunk(
    'message/fetchMessages',
    async (_, { getState }) => {
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllMessages.fulfilled, (state, action) => {
                debugger
                state.loading = false;
                state.messages = action.payload;
                state.error = null;
            })
            .addCase(fetchAllMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default messageSlice.reducer; 