import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@reducers/auth/authSlice';
import controlsReducer from '@reducers/controlsSlice';
import editorReducer from '@reducers/editorSlice';
import gameReducer from '@reducers/gameSlice';
import playerReducer from '@reducers/playerSlice';
import systemReducer from '@reducers/systemSlice';

import { authApi } from '@services/authService';
import { dbApi } from '@services/dbManage';
import { gameApi } from '@services/gameService';

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(dbApi.middleware)
            .concat(gameApi.middleware),
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [dbApi.reducerPath]: dbApi.reducer,
        [gameApi.reducerPath]: gameApi.reducer,

        auth: authReducer,
        controls: controlsReducer,
        editor: editorReducer,
        game: gameReducer,
        player: playerReducer,
        system: systemReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type ie: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
