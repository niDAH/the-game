import { useState } from 'react';
import { useSelector } from 'react-redux';
import { capitalize } from 'lodash';
import { RootState } from '@/app/store';

import Dropdown, { IDropdownOptionProps } from '@components/Dropdown/Dropdown';
import InputText from '@components/InputText/InputText';
import {
    useAppDispatch,
    useAppSelector,
} from '@hooks/reduxHooks';
// import { sagaActions } from '../../../sagas/sagaActions';

interface IEvent {
    gridId: number;
    goto?: string | null;
    name: string;
    message: string;
    type: 'trigger' | 'goto';
    col: number;
    row: number;
}

function RightSidebar(): JSX.Element {
    const dispatch = useAppDispatch();

    const gridId = useAppSelector<number>((state: RootState) => state.game.gridId);

    const activeCell = useSelector((state: RootState) => state.editor.activeCell);

    const [eventType, setEventType] = useState<IDropdownOptionProps>();

    const [newEvent, setNewEvent] = useState<IEvent>({
        gridId,
        name: '',
        message: '',
        type: 'trigger',
        col: activeCell?.col ?? 0,
        row: activeCell?.row ?? 0,
    });

    function createEvent(): void {
        // dispatch({
        //     type: sagaActions.CREATE_EVENT,
        //     event: {
        //         ...newEvent,
        //         col: activeCell?.col ?? 0,
        //         row: activeCell?.row ?? 0,
        //         gridId,
        //     }
        // });
        console.log('wweell', {
            ...newEvent,
            col: activeCell?.col ?? 0,
            row: activeCell?.row ?? 0,
            gridId,
        });
    }

    function updateEvent(key: keyof IEvent, value: number | string): void {
        setNewEvent({
            ...newEvent,
            [key]: value,
        });
    }

    return (
        <div className="w-48 flex flex-col ml-2 border border-gray-600">
            <div className="mb-1 p-1 border-b border-slate-800 text-gray-600 press-start-2p text-sm">
                Cell Info
            </div>

            {activeCell && (
                <div className="flex flex-col ml-2 mr-2">
                    <div className="flex flex-row flex-wrap gap-2 items-center">
                        <div className="font-bold">Cell:</div>
                        <div className="w-full">{activeCell.col}, {activeCell.row}</div>

                        <div className="font-bold">Terrain:</div>
                        <div className="w-max flex gap-2 items-center">
                            <div className={`w-4 h-4 ${activeCell.terrain.color}`} />
                            {capitalize(activeCell.terrain.name)}
                        </div>
                    </div>

                    <div className="flex">
                        <Dropdown
                            disabled={gridId === undefined}
                            id="eventType"
                            label={<>
                                {eventType?.label ?? 'Event'}
                            </>}
                            onClick={(value: IDropdownOptionProps) => {
                                updateEvent('type', value.value as 'trigger' | 'goto');

                                setEventType(value);
                            }}
                            options={[
                                { label: 'Trigger', value: 'trigger' },
                                { label: 'Goto', value: 'goto' },
                            ]}
                        />
                    </div>

                    {eventType?.value && (
                        <>
                            <InputText
                                id="eventName"
                                label="Event Name"
                                name="eventName"
                                onChange={(e) => {
                                    updateEvent('name', e.target.value);
                                }}
                                value={newEvent.name}
                            />

                            <div className="font-bold">Action:</div>

                            <InputText
                                disabled
                                id="eventType"
                                label="Event Type"
                                name="eventType"
                                onChange={(e) => {
                                    console.log('onChange', e.target.value);
                                }}
                                value="onEnter"
                            />

                            <InputText
                                id="eventMessage"
                                label="Message"
                                name="eventMessage"
                                onChange={(e) => {
                                    updateEvent('message', e.target.value);
                                }}
                                placeholder="You see a big..."
                                value={newEvent.message}
                            />

                            <button
                                className="btn btn-primary btn-sm mt-2"
                                onClick={() => {
                                    createEvent();
                                }}
                                type="button"
                            >
                                Create Event
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default RightSidebar;
