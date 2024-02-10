import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { Link } from 'react-router-dom';
import { capitalize } from 'lodash';
import {
    FiAlertOctagon,
    FiBookOpen,
    FiFilePlus,
    FiSave
} from 'react-icons/fi';

import Dropdown from '@components/Dropdown/Dropdown';

import { terrainTypes } from '@/data/terrainTypes';
import { setPaint, setTerrainPaint } from '@/reducers/editorSlice';

import { ICON_SIZE } from '@/constants';
import { IGameGrid } from '@/global';
import { RootState } from '@/app/store';

function LeftSidebar({
    currentGrid,
    newGrid,
}: {
    currentGrid: IGameGrid,
    newGrid: () => void;
}): JSX.Element {
    const dispatch = useAppDispatch();
    const [activeTerrainPaint, setActiveTerrainPaint] = useState<string | null>(null);

    const painting = useAppSelector((state: RootState) => state.editor.paint);

    return (
        <div className="w-28 flex flex-col mr-2">
            <div className="flex mb-1 border-t p-1 border-b border-slate-800 justify-around text-gray-600">
                <Link
                    title="Open Board List"
                    to="/editor/list"
                >
                    <FiBookOpen size={ICON_SIZE} />
                </Link>

                <label
                    className="cursor-pointer"
                    onClick={() => { newGrid(); }}
                    title="New Board"
                >
                    <FiFilePlus size={ICON_SIZE} />
                </label>

                <Link
                    title="Save Board"
                    to="/editor/save"
                >
                    <FiSave size={ICON_SIZE} />
                </Link>
            </div>

            <div className="flex flex-col border-t border-b border-slate-800 justify-around text-gray-600 pb-1">
                <div className="font-bold">Board Type:</div>
                <Dropdown
                    id="boardType"
                    label={<>
                        {capitalize(currentGrid.gridType)}
                    </>}
                    labelClasses="text-sm"
                    onClick={(e: object): void => {
                        console.log(e, 'change the size of the board');
                    }}
                    options={[
                        { label: 'Terrain (10 x 10)', value: '10,10', gridSize: { rows: 10, cols: 10 }, type: 'terrain' },
                        { label: 'Building (7 x 7)', value: '7,7', gridSize: { rows: 7, cols: 7 }, type: 'building' },
                    ]}
                />

                <div className="font-bold">Terrains:</div>

                {terrainTypes.map(
                    (terrain) => (
                        <div
                            key={terrain.name}
                            className={`${activeTerrainPaint === terrain.name ? 'bg-accent font-semibold text-red-800' : ''} flex flex-row gap-2 cursor-pointer mt-1 items-center p-1`}
                            onClick={() => {
                                dispatch(setPaint(true));
                                dispatch(setTerrainPaint(terrain));
                                setActiveTerrainPaint(terrain.name);
                            }}
                        >
                            <div className={`w-4 h-4 ${terrain.color}`}></div>
                            <div className="text-sm">{capitalize(terrain.name)}</div>
                        </div>
                    )
                )}
            </div>

            {painting && (
                <span
                    className="btn btn-sm btn-error flex flex-nowrap mt-2"
                    onClick={() => {
                        dispatch(setPaint(false));
                        dispatch(setTerrainPaint(null));
                    }}
                >
                    <FiAlertOctagon size={ICON_SIZE} />
                    <div className="text-xs pl-2">Painting</div>
                </span>
            )}
        </div>
    );
}

export default LeftSidebar;
