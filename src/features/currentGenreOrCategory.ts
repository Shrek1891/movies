import {createSlice} from "@reduxjs/toolkit";

export const currentGenreOrCategory =   createSlice({
    name: 'currentGenreOrCategory',
    initialState: {
        genreCategoryName: '',
        page: 1,
        searchQuery: '',
    },
    reducers: {
        selectGenreCategory: (state, action) => {
            state.searchQuery = ''
            state.genreCategoryName = action.payload
        },
        searchMovie: (state, action) => {
            state.searchQuery = action.payload

        }
    }
})

export const {selectGenreCategory, searchMovie} = currentGenreOrCategory.actions
export default currentGenreOrCategory.reducer