import {
    useCallback,
    useEffect,
    useRef,
} from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';

import { type RootState } from '@/app/store';

import {
    KEY_DOWN,
    KEY_LEFT,
    KEY_P,
    KEY_RIGHT,
    KEY_SPACE,
    KEY_UP,
} from '@constants/index';
import {
    MAX_COLS,
    MAX_ROWS,
    REM_SQUARE_SIZE
} from '@constants/game';

// import { IBaddie, IGameGrid, IGridCoordinates, ITerrainLookup } from '../../../types/global';

// import { addBaddie } from '../../../reducers/baddiesSlice';
import { onKeyDown, onKeyUp } from '@/reducers/controlsSlice';

import {
    setCell,
    setCurrentGrid,
    setSpeed,
    toggleIsRunning
} from '@/reducers/gameSlice';
import { updatePosition } from '@/reducers/playerSlice';

// import { randomTerrainCoordinates } from '@utils/terrainUtils';
import { IGameGrid, IGridCoordinates, TerrainLookup } from '@/global';

/**
 * @description React component for handling and displaying player controls
 *        handles key presses and updates player position
 * @returns JSX.Element
 */
export default function Controls(): JSX.Element {
    const gridList = useAppSelector<IGameGrid[]>((state) => state.game.grids);
    const currentGrid = useAppSelector<IGameGrid>((state) => state.game.currentGrid);

    const dispatch = useAppDispatch();
    const keyPressCalledRef = useRef<Boolean>(false);

    const keyPressed: string = useAppSelector((state: RootState) => state.controls.keyPressed);
    const playerLocation: IGridCoordinates = useAppSelector((state: RootState) => state.player.p1.location);
    const speed: number = useAppSelector((state: RootState) => state.game.speed);
    // const terrainLookup: TerrainLookup = useAppSelector((state: RootState) => state.game.terrainLookup);

    // arrow key watchers
    const isUpPressed: Boolean = keyPressed === KEY_UP;
    const isDownPressed: Boolean = keyPressed === KEY_DOWN;
    const isLeftPressed: Boolean = keyPressed === KEY_LEFT;
    const isRightPressed: Boolean = keyPressed === KEY_RIGHT;

    const isPPressed: Boolean = keyPressed === KEY_P;
    const isSpacePressed: Boolean = keyPressed === KEY_SPACE;

    const updatePlayerLocation = useCallback(
        ({ newCol, newRow }: { newCol: number, newRow: number; }): void => {
            const oldCol: number = playerLocation.col;
            const oldRow: number = playerLocation.row;

            if (newCol !== oldCol || newRow !== oldRow) {
                dispatch(
                    updatePosition({
                        location: {
                            col: newCol,
                            row: newRow,
                        },
                        pixelLocation: {
                            x: newCol * REM_SQUARE_SIZE,
                            y: newRow * REM_SQUARE_SIZE,
                        },
                    })
                );

                dispatch(
                    setCell({
                        ...currentGrid.cellArray[newRow][newCol],
                        col: newCol,
                        row: newRow,
                    })
                ); // new position of player, update

                dispatch(
                    setCell({
                        ...currentGrid.cellArray[oldRow][oldCol],
                        col: oldCol,
                        row: oldRow,
                    })
                ); // old position of player, update
            }
        },
        [currentGrid, dispatch, playerLocation.col, playerLocation.row]
    );

    const getNextBoard = useCallback((direction: string): void => {
        let findBoardId: number | undefined;

        if (direction === 'north' && currentGrid.northEdgeBoardId > 0) {
            findBoardId = currentGrid.northEdgeBoardId;
            updatePlayerLocation({
                newCol: playerLocation.col,
                newRow: MAX_ROWS - 1,
            });
        } else if (direction === 'south' && currentGrid.southEdgeBoardId > 0) {
            console.log(currentGrid.southEdgeBoardId);
            findBoardId = currentGrid.southEdgeBoardId;
            updatePlayerLocation({
                newCol: playerLocation.col,
                newRow: 0,
            });
        } else if (direction === 'east' && currentGrid.eastEdgeBoardId > 0) {
            findBoardId = currentGrid.eastEdgeBoardId;
            updatePlayerLocation({
                newCol: 0,
                newRow: playerLocation.row,
            });
        } else if (direction === 'west' && currentGrid.westEdgeBoardId > 0) {
            findBoardId = currentGrid.westEdgeBoardId;
            updatePlayerLocation({
                newCol: MAX_COLS - 1,
                newRow: playerLocation.row,
            });
        }

        if (findBoardId !== undefined) {
            const newGrid = gridList.find((board) => board.gridId === findBoardId);

            if (newGrid !== undefined) {
                dispatch(setCurrentGrid(newGrid));
            }
        }
    }, [
        gridList, currentGrid.eastEdgeBoardId, currentGrid.northEdgeBoardId, currentGrid.southEdgeBoardId,
        currentGrid.westEdgeBoardId, dispatch, playerLocation.col, playerLocation.row, updatePlayerLocation
    ]);

    // TODO: WHERE SHOULD THIS LIVE?
    // function newBaddie(): void {
    //     const newBaddieLocation: IGridCoordinates = randomTerrainCoordinates({
    //         terrainLookup,
    //         terrainName: 'grass',
    //     });

    //     const baddie: IBaddie = {
    //         colorClass: 'bg-red-500',
    //         id: uuid(),
    //         location: newBaddieLocation,
    //         name: 'Larry',
    //         pixelLocation: {
    //             x: (newBaddieLocation.col * REM_SQUARE_SIZE),
    //             y: (newBaddieLocation.row * REM_SQUARE_SIZE),
    //         },
    //     };

    //     dispatch(addBaddie(baddie));
    // }

    function handleKeyDown({ key }: any): void {
        dispatch(onKeyDown(key));
        document.removeEventListener('keydown', handleKeyDown);
    }

    function handleKeyUp(): void {
        dispatch(onKeyUp());
        document.addEventListener('keydown', handleKeyDown, { once: true });
    }

    /**
     * @description handles key presses and updates player position
     */
    useEffect(() => {
        let newCol: number = playerLocation.col;
        let newRow: number = playerLocation.row;

        const keyPressHappened: Boolean = isUpPressed || isDownPressed || isLeftPressed || isRightPressed || isSpacePressed;

        if (keyPressCalledRef.current) {
            keyPressCalledRef.current = false;
            return;
        }

        console.log('key press', keyPressHappened);

        if (isUpPressed) {
            if (playerLocation.row > 0) {
                newRow = playerLocation.row - 1;
            } else if (playerLocation.row === 0) {
                getNextBoard('north');
            }
        }

        if (isDownPressed) {
            console.log('down', playerLocation, MAX_ROWS);
            if (playerLocation.row < MAX_ROWS - 1) {
                newRow = playerLocation.row + 1;
            } else if (playerLocation.row === MAX_ROWS - 1) {
                getNextBoard('south');
            }
        }

        if (isLeftPressed) {
            console.log('left', playerLocation.col);
            if (playerLocation.col > 0) {
                newCol = playerLocation.col - 1;
            } else if (playerLocation.col === 0) {
                getNextBoard('west');
            }
        }

        if (isRightPressed) {
            if (playerLocation.col < MAX_COLS - 1) {
                newCol = playerLocation.col + 1;
            } else if (playerLocation.col === MAX_COLS - 1) {
                getNextBoard('east');
            }
        }

        if (isPPressed) {
            dispatch(toggleIsRunning());
        }

        if (isSpacePressed) {
            console.log('Space pressed -- JUMP');
        }

        console.log('new', currentGrid);
        console.log(`${keyPressHappened} && ${currentGrid.cellArray[newRow]?.[newCol]?.terrain?.passable}`);

        if (keyPressHappened && currentGrid.cellArray[newRow]?.[newCol]?.terrain?.passable) {
            updatePlayerLocation({
                newCol,
                newRow,
            });

            window.history.pushState(
                null,
                '',
                `?p1=${newCol},${newRow}`
            );

            keyPressCalledRef.current = true;
        }
    }, [
        isUpPressed, isDownPressed, isLeftPressed, isRightPressed, isPPressed, isSpacePressed, playerLocation.row,
        playerLocation.col, dispatch, currentGrid, updatePlayerLocation, getNextBoard
    ]);

    /**
     * @description adds and removes the keyboard event listeners
     */
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="controls w-60 h-100 pt-8">
            <div className="flex justify-center w-full">
                <kbd className={`kbd ${isUpPressed ? 'bg-slate-800 text-red-400' : ''}`}>▲</kbd>
            </div>
            <div className="flex justify-center gap-12 w-full">
                <kbd className={`kbd ${isLeftPressed ? 'bg-slate-800 text-red-400' : ''}`}>◀︎</kbd>
                <kbd className={`kbd ${isRightPressed ? 'bg-slate-800 text-red-400' : ''}`}>▶︎</kbd>
            </div>
            <div className="flex justify-center w-full">
                <kbd className={`kbd ${isDownPressed ? 'bg-slate-800 text-red-400' : ''}`}>▼</kbd>
            </div>
            <div className="flex justify-center w-full mt-4">
                <kbd
                    className={`kbd cursor-pointer ${isSpacePressed ? 'bg-slate-800 text-red-400' : ''}`}
                    onClick={() => { console.log('Space pressed -- JUMP'); }}
                >
                    Space
                </kbd>
            </div>
            <div className="flex justify-center w-full mt-4">
                <div className="flex flex-col justify-center gap-4 w-40">
                    <kbd
                        className={`kbd cursor-pointer ${isPPressed ? 'bg-slate-800 text-red-400' : ''}`}
                        onClick={() => dispatch(toggleIsRunning())}
                    >
                        (P)ause
                    </kbd>
                    <span className="btn btn-sm btn-primary" onClick={() => {
                        console.log('new baddie');
                        // newBaddie();
                    }}>
                        Add Baddie
                    </span>
                </div>
            </div>
            <div className="flex-col justify-center w-full mt-2 mx-8">
                <label className="label" htmlFor="speed">
                    <span className="label-text">Speed ({speed / 1000}</span>
                </label>

                <input
                    className="range range-accent"
                    id="speed"
                    name="speed"
                    max="10000"
                    min="1000"
                    onChange={(e) => dispatch(setSpeed(e.target.value as unknown as number))}
                    step="1000"
                    type="range"
                    value={speed}
                />
            </div>
        </div>
    );
}
