import {configureStore} from "@reduxjs/toolkit";
import {tmbdApi} from "../services/TMDB.ts";
import {currentGenreOrCategory} from "../features/currentGenreOrCategory.ts";
import {authSlice} from "../features/auth.ts";



export default configureStore({
    reducer: {
        [tmbdApi.reducerPath]: tmbdApi.reducer,
        currentGenreOrCategory: currentGenreOrCategory.reducer,
        user: authSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(tmbdApi.middleware)
    }

})