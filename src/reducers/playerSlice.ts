import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import { IGridCoordinates, IPixelCoordinates, IPlayer } from '@/global';

export interface PlayerState {
    all: IPlayer[];
    p1: IPlayer;
}

const initialState: PlayerState = {
    all: [],
    p1: {
        colorClass: 'bg-purple-700',
        id: 'p1',
        location: {
            col: 0,
            row: 0,
        },
        name: 'Bob',
        pixelLocation: {
            x: 0,
            y: 0,
        },
    },
};

interface IPlayerUpdatePosition {
    [key: string]: any;
    location: IGridCoordinates;
    pixelLocation: IPixelCoordinates;
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addPlayer: (state, action: PayloadAction<IPlayer>) => {
            state.all.push(action.payload);
        },
        updatePosition: (state, action: PayloadAction<IPlayerUpdatePosition>) => {
            const {
                location,
                pixelLocation,
            } = action.payload;

            console.log('updatePosition');

            state.p1.location = location;
            state.p1.pixelLocation = pixelLocation;
        },
    },
});

export const {
    addPlayer,
    updatePosition,
} = playerSlice.actions;

export default playerSlice.reducer;
