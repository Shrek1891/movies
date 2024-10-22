import {configureStore} from "@reduxjs/toolkit";
import {tmbdApi} from "../services/TMDB.js";
import {currentGenreOrCategory} from "../features/currentGenreOrCategory.js";
import {authSlice} from "../features/auth.js";



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