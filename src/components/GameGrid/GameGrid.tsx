import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { RootState } from '@/app/store';

import Cell from '../Cell/Cell';
import Player from '../Player/Player';

import { randomizeTerrains, terrainTypes } from '@/data/terrainTypes';

import { setCurrentGrid } from '@/reducers/gameSlice';

import { MAX_COLS, MAX_ROWS } from '@constants/game';
import { ICell } from '@/global';
import Controls from '../Controls/Controls';

interface GameGridProps {
    cols?: number;
    rows?: number;
    showControls?: boolean;
    showPlayer?: boolean;
};
export default function GameGrid({
    cols = MAX_COLS,
    rows = MAX_ROWS,
    showControls = true,
    showPlayer = true,
}: GameGridProps): JSX.Element {
    const dispatch = useAppDispatch();

    // const cellArray = useSelector((state: RootState) => state.game.currentGrid.cellArray);
    const currentGrid = useAppSelector((state: RootState) => state.game.currentGrid);
    const p1 = useAppSelector((state: RootState) => state.player.p1);

    function createCellArray(): ICell[][] {
        const cellArray: ICell[][] = [];

        for (let i = 0; i < cols; i++) {
            cellArray.push([]);

            for (let j = 0; j < rows; j++) {
                cellArray[i].push({
                    col: i,
                    row: j,
                    terrain: randomizeTerrains(terrainTypes),
                });
            }
        }

        return cellArray;
    }

    function renderCellArray(cellArray: ICell[][]): JSX.Element[] {
        const cellArrayElements: JSX.Element[] = [];

        if (cellArray?.length) {
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const cell = cellArray[i][j];

                    cellArrayElements.push(
                        <Cell
                            cell={cell}
                            key={`${i}-${j}`}
                        />
                    );
                }
            }
        }

        return cellArrayElements;
    }

    useEffect(() => {
        if (currentGrid.cellArray.length === 0) {
            const updatedGrid = {
                ...currentGrid,
                cellArray: createCellArray()
            };
            dispatch(setCurrentGrid(updatedGrid));
        }
    }, []);

    return (
        <div className="flex justify-evenly">
            <div className="grid grid-cols-10 border-l border-t border-secondary w-fit relative">
                {renderCellArray(currentGrid.cellArray)}

                {showPlayer && <Player
                    {...p1}
                    key="player-1"
                />}
            </div>

            {showControls && <Controls />}
        </div>
    );
}
