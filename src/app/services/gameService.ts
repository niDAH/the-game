import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL, GAME_URLS } from '@constants/urls';
import { IGameGrid } from '@/global';
import { CREATE_GRID } from '@/constants/sagaActions';

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: (headers, { getState }: { getState: any; }) => {
            // ?
            //      TODO: add AUTH back into this app
            // ?
            const token = getState().auth.token;

            if (token) {
                headers.set('x-auth-token', token);
                return headers;
            }
        },
    }),
    endpoints: (builder) => ({
        availableGrids: builder.query({
            query: () => GAME_URLS.READ_ALL_GRIDS,
        }),
        [CREATE_GRID]: builder.mutation({
            query: ({
                gridData,
                cellArray,
                gridType,
                defaultGrid,
                eastEdgeBoardId,
                northEdgeBoardId,
                southEdgeBoardId,
                title,
                westEdgeBoardId,
            }: IGameGrid) => {
                console.log('gameApi.ts: gridData', gridData);

                return ({
                    url: GAME_URLS.CREATE_GRID,
                    method: 'POST',
                    body: {
                        gridData,
                        cellArray,
                        gridType,
                        defaultGrid,
                        eastEdgeBoardId,
                        northEdgeBoardId,
                        southEdgeBoardId,
                        title,
                        westEdgeBoardId,
                    },
                });
            },
        }),
        // readTable: builder.query({
        //     query: (tableName: string) => ({
        //         url: DB_URLS.QUERY_RUN,
        //         method: 'POST',
        //         body: {
        //             query: `SELECT * FROM ${tableName}`,
        //         },
        //     }),
        // }),

    }),
});

export const {
    useAvailableGridsQuery,
    useCreateGridMutation,

} = gameApi;
