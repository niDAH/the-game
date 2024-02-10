// authActions.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_URLS } from '@constants/urls';
import { setSystemMessage } from '../systemSlice';

type ILoginFields = {
    email: string;
    password: string;
};

export const userLogin = createAsyncThunk(
    'users/login',
    async ({
        email,
        password
    }: ILoginFields,
        {
            dispatch,
            getState,
            rejectWithValue,
        }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                USER_URLS.LOGIN,
                { email, password },
                config
            );
            console.log('--------------------');
            console.log(data);
            console.log('--------------------');

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.id);

            dispatch(setSystemMessage({
                title: 'Login Successful',
                description: 'You have successfully logged in.',
                type: 'success',
            }));

            return data;
        } catch (error: any) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ firstName, email, password }: {
        firstName: string,
        email: string,
        password: string;
    }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            await axios.post(
                USER_URLS.CREATE_USER,
                { firstName, email, password },
                config
            );
        } catch (error: any) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
