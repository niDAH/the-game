import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
    IGameGrid,
    ICell,
    TerrainLookup,
    TerrainProps
} from '@/global';

import { BLANK_GAME_GRID } from '@/constants/game';

interface IGameState {
    currentGrid: IGameGrid;
    defaultGrid: boolean;
    gridId: number;
    gridTitle: string;
    grids: IGameGrid[];
    isGridSaved: boolean;
    isGameOver: boolean;
    isRunning: boolean;
    speed: number;
    terrainLookup: TerrainLookup;
    tick: number;
}

const initialState: IGameState = {
    currentGrid: BLANK_GAME_GRID,
    defaultGrid: false, // TODO: delete this?
    gridId: 0, // TODO: delete this?
    gridTitle: '', // TODO: delete this?
    grids: [],
    isGridSaved: false,
    isGameOver: false,
    isRunning: false,
    speed: 1000,
    terrainLookup: {},
    tick: 0,
};

interface ICellUpdate {
    col: number;
    isBaddieHere?: boolean;
    isPlayerHere?: boolean;
    row: number;
    terrain: TerrainProps;
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        gameTickDecrement: (state) => {
            state.tick -= 1;
        },
        gameTickIncrement: (state) => {
            state.tick += 1;
        },
        setCurrentGrid: (state, action) => {
            console.log('setCurrentGrid action.payload: ', action.payload);
            state.currentGrid = action.payload;
        },
        setDefaultGrid: (state, action: PayloadAction<boolean>) => {
            state.defaultGrid = action.payload;
        },
        setGridId: (state, action: PayloadAction<number>) => {
            state.gridId = action.payload;
        },
        setGridTitle: (state, action: PayloadAction<string>) => {
            state.gridTitle = action.payload;
        },
        setIsGridSaved: (state, action: PayloadAction<boolean>) => {
            state.isGridSaved = action.payload;
        },
        setGrids: (state, action) => {
            console.log('setBoards action.payload: ', action.payload);
            state.grids = action.payload;
        },
        // TODO: should this be in it's own slice called cellSlice.ts?
        setCell: (state, action: PayloadAction<ICell>) => {
            state.currentGrid.cellArray[action.payload.row][action.payload.col] = action.payload;
        },

        setIsGameOver: (state, action: PayloadAction<boolean>) => {
            state.isGameOver = action.payload;
        },
        setIsRunning: (state, action: PayloadAction<boolean>) => {
            state.isRunning = action.payload;
        },
        setSpeed: (state, action: PayloadAction<number>) => {
            state.speed = action.payload;
        },

        // TODO: most likely we should split this out into a terrain slice
        setTerrainLookup: (state, action: PayloadAction<TerrainLookup>) => {
            state.terrainLookup = action.payload;
        },
        // end TODO

        toggleIsRunning: (state) => {
            state.isRunning = !state.isRunning;
        },
        // updateCellBaddie: (state, action: PayloadAction<ICellBaddieUpdate>) => {
        //     const { row, col, isBaddieHere } = action.payload;
        //     state.board[row][col].isBaddieHere = isBaddieHere;
        // },

        // TODO: should this be in it's own slice called cell.ts?
        updateCellTerrain: (state, action: PayloadAction<ICellUpdate>) => {
            const { row, col, terrain } = action.payload;
            state.currentGrid.cellArray[col][row].terrain = terrain;
        },
    },
});

export const {
    gameTickDecrement,
    gameTickIncrement,
    setCell,
    setCurrentGrid,
    setDefaultGrid,
    setGridId,
    setGridTitle,
    setGrids,
    setIsGameOver,
    setIsGridSaved,
    setIsRunning,
    setSpeed,
    setTerrainLookup,
    toggleIsRunning,
    updateCellTerrain,
} = gameSlice.actions;

export default gameSlice.reducer;
