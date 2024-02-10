import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ITable } from '@/types/global';
import { BASE_URL, DB_URLS } from '@constants/urls';

interface IGetTablesResponse {
    tables: ITable[];
    counts: {
        [key: string]: number;
    };
}

interface ICreateTable {
    columns: object[];
    tableName: string;
}

export const dbApi = createApi({
    reducerPath: 'dbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: (headers, { getState }: { getState: any; }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('x-auth-token', token);
                return headers;
            }
        },
    }),
    endpoints: (builder) => ({
        availableDBs: builder.query({
            query: () => DB_URLS.READ_ALL_DBS
        }),
        createTable: builder.mutation({
            query: ({
                columns,
                tableName,
            }: ICreateTable) => ({
                url: DB_URLS.CREATE_TABLE,
                method: 'POST',
                body: {
                    columns,
                    tableName,
                },
            }),
        }),
        readTable: builder.query({
            query: (tableName: string) => ({
                url: DB_URLS.QUERY_RUN,
                method: 'POST',
                body: {
                    query: `SELECT * FROM ${tableName}`,
                },
            }),
        }),

        // untested
        updateTable: builder.mutation({
            query: ({
                columns,
                tableName,
            }: ICreateTable) => ({
                url: DB_URLS.UPDATE_TABLE,
                method: 'POST',
                body: {
                    columns,
                    tableName,
                },
            }),
        }),
        deleteTable: builder.mutation({
            query: (tableName: string) => ({
                url: DB_URLS.DELETE_TABLE,
                method: 'POST',
                body: {
                    tableName,
                },
            }),
        }),
        // end untested

        getTables: builder.query({
            query: (db: string) => ({
                url: DB_URLS.READ_ALL_DB_TABLES,
                method: 'GET',
                params: {
                    db,
                },
            })
        }),

        run: builder.query({
            query: (query: string) => ({
                url: DB_URLS.QUERY_RUN,
                method: 'POST',
                body: {
                    query,
                },
            }),
        }),
    }),
});

export const {
    useCreateTableMutation,
    useReadTableQuery,
    useGetTablesQuery,

    useRunQuery,
} = dbApi;
