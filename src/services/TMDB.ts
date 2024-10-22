import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Actors} from "../components/types/types.ts";

export const tmdbApiKey = import.meta.env.VITE_REACT_APP_API_BASE_KEY


export const tmbdApi = createApi({
    reducerPath: 'tmbdApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: ({genreCategoryName, page, searchQuery}) => {
                if (searchQuery) {
                    return `search/movie?api_key=${tmdbApiKey}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`
                }
                if (genreCategoryName && typeof genreCategoryName === 'string') {
                    if (genreCategoryName === 'Top Rated') {
                        genreCategoryName = 'top_rated'
                    }
                    return `movie/${genreCategoryName.toLowerCase()}?api_key=${tmdbApiKey}&language=en-US&page=${page}`
                }
                if (genreCategoryName && typeof genreCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreCategoryName}&api_key=${tmdbApiKey}&language=en-US&page=${page}`
                }
                return `movie/popular?api_key=${tmdbApiKey}&language=en-US&page=${page}`
            }
        }),
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}&language=en-US`
        }),
        getMovie: builder.query({
            query: (id) => `movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
        }),
        getRecomandations: builder.query({
            query: ({list, id}) => `movie/${id}/${list}?api_key=${tmdbApiKey}&language=en-US&page=1`
        }),
        getActorsDetails: builder.query<Actors, number>({
            query: (id) => `person/${id}?api_key=${tmdbApiKey}&language=en-US`
        }),
        getMoviesByActorId: builder.query({
            query: ({id, page}) => `discover/movie?with_cast=${id}&api_key=${tmdbApiKey}&language=en-US&page=${page}`
        }),
        getList: builder.query({
            query: ({
                        listName,
                        accountId,
                        sessionId,
                        page
                    }) => `account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
        }),

    })
})

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieQuery,
    useGetRecomandationsQuery,
    useGetActorsDetailsQuery,
    useGetMoviesByActorIdQuery,
    useGetListQuery
} = tmbdApi