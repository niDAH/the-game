import { TerrainProps } from '@/global.d';

export const terrainTypes: TerrainProps[] = [
    {
        color: 'bg-gray-600',
        name: 'bridge',
        passable: true,
        probability: '0',
    },
    {
        color: 'bg-yellow-900',
        name: 'door',
        passable: true,
        probability: '0',
    },
    {
        color: 'bg-gray-500',
        name: 'floor',
        passable: true,
        probability: '0',
    },
    {
        color: 'bg-green-700',
        name: 'forest',
        passable: true,
        probability: '0.1',
    },
    {
        color: 'bg-green-500',
        default: true,
        name: 'grass',
        passable: true,
        probability: '*',
    },
    {
        color: 'bg-stone-500',
        name: 'mountain',
        passable: false,
        probability: '0.1',
    },
    {
        color: 'bg-yellow-500',
        name: 'sand',
        passable: true,
        probability: '0',
    },
    {
        color: 'bg-gray-700',
        name: 'stone',
        passable: false,
        probability: '0',
    },
    {
        color: 'bg-blue-500',
        name: 'water',
        passable: false,
        probability: '0.2',
    }
];

/**
 * @description Randomizes the terrain type based on the probability value
 * @param terrains All of the terrain types that can be used in a randomization
 * @returns {TerrainProps} a single terrain type
 */
export function randomizeTerrains(terrains: TerrainProps[]): TerrainProps {
    const randomNr = Math.random();

    let terrain: TerrainProps = {
        name: '',
        passable: false,
        color: '',
        probability: '',
    };

    let threshold = 0;

    for (let i = 0; i < terrains.length; i++) {
        if (terrains[i].probability === '*') {
            continue;
        }

        threshold += Number(terrains[i].probability);

        if (threshold > randomNr) {
            terrain = terrains[i];
            break;
        }

        if (!terrain?.name) {
            // nothing found based on probability value, so we pick the element marked with wildcard
            terrain = terrains.filter((value) => value.probability === '*')[0];
        }
    }

    return terrain;
}
