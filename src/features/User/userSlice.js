import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../api/UserApi';


export const fetchAllUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, { getState }) => {
        const token = getState().auth.token;
        return await userApi.getUsers(token);
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.error = null;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer; 