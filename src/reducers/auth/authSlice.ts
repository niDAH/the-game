import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin } from './authActions';
import { setSystemMessage } from '../systemSlice';

// initialize token from local storage
const token = localStorage.getItem('token')
    ? localStorage.getItem('token')
    : null;

const initialState = {
    loading: false,
    userInfo: null,
    token,
    error: null,
    success: false,
};

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            console.log('logout slice');

            localStorage.removeItem('token');
            localStorage.removeItem('userId');

            state.loading = false;
            state.userInfo = null;
            state.token = null;
            state.error = null;

            setSystemMessage({
                title: 'Logout Successful',
                description: 'You have successfully logged out.',
                type: 'success',
            });

            window.location.href = '/login';
        },
        setCredentials: (state, { payload }) => {
            state.userInfo = payload;
        },
    },
    extraReducers: {
        [userLogin.fulfilled as unknown as string]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.token = payload.token;
        },
        [userLogin.pending as unknown as string]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [userLogin.rejected as unknown as string]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        [registerUser.fulfilled as unknown as string]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
        },
        [registerUser.pending as unknown as string]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [registerUser.rejected as unknown as string]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
