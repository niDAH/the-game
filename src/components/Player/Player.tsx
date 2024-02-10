import { GiRobe } from 'react-icons/gi';

import { GAME_GRID } from '@constants/index';

import { type IPlayer } from '@/global';

export default function Player({
    colorClass,
    id,
    // location,
    // name,
    pixelLocation,
}: IPlayer): JSX.Element {
    return (
        <div
            className={`absolute ${colorClass} w-12 h-12`}
            id={id}
            key={id}
            style={{
                top: `${pixelLocation.y}rem`,
                left: `${pixelLocation.x}rem`,
            }}
        >
            <GiRobe size={GAME_GRID.ICON_SIZE} />
        </div>
    );
};
