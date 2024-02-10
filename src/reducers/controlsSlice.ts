import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ControlsState {
    keyPressed: string
}

const initialState: ControlsState = {
    keyPressed: '',
};

export const controlsSlice = createSlice({
    name: 'controls',
    initialState,
    reducers: {
        onKeyDown: (state, action: PayloadAction<string>) => {
            state.keyPressed = action.payload;
        },
        onKeyUp: (state) => {
            state.keyPressed = '';
        },
    },
});

export const { onKeyDown, onKeyUp } = controlsSlice.actions;

export default controlsSlice.reducer;
