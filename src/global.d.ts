// export interface IBaddie {
//     colorClass: string | '';
//     id: string; // uuid
//     location: IGridCoordinates;
//     name: string;
//     pixelLocation: IPixelCoordinates;
//     // MUCH more to come
// }

// export type IBaddies = IBaddie[];

export interface IGameGrid {
    [gridId: number]: number;
    gridId: number;
    gridData?: string;
    cellArray: ICell[][];
    gridType: 'building' | 'dungeon' | 'room' | 'terrain';
    defaultGrid: boolean;
    eastEdgeBoardId: number;
    northEdgeBoardId: number;
    southEdgeBoardId: number;
    title: string;
    westEdgeBoardId: number;
}

export interface ICell {
    col: number;
    row: number;
    terrain: ITerrainProps;
    // ... more to come
    // TODO: MAKE SURE NOT TO POLLUTE THIS WITH GAME STATE
}

export interface IEvent {
    [key: string]: any;
    id: string;
    gridId: number;
    name: string;
    text: string;
    type: string;
    row: number;
    col: number;
}

export interface IGridCoordinates {
    [key: string]: any;
    col: number;
    row: number;
}

export interface IGame {
    board: IGameGrid;
    currentPlayer: IPlayer;
    currentPlayerIndex: number;
    isDraw: boolean;
    isGameOver: boolean;
    players: IPlayer[];
    winner: IPlayer;
}

export interface IFinishGenerateBoardProps {
    board: ICell[][];
    terrainLookup: ITerrainLookup;
}

export interface IGenerateBoardProps {
    blankBoard?: boolean;
    callback?: ({
        board, terrainLookup
    }: IFinishGenerateBoardProps) => void;
    cols?: number;
    rows?: number;
}

export interface IPixelCoordinates {
    [key: string]: any;
    x: number | -1;
    y: number | -1;
}

export interface IPlayer {
    colorClass: string | '';
    id: string; // uuid
    key?: string;
    location: IGridCoordinates;
    name: string;
    pixelLocation: IPixelCoordinates;
    // MUCH more to come
}

export type TerrainLookup = Record<string, IGridCoordinates[]>;

export interface TerrainProps {
    color: string;
    default?: boolean;
    name: string;
    passable: boolean;
    probability: string;
}

/*
export interface IModalProps {
    actionLabel?: string;
    children: React.ReactNode;
    closeLabel?: string;
    id: string;
    isOpen?: boolean;
    onAction?: () => void;
    onClose?: () => void;
    title: string;
}

export interface IResponseMessage {
    error: boolean;
    message: string;
}

export type ITerrainLookup = Record<string, IGridCoordinates[]>;

export interface ITerrainProps {
    color: string;
    default?: boolean;
    name: string;
    passable: boolean;
    probability: string;
}
*/
