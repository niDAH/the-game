import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ISystemState {
    hasMessage: boolean;
    message: ISystemMessage;
    messageCount: number;
}

export interface ISystemMessage {
    title: string;
    description: string;
    type: 'info' | 'success' | 'warning' | 'danger';
}

const initialState: ISystemState = {
    hasMessage: false,
    message: {
        title: '',
        description: '',
        type: 'info',
    },
    messageCount: 0,
};

export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        clearSystemMessage: (state) => {
            console.log('clearSystemMessage');
            state.hasMessage = false;
            state.message = {
                title: '',
                description: '',
                type: 'info',
            };
            state.messageCount = 0;
        },
        setHasMessage: (state, action: PayloadAction<ISystemState['hasMessage']>) => {
            console.log('setHasMessage', action.payload);
            state.hasMessage = action.payload;
        },
        setSystemMessage: (state, action: PayloadAction<ISystemState['message']>) => {
            state.message = action.payload;
            if (action.payload.title !== '' && action.payload.description !== '') {
                state.hasMessage = true;
                state.messageCount += 1;
            }
        },
        // TODO: use this for a counter in the header
        setMessageCount: (state, action: PayloadAction<ISystemState['messageCount']>) => {
            state.messageCount = action.payload;
        }
    },
});

export const {
    clearSystemMessage,
    setHasMessage,
    setSystemMessage,
    setMessageCount,
} = systemSlice.actions;

export default systemSlice.reducer;
