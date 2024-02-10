import { IGameGrid } from "@/global";

export const MAX_COLS: number = 10;
export const MAX_ROWS: number = 10;

// number of rem units per square so a 10 x 10 grid (@ 3rem) is 30rem x 30rem
export const REM_SQUARE_SIZE = 3;
export const TILE_SIZE: number = 5;

export const BLANK_GAME_GRID: IGameGrid = {
    cellArray: [],
    defaultGrid: false,
    eastEdgeBoardId: 0,
    gridId: 0,
    gridType: 'terrain',
    northEdgeBoardId: 0,
    southEdgeBoardId: 0,
    title: '',
    westEdgeBoardId: 0,
};
