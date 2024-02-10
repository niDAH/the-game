import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';

import { updateCellTerrain } from '@/reducers/gameSlice';
import { setActiveCell } from '../../reducers/editorSlice';

import {
    ICell,
    TerrainProps
} from '@/global';

export interface ICellProps {
    cell: ICell;
    debug?: boolean;
}

/**
 * @description Renders a single cell, handles the player, painting, mouse events, etc.
 * @param props.cell The cell object (ICell) to be rendered
 * @param props.cellKey The key for the cell
 * @param props.debug Whether to show debug info, defaults to false
 * @returns JSX.Element
 */
function Cell({
    cell,
    debug = true,
}: ICellProps): JSX.Element {
    const dispatch = useAppDispatch();

    const activeCell = useAppSelector((state: any) => state.editor.activeCell);
    const painting = useAppSelector((state: any) => state.editor.paint);
    // const painting = false;

    // const terrainPaint: TerrainProps | undefined = useAppSelector((state: any) => state.editor.terrainPaint);
    const terrainPaint: TerrainProps | undefined = useAppSelector((state: any) => state.editor.terrainPaint);

    const cellHover = useCallback(() => {
        // TODO: this function isn't providing the correct hover color when painting
        // TODO: FIX!
        if (activeCell?.col === cell.col && activeCell?.row === cell.row) {
            if (painting) {
                return `hover:${terrainPaint?.color as unknown as string}`;
            }
            return 'hover:bg-purple-700';
        }
        return 'hover:bg-blue-100';
    }, [activeCell, cell, painting, terrainPaint]);

    const classNames: string = ['unselectable', 'w-12', 'h-12', 'relative', 'border-b', 'border-r', 'border-green-800', cellBackground(), cellHover()].filter(Boolean).join(' ');
    const id = `cell-${cell.col}-${cell.row}`;

    function cellBackground(): string {
        if (activeCell?.col === cell.col && activeCell?.row === cell.row) {
            return 'bg-purple-500';
        }
        return cell.terrain?.color;
    }

    function updateTerrain({
        col,
        row,
        terrain,
    }: ICell): void {
        dispatch(updateCellTerrain({
            col,
            row,
            terrain,
        }));
    }

    return (
        <div
            className={classNames}
            id={id}
            // key={cellKey ?? id}
            onClick={(e) => {
                console.log('hello?');
                if (e.buttons === 1 && painting) {
                    updateTerrain({
                        col: cell.col,
                        row: cell.row,
                        terrain: terrainPaint as unknown as TerrainProps
                    });
                }

                dispatch(setActiveCell(cell));
            }}
            onMouseOver={(e) => {
                if (e.buttons === 1 && painting) {
                    cellHover();

                    updateTerrain({
                        col: cell.col,
                        row: cell.row,
                        terrain: terrainPaint as unknown as TerrainProps
                    });

                    // dispatch(setDebug({
                    //     col: cell.col,
                    //     row: cell.row,
                    //     terrain: terrainPaint as ITerrainProps
                    // }));
                }
            }}
        >
            {debug && <span className="unselectable text-tiny m-0 p-0">{cell.col}, {cell.row}</span>}
        </div>
    );
}

export default Cell;
