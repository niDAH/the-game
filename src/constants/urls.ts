export const BASE_URL = 'http://localhost:4000/api';

type dbURLs = {
    CREATE_TABLE: string;
    READ_ALL_DB_TABLES: string;
    UPDATE_TABLE: string;
    DELETE_TABLE: string;

    READ_ALL_DBS: string;

    QUERY_DATA: string;
    QUERY_LOAD_LIST: string;
    QUERY_RUN: string;
    QUERY_SAVE: string;
};

type gameURLs = {
    CREATE_GAME: string;
    READ_ALL_GAMES: string;
    READ_GAME: string;
    UPDATE_GAME: string;
    DELETE_GAME: string;

    CREATE_GRID: string;
    READ_ALL_GRIDS: string;
    READ_GRID: string;
    UPDATE_GRID: string;
    DELETE_GRID: string;
};

type userURLs = {
    LOGIN: string;
    CREATE_USER: string;
    PROFILE: string;
    READ_ALL_USERS: string;
    READ_USER: string;
    UPDATE_USER: string;
    DELETE_USER: string;
};

export const DB_URLS: dbURLs = {
    CREATE_TABLE: `${BASE_URL}/db/tables/create`,
    READ_ALL_DB_TABLES: `${BASE_URL}/db/tables`,
    UPDATE_TABLE: `${BASE_URL}/db/tables/update`,
    DELETE_TABLE: `${BASE_URL}/db/tables/delete`,

    READ_ALL_DBS: `${BASE_URL}/db/all`,

    QUERY_DATA: `${BASE_URL}/db/query/data`,
    QUERY_LOAD_LIST: `${BASE_URL}/db/query/loadList`,
    QUERY_RUN: `${BASE_URL}/db/query/run`,
    QUERY_SAVE: `${BASE_URL}/db/query/save`,

};

export const GAME_URLS: gameURLs = {
    CREATE_GAME: `${BASE_URL}/games/create`,
    READ_ALL_GAMES: `${BASE_URL}/games/all`,
    READ_GAME: `${BASE_URL}/games/read`,
    UPDATE_GAME: `${BASE_URL}/games/update`,
    DELETE_GAME: `${BASE_URL}/games/delete`,

    CREATE_GRID: `${BASE_URL}/grids/create`,
    READ_ALL_GRIDS: `${BASE_URL}/grids/all`,
    READ_GRID: `${BASE_URL}/grids/read`,
    UPDATE_GRID: `${BASE_URL}/grids/update`,
    DELETE_GRID: `${BASE_URL}/grids/delete`,
};

export const USER_URLS: userURLs = {
    LOGIN: `${BASE_URL}/users/login`,
    CREATE_USER: `${BASE_URL}/users/create`,
    PROFILE: `${BASE_URL}/users/profile`,
    READ_ALL_USERS: `${BASE_URL}/users/all`,
    READ_USER: `${BASE_URL}/users/read`,
    UPDATE_USER: `${BASE_URL}/users/update`,
    DELETE_USER: `${BASE_URL}/users/delete`,
};
