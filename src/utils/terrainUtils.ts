import {
    ICell,
    IGridCoordinates,
    TerrainLookup,
} from '@/global.d';
import { randomIntBetween } from './mathUtils';

import { terrainTypes } from '@/data/terrainTypes';

/**
 * @function createTerrainLookup
 * @description Returns an array of all terrain types in a given board with their coordinates
 *
 * @param board {ICell[][]} 2D array of cells representing the board
 *
 * @returns ITerrainLookup
 *
 * @example use case: give me a random coordinate for the grass terrain type from all actual grass tiles on the board
 */
export function createTerrainLookup({
    board,
}: {
    board: ICell[][];
}): TerrainLookup {
    const terrainLookup: TerrainLookup = {};

    terrainTypes.forEach(({ name }) => {
        terrainLookup[name] = [];
    });

    board.forEach((row, rowIndex) => {
        row.forEach(({ terrain }, colIndex) => {
            terrainLookup[terrain.name].push({
                col: colIndex,
                row: rowIndex,
            });
        });
    });

    return terrainLookup;
}

/**
 * Returns a random coordinate for a given terrain type, based on current cell
 * @param IRandomTerrainCoordinatesProps
 * @param props.terrainLookup object of arrays containing all terrain types and their coordinates
 * @param props.terrainName type of terrain to find a random coordinate for
 * @returns
 */
export function randomTerrainCoordinates({
    terrainLookup,
    terrainName,
}: IRandomTerrainCoordinatesProps): IGridCoordinates {
    const randomCellLocation = terrainLookup[terrainName][randomIntBetween(0, (terrainLookup[terrainName].length - 1))];

    return {
        col: randomCellLocation.col,
        row: randomCellLocation.row
    };
}

interface IRandomTerrainCoordinatesProps {
    terrainLookup: TerrainLookup;
    terrainName: string;
}
