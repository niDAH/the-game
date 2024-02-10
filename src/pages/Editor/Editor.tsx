import {
    useCallback,
    useEffect,
    useState,
} from 'react';
import { capitalize } from 'lodash';
import { useParams } from 'react-router-dom';
// import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

// import { drawCells, generateGrid } from '../GameRun/GameRun';
import GameGrid from '@components/GameGrid/GameGrid';
import InputText from '@components/InputText/InputText';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import Modal from '@components/Modal/Modal';
import RightSidebar from './RightSidebar/RightSidebar';
import Toast from '@/components/Toast/Toast';

import {
    setCurrentGrid,
    setGridId,
    setGridTitle,
    setDefaultGrid,
    setIsGridSaved
} from '@reducers/gameSlice';

// import {
//     // BLANK_BOARD,
//     MAX_COLS,
//     MAX_ROWS
// } from '../../constants/game';
// import { sagaActions } from '../../sagas/sagaActions';
import { IGameGrid } from '@/global';
import { RootState } from '@/app/store';
import { CREATE_GRID, UPDATE_BOARD } from '@/constants/sagaActions';

function Editor(): JSX.Element {
    const dispatch = useAppDispatch();
    const { gridId } = useParams();

    console.log('EDITOR');

    // const [activeTerrainPaint, setActiveTerrainPaint] = useState<string | null>(null);
    const [border, setBorder] = useState<string | null>(null);  // ? delete? neeeed>

    const currentGrid = useAppSelector((state: RootState) => state.game.currentGrid);
    const defaultGrid = useAppSelector((state: RootState) => state.game.defaultGrid);
    const gridList = useAppSelector((state: RootState) => state.game.grids);
    const gridTitle = useAppSelector((state: RootState) => state.game.gridTitle);
    const isGridSaved = useAppSelector((state: RootState) => state.game.isGridSaved);
    const painting = useAppSelector((state: RootState) => state.editor.paint);
    const terrainPaint = useAppSelector((state: RootState) => state.editor.terrainPaint);

    /**
     * Create a new grid
     * @description uses const: BLANK_BOARD, MAX_COLS, MAX_ROWS
     */
    const newGrid = useCallback((): void => {
        // const grid = {
        //     ...BLANK_BOARD,
        //     ...generateGrid({
        //         blankGrid: true,
        //         cols: MAX_COLS,
        //         rows: MAX_ROWS,
        //     }),
        // };

        // dispatch(setGrid(grid));
    }, [dispatch]);

    /**
     * Save the grid
     * @description uses state vars: gridId, currentGrid, gridTitle, defaultGrid
     */
    function saveGrid(): void {
        if (gridId) {
            console.log('updateGrid', currentGrid, gridId);
            dispatch({
                grid: currentGrid,
                type: UPDATE_BOARD,
            });
        } else {
            console.log('createGrid', currentGrid);
            dispatch({
                gridArray: currentGrid,
                gridType: 'terrain',
                defaultGrid,
                title: gridTitle,
                type: 'gameApi.CREATE_GRID',
            });
        }
    }

    /**
     * Select a border to set, pop modal to select grid
     * @param borderName {string} border name to set
     */
    function selectBorder(borderName: string): void {
        //     setBorder(borderName);
        //     document.getElementById('modal-border-grid')?.click();
    }

    /**
     * Update the grid border
     * @description uses state vars: gridId, and border
     * @param borderGridId {number} border grid id to set
     */
    function selectBorderGrid(borderGridId: number): void {
        //     // dispatch({
        //     //     type: sagaActions.UPDATE_BOARD_BORDER,
        //     //     gridId,
        //     //     edgeName: border,
        //     //     edgeGridId: borderGridId,
        //     // });

        //     // setBorder(null);
        //     // document.getElementById('modal-border-grid')?.click();
    }

    /**
     * Get the grid name from the grid id stored in directional edge
     * @param edge {string} edge name to get grid name for (northEdgeGridId, eastEdgeGridId, southEdgeGridId, westEdgeGridId)
     * @returns {string | undefined} grid name
     */
    function getGridName(edge: 'northEdgeGridId' | 'eastEdgeGridId' | 'southEdgeGridId' | 'westEdgeGridId'): string | undefined {
        //     // if (gridList?.length > 0) {
        //     //     const grid = gridList.find(
        //     //         (b: IGameGrid) => {
        //     //             return b.gridId === currentGrid?.[edge as unknown as number];
        //     //         }
        //     //     );
        //     //     return grid?.title as string || 'No Grid';
        //     // }
        return 'No Grid';
    }

    /**
     * Run once useEffect get get existing grid or create a new one
     */
    // useEffect(() => {
    //     if (!gridId) {
    //         newGrid();
    //     } else if (gridId) {
    //         dispatch(setGridId(gridId as unknown as number));
    //         dispatch({
    //             type: sagaActions.READ_BOARD,
    //             gridId,
    //         });
    //     }

    //     if (gridList.length === 0) {
    //         dispatch({ type: sagaActions.READ_ALL_BOARDS });
    //     }
    // }, [gridId, gridList.length, dispatch, newGrid]);

    /* default button classes for the directional buttons wrapping the grid */
    let buttonClasses = 'bg-accent active:bg-accent-focus rounded-md font-bold p-1 w-full';

    if (gridId === undefined) {
        buttonClasses += ' opacity-50 cursor-not-allowed';
    }

    return (
        <>
            {isGridSaved && (
                <Toast
                    buttons={[
                        <button
                            className="btn btn-sm btn-primary"
                            key="close"
                            onClick={() => {
                                dispatch(setIsGridSaved(false));
                            }}
                        >
                            Ok
                        </button>,
                    ]}
                    id="gridSaved"
                    position="top"
                    style="success"
                    title="Grid Saved"
                >
                    {[<p key="toastText">Grid saved successfully.</p>]}
                </Toast>
            )}

            <div className="flex">
                <LeftSidebar
                    currentGrid={currentGrid}
                    newGrid={newGrid}
                />

                <div className="flex justify-center align-center mr-2 ml-2">
                    <button
                        className={buttonClasses}
                        disabled={gridId === undefined}
                        onClick={() => { selectBorder('westEdgeGridId'); }}
                        title="Add/Change Western Grid"
                    >
                        <div className="-rotate-90 whitespace-nowrap m-0 p-0 w-8">
                            + {getGridName('westEdgeGridId') ?? 'Western'}
                        </div>
                    </button>
                </div>

                <div className="flex flex-col">
                    <div className="flex justify-center mb-2">
                        <button
                            className={buttonClasses}
                            disabled={gridId === undefined}
                            onClick={() => { selectBorder('northEdgeGridId'); }}
                            title="Add/Change Northern Grid"
                        >
                            + {getGridName('northEdgeGridId') ?? 'Nothern'}
                        </button>
                    </div>

                    <GameGrid
                        showControls={false}
                        showPlayer={false}
                    />

                    <div className="flex justify-center mt-2">
                        <button
                            className={buttonClasses}
                            disabled={gridId === undefined}
                            onClick={() => { selectBorder('southEdgeGridId'); }}
                            title="Add/Change Southern Grid"
                        >
                            + {getGridName('southEdgeGridId') ?? 'Southern'}
                        </button>
                    </div>
                </div>

                <div className="flex justify-center align-center mr-2 ml-2">
                    <button
                        className={buttonClasses}
                        disabled={gridId === undefined}
                        onClick={() => { selectBorder('eastEdgeGridId'); }}
                        title="Add/Change Eastern Grid"
                    >
                        <div className="rotate-90 whitespace-nowrap m-0 p-0 w-8">
                            + {getGridName('eastEdgeGridId') ?? 'Eastern'}
                        </div>
                    </button>
                </div>

                <RightSidebar />
            </div>

            <div className="flex gap-4 border-t border-b border-slate-800 text-sm mt-2">
                <div className="font-bold">Status</div>
                <div>
                    Painting? {painting ? 'yes' : 'no'}
                </div>
                {painting && (
                    <div className="flex items-center gap-1">
                        <div>painting:</div>
                        <div className={`${terrainPaint?.color as string} w-4 h-4`}></div>
                        <div>{terrainPaint?.name}</div>
                    </div>
                )}
            </div>

            {/*

                        MODALS

            */}
            {location.pathname === '/editor/save' && (
                <Modal
                    checked
                    id="modal-save"
                    primaryAction={() => {
                        console.log('---> saveGrid');
                        saveGrid();
                    }}
                    primaryLabel={`${gridId ? 'Update' : 'Create'}`}
                    // cancelAction={() => { history.back(); }}
                    title={`${gridId ? 'Update Grid' : 'Create Grid'}`}
                >
                    <p className="pb-4">Fill out the form, fool.</p>

                    <InputText
                        label="Grid Name"
                        id="gridTitle"
                        name="gridTitle"
                        onChange={(e) => { dispatch(setGridTitle(e.target.value)); }}
                        placeholder="Enter the name of this grid, you fool!"
                        value={gridTitle || currentGrid?.title || ''}
                    />

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Default ({defaultGrid})</span>
                            <input
                                type="checkbox"
                                className="toggle"
                                checked={defaultGrid}
                                onChange={() => { dispatch(setDefaultGrid(!defaultGrid)); }}
                            />
                        </label>
                    </div>
                </Modal>
            )}

            {location.pathname === '/editor/list' && (
                <Modal
                    checked
                    id="modal-border-grid"
                    noPrimary
                    cancelAction={() => { setBorder(''); }}
                    title="Select Grid"
                >
                    <table className="table table-compact table-zebra w-full rounded-none">
                        <thead>
                            <tr>
                                <th className="w-max">Title</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gridList?.map((grid: IGameGrid) => (
                                <tr key={grid.gridId}>
                                    <td>
                                        {grid.defaultGrid ? <span className="badge badge-success mr-1">Default</span> : ''}
                                        <span
                                            className="link"
                                            onClick={() => { selectBorderGrid(grid.gridId); }}
                                        >
                                            {grid.title}
                                        </span>
                                    </td>
                                    <td>{capitalize(grid.gridType)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal>
            )}
        </>
    );
}

export default Editor;
