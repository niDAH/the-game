import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICell, TerrainProps } from 'global';

interface IEditorState {
    activeCell: ICell | null;
    debug: ICell;
    paint: boolean;
    terrainPaint: TerrainProps | null;
}

const initialState: IEditorState = {
    activeCell: null,
    debug: {
        col: 0,
        row: 0,
        terrain: {
            name: 'grass',
            color: 'green',
            passable: true,
            probability: '1',
        },
    },
    paint: false,
    terrainPaint: null,
};

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setActiveCell: (state, action: PayloadAction<ICell | null>) => {
            state.activeCell = action.payload;
        },
        setDebug: (state, action: PayloadAction<ICell>) => {
            state.debug = action.payload;
        },
        setPaint: (state, action: PayloadAction<boolean>) => {
            console.log('setPaint', action.payload);
            state.paint = action.payload;
        },
        setTerrainPaint: (state, action: PayloadAction<TerrainProps | null>) => {
            state.terrainPaint = action.payload;
        },
        togglePaint: (state) => {
            state.paint = !state.paint;
            console.log('togglePaint', state.paint);
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setActiveCell,
    setDebug,
    setPaint,
    setTerrainPaint,
    togglePaint,
} = editorSlice.actions;

export default editorSlice.reducer;
